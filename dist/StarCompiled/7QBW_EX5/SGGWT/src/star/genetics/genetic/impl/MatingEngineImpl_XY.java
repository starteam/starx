package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.Map;
import java.util.TreeSet;
import java.util.logging.Logger;

import star.genetics.client.Helper;
import star.genetics.genetic.model.Allele;
import star.genetics.genetic.model.Chromosome;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.CreatureSet;
import star.genetics.genetic.model.DiploidAlleles;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.GeneticMakeup;
import star.genetics.genetic.model.GeneticModel;
import star.genetics.genetic.model.Genome;
import star.genetics.genetic.model.MatingEngine;
import star.genetics.genetic.model.Model;
import star.genetics.genetic.model.RuleSet;
import star.genetics.xls.ParseException;

import com.google.gwt.json.client.JSONObject;

public class MatingEngineImpl_XY extends MatingEngineImpl_Common implements MatingEngine, Serializable
{
	private static final long serialVersionUID = 1L;

	float maleRecombinationRate()
	{
		return Helper.unwrapNumber(data.get(MALERECOMBINATIONRATE));
	};

	float femaleRecombinationRate()
	{
		return Helper.unwrapNumber(data.get(FEMALERECOMBINATIONRATE));

	};

	float femaleSexRatio()
	{
		return Helper.unwrapNumber(data.get("femaleSexRatio"));

	};

	public MatingEngineImpl_XY(Model model)
	{
		super(20, 0, 0, model);
		data.put(MALERECOMBINATIONRATE, Helper.wrapNumber(1f));
		data.put(FEMALERECOMBINATIONRATE, Helper.wrapNumber(1f));
		data.put("femaleSexRatio", Helper.wrapNumber(.5f));
	}

	public MatingEngineImpl_XY(float maleRecombinationRate, float femaleRecombinationRate, float femaleSexRatio, int progeniesCount, float twinningFrequency, float identicalTwinsFrequency, Model model)
	{
		super(progeniesCount, twinningFrequency, identicalTwinsFrequency, model);
		data.put(MALERECOMBINATIONRATE, Helper.wrapNumber(maleRecombinationRate));
		data.put(FEMALERECOMBINATIONRATE, Helper.wrapNumber(femaleRecombinationRate));
		data.put("femaleSexRatio", Helper.wrapNumber(femaleSexRatio));
	}

	public MatingEngineImpl_XY(JSONObject data, Model model)
	{
		super(data, model);
	}

	protected Creature mate(String crateName, Creature p1, Creature p2, String suffix, int matings, RuleSet rules)
	{
		try
		{
			GeneticMakeup makeup = mate(p1.getGenome(), p1.getMakeup(), p1.getSex(), p2.getMakeup(), p2.getSex());

			String name = crateName + suffix;
			Genome genome = p1.getGenome();
			Creature.Sex sex = Sex.getSex(makeup, genome, name);
			Map<String, String> x = rules.getProperties(makeup, sex);
			CreatureSet parents = new CreatureSetImpl(getModel());
			parents.add(p1);
			parents.add(p2);

			boolean isLethal = false;
			String lethal = x.get(GeneticModel.lethal);
			if (lethal != null)
			{
				isLethal = Boolean.parseBoolean(lethal);
			}
			else
			{
				lethal = x.get(GeneticModel.lethal.toLowerCase());
				if (lethal != null)
				{
					isLethal = Boolean.parseBoolean(lethal);
				}
			}
			if (!isLethal)
			{
				star.genetics.genetic.impl.CreatureImpl ret = new star.genetics.genetic.impl.CreatureImpl(name, genome, sex, makeup, matings, x, parents, getModel());
				return ret;
			}
			else
			{
				return null;
			}
		}
		catch (ParseException e)
		{
			e.printStackTrace();
			return null;
		}
	}

