package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.TreeSet;

import star.genetics.genetic.model.Allele;
import star.genetics.genetic.model.Chromosome;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.DiploidAlleles;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.GeneticMakeup;
import star.genetics.genetic.model.Genome;
import star.genetics.genetic.model.MatingEngine;
import star.genetics.genetic.model.Model;
import star.genetics.genetic.model.RuleSet;

public class MatingEngineImpl_XO extends MatingEngineImpl_Common implements MatingEngine, Serializable
{
	private static final long serialVersionUID = 1L;
	float maleRecombinationRate;
	float femaleRecombinationRate;
	float femaleSexRatio;
	int progeniesCount;
	float spontaniousMales;
	float twinningFrequency = 0;
	float identicalTwinsFrequency = 0;

	public MatingEngineImpl_XO(float maleRecombinationRate, float femaleRecombinationRate, float femaleSexRatio, int progeniesCount, float spontaniousMales, Model model)
	{
		super(progeniesCount, 0, 0, model);
		this.maleRecombinationRate = maleRecombinationRate;
		this.femaleRecombinationRate = femaleRecombinationRate;
		this.femaleSexRatio = femaleSexRatio;
		this.spontaniousMales = spontaniousMales;
	}

	protected Creature mate(String crateName, Creature p1, Creature p2, String suffix, int matings, RuleSet rules)
	{
		if (p2 != null)
		{
			return super.mate(crateName, p1, p2, suffix, matings, rules);
		}
		else
		{
			return super.mate(crateName, p1, p1, suffix, matings, rules);
		}
	}

	protected GeneticMakeup mate(Genome genome, GeneticMakeup makeup1, Creature.Sex sex1, GeneticMakeup makeup2, Creature.Sex sex2)
	{
		GeneticMakeup makeup = new star.genetics.genetic.impl.GeneticMakeupImpl(getModel());
		boolean position1 = Math.random() < .5f;
		boolean position2 = Math.random() < .5f;
		star.genetics.genetic.model.Creature.Sex sex = Math.random() < femaleSexRatio ? star.genetics.genetic.model.Creature.Sex.FEMALE : star.genetics.genetic.model.Creature.Sex.MALE;

		float previousGenePosition = 0;
		Chromosome previousChromosome = null;
		TreeSet<Gene> set = new TreeSet<Gene>();
		set.addAll(genome.getGenes());
		for (Gene g : genome.getGenes())
		{
			Chromosome c = g.getChromosome();
			if (previousChromosome != c)
			{
				position1 = Math.random() < .5f;
				position2 = Math.random() < .5f;
				previousGenePosition = 0;
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
				if (makeup1 == makeup2)
				{
					if (Math.random() < spontaniousMales)
					{
						a2 = null;
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
			DiploidAlleles allele = new star.genetics.genetic.impl.DiploidAllelesImpl(a1, a2, getModel());
			makeup.put(g, allele);
		}
		return makeup;
	}

	private boolean randomize(boolean original, float distance, Creature.Sex sex)
	{
		return randomizeInternal(original, distance * (Creature.Sex.MALE.equals(sex) ? maleRecombinationRate : femaleRecombinationRate), sex);
	}

}
