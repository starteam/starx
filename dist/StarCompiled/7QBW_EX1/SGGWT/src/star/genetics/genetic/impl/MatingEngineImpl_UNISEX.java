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

public class MatingEngineImpl_UNISEX extends MatingEngineImpl_Common implements MatingEngine, Serializable
{

	private static final long serialVersionUID = 1L;
	float femaleRecombinationRate;
	float twinningFrequency = 0;
	float identicalTwinsFrequency = 0;

	public MatingEngineImpl_UNISEX(float femaleRecombinationRate, int progeniesCount, Model model)
	{
		super(progeniesCount, 0, 0, model);
		this.femaleRecombinationRate = femaleRecombinationRate;
	}

	protected GeneticMakeup mate(Genome genome, GeneticMakeup makeup1, Creature.Sex sex1, GeneticMakeup makeup2, Creature.Sex sex2)
	{
		GeneticMakeup makeup = new star.genetics.genetic.impl.GeneticMakeupImpl(getModel());
		boolean position1 = Math.random() < .5f;
		boolean position2 = Math.random() < .5f;
		star.genetics.genetic.model.Creature.Sex sex = null;

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
			DiploidAlleles allele = new star.genetics.genetic.impl.DiploidAllelesImpl(a1, a2, getModel());
			makeup.put(g, allele);
		}
		return makeup;
	}

	private boolean randomize(boolean original, float distance, Creature.Sex sex)
	{
		return randomizeInternal(original, distance * femaleRecombinationRate, sex);
	}

}