	protected GeneticMakeup mate(Genome genome, GeneticMakeup makeup1, Creature.Sex sex1, GeneticMakeup makeup2, Creature.Sex sex2)
	{
//		radomize_flips = 0;
//		randomize_calls = 0;
//		StringBuffer short_text = new StringBuffer();
//		StringBuffer short_text_p1 = new StringBuffer();
//		StringBuffer short_text_p2 = new StringBuffer();
		GeneticMakeup makeup = new star.genetics.genetic.impl.GeneticMakeupImpl(getModel());
		boolean position1 = Math.random() < .5f;
		boolean position2 = Math.random() < .5f;
		star.genetics.genetic.model.Creature.Sex sex = Math.random() < femaleSexRatio() ? star.genetics.genetic.model.Creature.Sex.FEMALE : star.genetics.genetic.model.Creature.Sex.MALE;

		Chromosome previousChromosome = null;
		TreeSet<Gene> set = new TreeSet<Gene>();
		set.addAll(genome.getGenes());
		StringBuffer genes_text = new StringBuffer();
//		for(Gene g: set)
//		{
//			genes_text.append( g.getChromosome().getName()+"-"+g.getName()+",");
//		}
		float previousGenePosition = 0;
		for (Gene g : set)
		{
			Chromosome c = g.getChromosome();
			if (previousChromosome == null || previousChromosome.getName() != c.getName())
			{
				logger.info( "MATING END CHROMOSOME FLIP " + (previousChromosome != null ? previousChromosome.getName():"NONE") + " " + c.getName());
				position1 = Math.random() < .5f;
				position2 = Math.random() < .5f;
				previousGenePosition = g.getPosition();
				previousChromosome = c;
			}
			DiploidAlleles allele1 = makeup1.get(g);
			DiploidAlleles allele2 = makeup2.get(g);
			float genePosition = g.getPosition();
			position1 = randomize(position1, genePosition - previousGenePosition, sex1);
			position2 = randomize(position2, genePosition - previousGenePosition, sex2);
			previousGenePosition = genePosition;
			Allele a1 = allele1 != null ? allele1.get(position1 ? 0 : 1) : null;
			Allele a2 = allele2 != null ? allele2.get(position2 ? 0 : 1) : null;
			if (sex == star.genetics.genetic.model.Creature.Sex.FEMALE)
			{
				if (c.getName().equals("Y")) //$NON-NLS-1$
				{
					continue; // female does not have Y genes
				}
				if (c.getName().equals("X")) //$NON-NLS-1$
				{
					if (a1 == null)
					{
						a1 = allele1 != null ? allele1.get(!position1 ? 0 : 1) : null;
					}
					if (a2 == null)
					{
						a2 = allele2 != null ? allele2.get(!position2 ? 0 : 1) : null;
					}
				}
			}
			else
			{
				if (c.getName().equals("Y")) //$NON-NLS-1$
				{
					if ((a1 != null ? 1 : 0) + (a2 != null ? 1 : 0) != 1)
					{
						if (allele1 != null && allele1.getAlleleCount() == 1)
						{
							a1 = allele1.get(!position1 ? 0 : 1);
						}
						if (allele2 != null && allele2.getAlleleCount() == 1)
						{
							a2 = allele2.get(!position2 ? 0 : 1);
						}
					}
				}
				if (c.getName().equals("X")) //$NON-NLS-1$
				{
					if ((a1 != null ? 1 : 0) + (a2 != null ? 1 : 0) != 1)
					{
						if (allele1.getAlleleCount() == 1)
						{
							a1 = null;
						}
						if (allele2.getAlleleCount() == 1)
						{
							a2 = null;
						}
					}
				}
			}
			DiploidAllelesImpl allele = new star.genetics.genetic.impl.DiploidAllelesImpl(a1, a2, getModel());

//			short_text.append( " " + allele.toStortString());
//			if( allele1 instanceof DiploidAllelesImpl )
//			{
//				short_text_p1.append( " " + ((DiploidAllelesImpl)allele1).toStortString());
//			}
//			if( allele2 instanceof DiploidAllelesImpl )
//			{
//				short_text_p2.append( " " + ((DiploidAllelesImpl)allele2).toStortString());
//			}
			makeup.put(g, allele);
		}
//		logger.info( "MATING END FLIPS: " + radomize_flips + " " + randomize_calls + " " + short_text + " P1" + short_text_p1 + " P2:" + short_text_p2 );
		return makeup;
	}

	private static Logger logger = Logger.getLogger("StarGenetics MatingEngine_XY");
//	int randomize_calls = 0 ;
//	int radomize_flips = 0 ;
	
	private boolean randomize(boolean original, float distance, Creature.Sex sex)
	{
		boolean ret = randomizeInternal(original, distance * (Creature.Sex.MALE.equals(sex) ? maleRecombinationRate() : femaleRecombinationRate()), sex);
//		if( original != ret )
//		{
//			radomize_flips++;
//		}
//		randomize_calls++;
		return ret;

	}

}
