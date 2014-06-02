package star.genetics.parser;

import star.genetics.genetic.impl.AlleleImpl;
import star.genetics.genetic.impl.ChromosomeImpl;
import star.genetics.genetic.impl.GeneImpl;
import star.genetics.genetic.impl.MatingEngineImpl_MAT;
import star.genetics.genetic.impl.MatingEngineImpl_XY;
import star.genetics.genetic.impl.ModelImpl;
import star.genetics.genetic.model.Chromosome;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.Genome;

import com.google.gwt.json.client.JSONNumber;
import com.google.gwt.json.client.JSONObject;

public class EngineParser
{
	public static void parse(ModelImpl model, JSONObject engine)
	{
		String sex_type = engine.get("sex_type").isString().stringValue();
		if ("xy".equalsIgnoreCase(sex_type))
		{
			parse_XY(model, engine);
		}
		if ("aa".equalsIgnoreCase(sex_type))
		{
			parse_Aa(model,engine);
		}
	}

	private static float get(JSONObject obj, String key, float default_value)
	{
		float ret = default_value;
		if (obj.containsKey(key))
		{
			JSONNumber n = obj.get(key).isNumber();
			if (n != null)
			{
				ret = (float) n.doubleValue();
			}
		}
		return ret;
	}

	private static void parse_Aa(ModelImpl model, JSONObject engine)
    {
		int progeniesCount = Math.round(get(engine, "avg_offspring_count", 50.0f));
		MatingEngineImpl_MAT mat = new MatingEngineImpl_MAT(1, 1, .5f, progeniesCount,model);
		model.setMater(mat);
		model.getGenome().setSexType("MATAa");
    }


	private static void parse_XY(ModelImpl model, JSONObject engine)
	{
		float maleRecombinationRate = get(engine, "male_recombination_rate", 1.0f)/100f;
		float femaleRecombinationRate = get(engine, "female_recombination_rate", 1.0f)/100f;
		float femaleSexRatio = get(engine, "female_sex_ratio", 1.0f);
		int progeniesCount = Math.round(get(engine, "avg_offspring_count", 50.0f));
		float twinningFrequency = get(engine, "twinning", 0.0f);
		float identicalTwinsFrequency = get(engine, "identical_twins_frequency", 0.0f);

		MatingEngineImpl_XY xy = new MatingEngineImpl_XY(maleRecombinationRate, femaleRecombinationRate, femaleSexRatio, progeniesCount, twinningFrequency, identicalTwinsFrequency,model);
		model.setMater(xy);
		// fix genome
		fixGenome_XY(model.getGenome(), model);
	}

	private static void fixGenome_XY(Genome genome, ModelImpl model)
	{
		Chromosome cx = genome.getChromosomeByName("X");
		if (cx == null)
		{
			cx = new ChromosomeImpl("X", genome, model);
			Gene gx = new GeneImpl("x", 0, cx, model);
			new AlleleImpl("x", gx,model);
		}
		Chromosome cy = genome.getChromosomeByName("Y");
		if (cy == null)
		{
			cy = new ChromosomeImpl("Y", genome, model);
			Gene gy = new GeneImpl("y", 0, cy, model);
			new AlleleImpl("x", gy,model);
		}

	}
}
