package star.genetics.genetic.model;

import star.genetics.client.JSONable;

public interface Allele extends JSONable
{
	public String getName();

	public Gene getGene();
}
