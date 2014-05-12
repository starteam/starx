package star.genetics.parser;

import java.util.HashMap;
import java.util.Map;

import star.genetics.genetic.impl.CreatureImpl;
import star.genetics.genetic.impl.CreatureSetImpl;
import star.genetics.genetic.impl.DiploidAllelesImpl;
import star.genetics.genetic.impl.GeneticMakeupImpl;
import star.genetics.genetic.impl.ModelImpl;
import star.genetics.genetic.model.Allele;
import star.genetics.genetic.model.Chromosome;
import star.genetics.genetic.model.Creature.Sex;
import star.genetics.genetic.model.DiploidAlleles;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.Genome;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;

public class StrainsParser
{

	public static void parse(ModelImpl model, JSONObject strains)
	{
		CreatureSetImpl set = new CreatureSetImpl(model);
		parseStrains(model, set, strains.get("initial").isObject());
		model.setCreatures(set);
	}

	private static void parseStrains(ModelImpl model, CreatureSetImpl set, JSONObject strains)
	{
		JSONArray list = strains.get("list").isArray();
		for (int i = 0; i < list.size(); i++)
		{
			parseStrain(model, set, list.get(i).isObject());
		}
	}

	private static void parseStrain(ModelImpl model, CreatureSetImpl set, JSONObject strain)
	{
		String name = strain.get("name").isString().stringValue();
		String ssex = strain.get("sex").isString().stringValue();
		Sex sex = "M".equalsIgnoreCase(ssex) ? Sex.MALE : Sex.FEMALE;
		GeneticMakeupImpl makeup = parseGeneticMakeup(model, strain.get("alleles").isArray());
		fixMakeup_XY(model.getGenome(), makeup, sex, model);
		Map<String, String> properties = new HashMap<String, String>();
		CreatureImpl c = new CreatureImpl(name, model.getGenome(), sex, makeup, model.getMatingsCount(), properties, null, model);
		set.add(c);
	}

	private static void fixMakeup_XY(Genome genome, GeneticMakeupImpl makeup, Sex sex, ModelImpl model)
	{
		Chromosome cx = genome.getChromosomeByName("X");
		if (cx != null && cx.getGenes().size() == 1)
		{
			Gene gx = cx.getGenes().iterator().next();
			DiploidAlleles da = makeup.get(gx);
			if (da == null)
			{
				Allele x = gx.getGeneTypes().iterator().next();
				makeup.put(gx, new DiploidAllelesImpl(x, Sex.MALE.equals(sex) ? null : x, model));
			}
		}
		Chromosome cy = genome.getChromosomeByName("Y");
		if (cy != null && cy.getGenes().size() == 1)
		{
			Gene gy = cy.getGenes().iterator().next();
			DiploidAlleles da = makeup.get(gy);
			if (da == null)
			{
				Allele y = gy.getGeneTypes().iterator().next();
				makeup.put(gy, new DiploidAllelesImpl(null, Sex.MALE.equals(sex) ? y : null, model));
			}
		}
	}

	private static GeneticMakeupImpl parseGeneticMakeup(ModelImpl model, JSONArray array)
	{
		GeneticMakeupImpl ret = new GeneticMakeupImpl(model);
		for (int i = 0; i < array.size(); i++)
		{
			parseAlleles(model, ret, array.get(i).isString().stringValue());
		}
		return ret;
	}

	private static void parseAlleles(ModelImpl model, GeneticMakeupImpl ret, String string)
	{
		Genome genome = model.getGenome();
		String[] alleleStr = string.split(",");
		Allele[] alleles = new Allele[alleleStr.length];
		for (int i = 0; i < alleleStr.length; i++)
		{
			alleles[i] = getAllele(genome, alleleStr[i]);
		}
		ret.put(alleles[0].getGene(), new DiploidAllelesImpl(alleles, model));
	}

	private static Allele getAllele(star.genetics.genetic.model.Genome g, String allele)
	{
		Allele ret = null;
		for (Gene gene : g.getGenes())
		{
			ret = gene.getAlleleByName(allele.trim());
			if (ret != null)
			{
				break;
			}
		}
		return ret;

	}

}
