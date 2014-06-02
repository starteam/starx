package star.genetics.genetic.model;

import star.genetics.client.JSONable;

public interface DiploidAlleles extends JSONable
{
	public int getAlleleCount();

	Allele get(int c);
}
