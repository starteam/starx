package star.genetics.genetic.model;

import star.genetics.client.JSONable;
import star.genetics.genetic.impl.MatingException;

public interface MatingEngine extends JSONable
{
	public CreatureSet getProgenies(String crateName, CreatureSet parents, int countFrom, int matings, RuleSet set) throws MatingException;
	public CreatureSet getProgenies(String crateName, CreatureSet parents, int countFrom, int matings, RuleSet set, int targetCount ) throws MatingException;
}
