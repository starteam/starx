package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;
import java.util.TreeMap;
import java.util.TreeSet;

import com.google.gwt.json.client.JSONObject;

import star.genetics.client.Helper;
import star.genetics.client.JSONable;
import star.genetics.client.Messages;
import star.genetics.genetic.model.Allele;
import star.genetics.genetic.model.Chromosome;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.CreatureSet;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.GeneticMakeup;
import star.genetics.genetic.model.Genome;
import star.genetics.genetic.model.MatingEngine;
import star.genetics.genetic.model.Model;
import star.genetics.genetic.model.RuleSet;

public class MatingEngineImpl_MAT implements MatingEngine, Serializable, JSONable
{

	static class Mapping
	{
		private int[] order = new int[4];

		public Mapping()
		{
			ArrayList<Integer> arrayList = new ArrayList<Integer>();
			Random r = new Random();
			int a = 0;
			int b = 2;
			if (Math.random() > 0.5f)
			{
				a = 2;
				b = 0;
			}
			order[a] = Math.random() > .5f ? 0 : 1;
			order[a + 1] = order[a] == 0 ? 1 : 0;
			order[b] = Math.random() > .5f ? 2 : 3;
			order[b + 1] = order[b] == 2 ? 3 : 2;

		}

		public Mapping(Mapping parent)
		{
			System.arraycopy(parent.order, 0, order, 0, order.length);
		}

		public void swap(int thread, int target)
		{
			int tmp = order[thread];
			order[thread] = order[target];
			order[target] = tmp;
		}

		@Override
		public String toString()
		{

			return Arrays.toString(order);
		}
	}

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

	private int progeniesCount()
	{
		return Math.round(Helper.unwrapNumber(data.get("progeniesCount")));
	};

	private final Model model;
	protected final JSONObject data;

	public JSONObject getJSON()
	{
		return data;
	};

	public Model getModel()
	{
		return model;
	}

	public MatingEngineImpl_MAT(float maleRecombinationRate, float femaleRecombinationRate, float femaleSexRatio, int progeniesCount, Model model)
	{
		data = new JSONObject();
		data.put("progeniesCount", Helper.wrapNumber(progeniesCount));
		data.put(MALERECOMBINATIONRATE, Helper.wrapNumber(maleRecombinationRate));
		data.put(FEMALERECOMBINATIONRATE, Helper.wrapNumber(femaleRecombinationRate));
		data.put("femaleSexRatio", Helper.wrapNumber(femaleSexRatio));

		this.model = model;
	}

	public MatingEngineImpl_MAT(JSONObject data, Model model)
    {
		this.data = data;
		this.model = model;
    }

	static class GeneComparator implements Comparator<Gene>, Serializable
	{
		private static final long serialVersionUID = 1L;
		boolean incremental = true;

		public GeneComparator(boolean incremental)
		{
			this.incremental = incremental;
		}

		public int compare(Gene o1, Gene o2)
		{
			return Float.compare(o1.getPosition(), o2.getPosition()) * (incremental ? 1 : -1);
		}
	}

