package star.genetics.genetic.impl;

import star.genetics.client.MessageFormat;
import star.genetics.client.Messages;
import star.genetics.genetic.model.Chromosome;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.DiploidAlleles;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.GeneticMakeup;
import star.genetics.genetic.model.Genome;
import star.genetics.xls.ParseException;

public class Sex
{
	public static Creature.Sex getSex(GeneticMakeup makeup, Genome genome, String name) throws ParseException
	{
		if (genome.getSexType() == Genome.SexType.XY)
		{
			Chromosome c = genome.getChromosomeByName("Y"); //$NON-NLS-1$
			// this algorithm assumes that
			// if there are any 0-s or 2-s on y chromosome than $ones will note be one
			// if there are any 1-s on y chromosome that $zeros will not be zero
			int ones = 1;
			int zeros = 0;

			if (c != null)
			{
				for (Gene g : c.getGenes())
				{
					DiploidAlleles alleles = makeup.get(g);
					int count = alleles != null ? alleles.getAlleleCount() : 0;
					ones *= count;
					zeros += count;
				}
			}
			if (ones == 1)
			{
				// all y chromosome genes DiploidAlleles have one gene on them -- male
				Chromosome c2 = genome.getChromosomeByName("X"); //$NON-NLS-1$
				if (c2 == null)
				{
					return null;
				}
				for (Gene g : c2.getGenes())
				{
					if (makeup.get(g).getAlleleCount() != 1)
					{
						throw new ParseException(MessageFormat.format(Messages.getString("Sex.2"), name)); //$NON-NLS-1$
					}
				}
				return Creature.Sex.MALE;
			}
			if (zeros == 0)
			{
				// all y chromosome genes DiploidAlleles have no gene on them -- female
				Chromosome c2 = genome.getChromosomeByName("X"); //$NON-NLS-1$
				if (c2 == null)
				{
					return null;
				}
				for (Gene g : c2.getGenes())
				{
					if (makeup.get(g).getAlleleCount() != 2)
					{
						throw new ParseException(Messages.getString("Sex.4") + name); //$NON-NLS-1$
					}
				}
				return Creature.Sex.FEMALE;

			}
			throw new ParseException(Messages.getString("Sex.5") + " " + name); //$NON-NLS-1$
		}
		else if (genome.getSexType() == Genome.SexType.XO)
		{
			int xx = 0;
			int x = 0;
			Chromosome c2 = genome.getChromosomeByName("X"); //$NON-NLS-1$
			for (Gene g : c2.getGenes())
			{
				int count = makeup.get(g).getAlleleCount();
				if (count == 2)
				{
					xx++;
				}
				else if (count == 1)
				{
					x++;
				}
				else
				{
					throw new ParseException(Messages.getString("Sex.7") + " " + name); //$NON-NLS-1$
				}
			}
			if (xx == 0 && x == 0)
			{
				throw new ParseException(Messages.getString("Sex.8") + name); //$NON-NLS-1$

			}
			if (xx != 0 && x != 0)
			{
				throw new ParseException(Messages.getString("Sex.9") + " " + name); //$NON-NLS-1$
			}
			return x != 0 ? Creature.Sex.MALE : Creature.Sex.FEMALE;
		}
		else
		{
			throw new ParseException(Messages.getString("Sex.10")); //$NON-NLS-1$
		}
	}

}
