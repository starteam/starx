package star.genetics.genetic.model;

import star.genetics.client.JSONable;
import star.genetics.client.JSONableMap;

public interface Rule extends JSONable
{
	static final String DEFAULT = "Default";

	public JSONableMap getProperties();

	public boolean isDefault();

	public boolean isMatching(GeneticMakeup makeup, Creature.Sex sex);
}
