package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.Map;
import java.util.logging.Logger;

import star.genetics.client.Helper;
import star.genetics.client.JSONable;
import star.genetics.client.Messages;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.CreatureSet;
import star.genetics.genetic.model.GeneticMakeup;
import star.genetics.genetic.model.GeneticModel;
import star.genetics.genetic.model.Genome;
import star.genetics.genetic.model.Model;
import star.genetics.genetic.model.RuleSet;
import star.genetics.xls.ParseException;

import com.google.gwt.json.client.JSONObject;

public abstract class MatingEngineImpl_Common implements Serializable, JSONable
{
	private static final long serialVersionUID = 1L;
	final static String sterileString = GeneticModel.sterile;
	protected final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	MatingEngineImpl_Common(JSONObject data, Model model)
	{
		this.data = data;
		this.model = model;
	}

	public JSONObject getJSON()
	{
		return data;
	};

	MatingEngineImpl_Common(int progeniesCount, float twinningFrequency, float identicalTwinsFrequency, Model model)
	{
		this.model = model;
		data = new JSONObject();
		data.put("progeniesCount", Helper.wrapNumber(progeniesCount));
		data.put("twinningFrequency", Helper.wrapNumber(twinningFrequency));
		data.put("identicalTwinsFrequency", Helper.wrapNumber(identicalTwinsFrequency));
	}

	private int progeniesCount()
	{
		return Math.round(Helper.unwrapNumber(data.get("progeniesCount")));
	};

	private float twinningFrequency()
	{
		return Helper.unwrapNumber(data.get("twinningFrequency"));

	};

	private float identicalTwinsFrequency()
	{
		return Helper.unwrapNumber(data.get("identicalTwinsFrequency"));

	};

	public CreatureSet getProgenies(String crateName, CreatureSet parents, int countFrom, int matings, RuleSet rules ) throws MatingException
	{
		return getProgenies(crateName, parents, countFrom, matings, rules, progeniesCount());
	}
	
	public CreatureSet getProgenies(String crateName, CreatureSet parents, int countFrom, int matings, RuleSet rules, int targetCount) throws MatingException
	{
		if( targetCount <= 0 )
		{
			targetCount = progeniesCount();
		}
		CreatureSet set = new star.genetics.genetic.impl.CreatureSetImpl(getModel());
		if (canMate(parents))
		{
			Creature[] parentArray = new Creature[2];
			int i = 0;
			for (Creature c : parents)
			{
				parentArray[i++] = c;
			}
			int creature_count = 0;
			int lethal_count = 0;
			LOOP: for (int j = 0; j < targetCount; j++)
			{
				Creature c = mate(crateName, parentArray[0], parentArray[1], "-" + (countFrom + creature_count), matings, rules); //$NON-NLS-1$
				boolean isLethal = (c == null);
				if (isLethal)
				{
					j--;
					lethal_count++;
					if (lethal_count > progeniesCount() * 10 && set.size() == 0)
					{
						break LOOP;
					}
					continue LOOP;
				}

				set.add(c);
				creature_count++;

				if (Math.random() < twinningFrequency() / 100)
				{
					if (Math.random() < identicalTwinsFrequency() / 100)
					{
						String name = crateName + "-" + (countFrom + creature_count); //$NON-NLS-1$
						set.add(clone(name, c, matings));
						creature_count++;
					}
					else
					{
						Creature c2 = mate(crateName, parentArray[0], parentArray[1], "-" + (countFrom + creature_count), matings, rules); //$NON-NLS-1$
						if (c2 != null)
						{
							set.add(c2);
							creature_count++;
						}
					}
				}
			}
			for (Creature c : parents)
			{
				c.mated();
			}
			if (set.size() == 0)
			{
				throw new MatingException(Messages.getString("MatingEngineImpl_Common.3")); //$NON-NLS-1$
			}
		}
		else
		{
			throw new MatingException(Messages.getString("MatingEngineImpl_Common.4")); //$NON-NLS-1$
		}
		return set;
	}

	private Creature clone(String name, Creature source, int matings)
	{
		return new star.genetics.genetic.impl.CreatureImpl(name, source.getGenome(), source.getSex(), source.getMakeup(), matings, source.getProperties().asMap(), source.getParents(), getModel());
	}

	protected abstract GeneticMakeup mate(Genome genome, GeneticMakeup makeup1, Creature.Sex sex1, GeneticMakeup makeup2, Creature.Sex sex2);

	protected Creature mate(String crateName, Creature p1, Creature p2, String suffix, int matings, RuleSet rules)
	{
		try
		{
			GeneticMakeup makeup = mate(p1.getGenome(), p1.getMakeup(), p1.getSex(), p2.getMakeup(), p2.getSex());

			String name = crateName + suffix;
			Genome genome = p1.getGenome();
			Creature.Sex sex = p1.getSex() != null ? Sex.getSex(makeup, genome, name) : null;
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

	protected boolean canMate(CreatureSet set)
	{
		boolean canMate = true;
		for (Creature c : set)
		{
			canMate &= c.isMateable();
		}
		return canMate;
	}
	
	private static Logger logger = Logger.getLogger("StarGenetics MatingEngine_Common");


	protected boolean randomizeInternal(boolean original, float distance, Creature.Sex sex)
	{
		distance = Math.abs(distance);
		boolean flip = Math.random() > empiricalProbabilityNoInterference(distance);
		return flip ? original : !original;
	}

	protected double empiricalProbabilityNoInterference(float distance)
	{
		if (distance > 1.90f)
		{
			return .5f;
		}
		else
		{
			float x = distance;
			double probability = x * (0.9742 + x * (-0.8533 + x * (0.3791 - 0.0681 * x)));
			return probability;
		}
	}
}
// public static void main(String[] args)
// {
// for (int d = 0; d < 200; d++)
// {
// double x = d * .01;
// double probability = x * (0.9742 + x * (-0.8533 + x * (0.3791 - 0.0681 * x)));
// System.out.println(x + " " + probability);
//
// }
// }

// used for fitting empiricalProbabilityNoInterference formula
//
// formula has R>0.999 fitting to the data
//
// original recombination formula was:
// private boolean randomize(boolean original, float distance, Creature.Sex sex)
// {
// distance *= Creature.Sex.MALE.equals(sex) ? maleRecombinationRate : femaleRecombinationRate;
// if (distance > .5f)
// {
// distance = .5f;
// }
// return (Math.random() > distance) ? original : !original;
// }
// public static boolean dir(int distance)
// {
// boolean flip = false;
// for (int i = 0; i < distance; i++)
// {
// for (int j = 0; j < 10; j++)
// {
// flip = flip ^ (Math.random() < 0.001);
// }
// }
// return flip;
// }
//
// public static void main(String[] args)
// {
// final int max = 200;
// final int samples = 50000;
// float[] p = new float[max];
// for (int distance = 0; distance < max; distance++)
// {
// p[distance] = 0;
// for (int points = 0; points < samples; points++)
// {
// if (dir(distance))
// {
// p[distance]++;
// }
// }
// System.out.println(distance * .01f + "\t" + p[distance] / samples);
// }
// }