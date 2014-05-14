package star.genetics.genetic.impl;

import star.genetics.genetic.model.Allele;
import star.genetics.genetic.model.Chromosome;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.DiploidAlleles;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.GeneticMakeup;
import star.genetics.genetic.model.Genome;

public class Utilities
{

	public static void printCreature2(Creature c)
	{
		try
		{
			StringBuilder trow = new StringBuilder();
			StringBuilder brow = new StringBuilder();
			StringBuilder sb = new StringBuilder();
			sb.append(c.getName());
			sb.append(" "); //$NON-NLS-1$

			Genome genome = c.getGenome();
			GeneticMakeup makeup = c.getMakeup();
			for (Chromosome chromosome : genome)
			{
				trow.append(chromosome.getName() + " [ "); //$NON-NLS-1$
				brow.append(chromosome.getName() + " [ "); //$NON-NLS-1$
				for (Gene gene : chromosome.getGenes())
				{
					DiploidAlleles alleles = makeup.get(gene);
					Allele ta = alleles.get(0);
					Allele ba = alleles.get(1);

					String ts = ta != null ? ta.getName() : "."; //$NON-NLS-1$
					String bs = ba != null ? ba.getName() : "."; //$NON-NLS-1$

					if (ts.length() < bs.length())
					{
						ts = ts + " "; //$NON-NLS-1$
					}

					if (bs.length() < ts.length())
					{
						bs = bs + " "; //$NON-NLS-1$
					}

					trow.append(ts);
					trow.append(" "); //$NON-NLS-1$
					brow.append(bs);
					brow.append(" "); //$NON-NLS-1$

				}
				trow.append("] "); //$NON-NLS-1$
				brow.append("] "); //$NON-NLS-1$
			}
			sb.append("\n"); //$NON-NLS-1$
			sb.append("\t"); //$NON-NLS-1$
			sb.append(trow);
			sb.append("\n"); //$NON-NLS-1$
			sb.append("\t"); //$NON-NLS-1$
			sb.append(brow);
			System.out.println(sb);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
	}

	public static void printCreature(Creature c)
	{
		StringBuilder sb = new StringBuilder();
		GeneticMakeup gm = c.getMakeup();
		sb.append(c.getName());
		sb.append(" "); //$NON-NLS-1$
		if (gm instanceof GeneticMakeupImpl)
		{
			GeneticMakeupImpl gmi = (GeneticMakeupImpl) gm;
			sb.append(gmi.toShortString());
		}
		else
		{
			sb.append(gm.toString());
		}
		System.out.println(sb);
	}

	public static boolean compare(Allele a1, Allele a2)
	{
		if (a1 == null)
		{
			return a2 == null;
		}
		else
		{
			if (a2 == null)
			{
				return false;
			}
			else
			{
				return a1.equals(a2);
			}
		}
	}

	public static long startup = System.currentTimeMillis();

	public static void log(String str)
	{
		System.err.println(str + ":" + (System.currentTimeMillis() - startup) + "ms."); //$NON-NLS-1$ //$NON-NLS-2$
	}
}
