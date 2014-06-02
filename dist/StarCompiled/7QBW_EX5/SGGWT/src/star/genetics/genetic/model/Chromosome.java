package star.genetics.genetic.model;

import star.genetics.client.JSONable;
import star.genetics.client.JSONableList;

public interface Chromosome extends JSONable
{
	public String getName();

	public Allele getAlleleByName(String name);

	public Gene getGeneByName(String name);

	public JSONableList<Gene> getGenes();
}
