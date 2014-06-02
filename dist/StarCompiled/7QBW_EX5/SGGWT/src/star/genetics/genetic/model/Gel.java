package star.genetics.genetic.model;

import star.genetics.client.JSONable;

public interface Gel extends Iterable<GelPosition>, JSONable
{
	String getName();

	int getIndex();

	void addGelPosition(GelPosition gp);

}