	Map<Gene, Mapping> getMapping(Creature c1, Creature c2, Chromosome c)
	{
		TreeSet<Gene> chromosomeMapPositive = new TreeSet<Gene>(new GeneComparator(true));
		TreeSet<Gene> chromosomeMapNegative = new TreeSet<Gene>(new GeneComparator(false));
		for (Gene g : c.getGenes())
		{
			if (g.getPosition() >= 0)
			{
				chromosomeMapPositive.add(g);
			}
			else
			{
				chromosomeMapNegative.add(g);
			}
		}

		Random rng = new Random();
		Mapping first_mapping = new Mapping();
		TreeMap<Gene, Mapping> chromosomeMapping = new TreeMap<Gene, Mapping>(new GeneComparator(true));

		Mapping last_mapping = new Mapping(first_mapping);
		float last_distance = 0.0f;
		for (Gene gene : chromosomeMapPositive)
		{
			Mapping mapping = new Mapping(last_mapping);
			float dist = gene.getPosition();
			float magicAdjustment = 100f; // 4f/3f; // magic adjustment exists to adjust for thread swaping with itself and 100 for %
			for (int thread = 0; thread < 4; thread++)
			{
				float probability = magicAdjustment * rng.nextFloat();
				int target = rng.nextInt(4);
				if (probability <= Math.min(Math.abs(dist - last_distance), 50f))
				{
					mapping.swap(thread, target);
				}
			}
			chromosomeMapping.put(gene, mapping);
			last_mapping = mapping;
			last_distance = dist;
		}

		last_mapping = new Mapping(first_mapping);
		last_distance = 0.0f;
		for (Gene gene : chromosomeMapNegative)
		{
			Mapping mapping = new Mapping(last_mapping);
			float dist = gene.getPosition();
			float magicAdjustment = 100f; // 4f / 3f; // magic adjustment exists to adjust for thread swaping with itself
			for (int thread = 0; thread < 4; thread++)
			{
				float probability = magicAdjustment * rng.nextFloat();
				int target = rng.nextInt(4);
				if (probability <= Math.min(Math.abs(dist - last_distance), 50.0f))
				{
					mapping.swap(thread, target);
				}
			}
			chromosomeMapping.put(gene, mapping);
			last_mapping = mapping;
			last_distance = dist;
		}
		return chromosomeMapping;
	}
	public CreatureSet getProgenies(String crateName, CreatureSet parents, int countFrom, int matings, RuleSet rules) throws MatingException
	{
		return getProgenies(crateName, parents, countFrom, matings, rules,progeniesCount());
	}
	
	public CreatureSet getProgenies(String crateName, CreatureSet parents, int countFrom, int matings, RuleSet rules, int targetCount) throws MatingException
	{
		if( targetCount <= 0 )
		{
			targetCount = progeniesCount();
		}

		Creature c1 = parents.get(0);
		Creature c2 = parents.get(1);

		Random rng = new Random();
		CreatureSetImpl ret = new CreatureSetImpl(getModel());
		Genome genome = c1.getGenome();
		for (int pIndex = 0; pIndex < targetCount; pIndex++)
		{
			GeneticMakeupImpl[] makeups = new GeneticMakeupImpl[4];
			for (int i = 0; i < 4; i++)
			{
				makeups[i] = new GeneticMakeupImpl(getModel());
			}
			for (Chromosome c : genome)
			{
				Map<Gene, Mapping> chromosomeMapping = getMapping(c1, c2, c);
				for (int i = 0; i < 4; i++)
				{
					GeneticMakeupImpl makeup = makeups[i];
					for (Entry<Gene, Mapping> entry : chromosomeMapping.entrySet())
					{
						Gene gene = entry.getKey();
						Mapping mapping = entry.getValue();
						Allele allele = null;
						switch (mapping.order[i])
						{
						case 0:
						case 1:
							allele = c1.getMakeup().get(gene).get(0);
							break;
						case 2:
						case 3:
							allele = c2.getMakeup().get(gene).get(0);
							break;

						default:
							throw new RuntimeException(Messages.getString("MatingEngineImpl_MAT.0")); //$NON-NLS-1$
						}
						makeup.put(gene, new DiploidAllelesImpl(allele, null, getModel()));
					}
				}
			}
			int offset = rng.nextInt(4);
			boolean[] sexArray = new boolean[4];
			int counter = 0;
			do
			{
				sexArray[rng.nextInt(4)] = true;
				counter = 0;
				for (int i = 0; i < 4; i++)
				{
					if (sexArray[i])
						counter++;
				}
			} while (counter != 2);

			final String D[] = { "A", "B", "C", "D" }; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$ //$NON-NLS-4$
			for (int x = 0; x < 4; x++)
			{
				star.genetics.genetic.model.Creature.Sex thisSex = sexArray[x] ? star.genetics.genetic.model.Creature.Sex.MALE : star.genetics.genetic.model.Creature.Sex.FEMALE;
				int i = (x + offset) % 4;
				GeneticMakeup makeup = makeups[i];
				Map<String, String> properties = rules.getProperties(makeup, thisSex);
				CreatureImpl creature = new CreatureImpl(crateName + "-" + (countFrom / 4 + pIndex + 1) + D[x], genome, thisSex, makeup, matings, properties, parents, getModel()); //$NON-NLS-1$
				ret.add(creature);
			}

		}
		return ret;
	}
}
