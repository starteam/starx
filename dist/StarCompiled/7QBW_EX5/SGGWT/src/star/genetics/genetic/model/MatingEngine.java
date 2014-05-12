package star.genetics.genetic.model;

import star.genetics.genetic.impl.MatingException;

public interface MatingEngine
{
	public CreatureSet getProgenies(String crateName, CreatureSet parents, int countFrom, int matings, RuleSet set) throws MatingException;
}
