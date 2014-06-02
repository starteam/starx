package star.genetics.genetic.model;

import star.genetics.client.CreatureProxy;

public interface Model extends GeneticModel, CreatureProxy
{
	Genome getGenome();

	CreatureSet getCreatures();

	MatingEngine getMatingEngine();

	CrateSet getCrateSet();

	int getMatingsCount();

	RuleSet getRules();

	GelRules getGelRules();

	int getProgeniesCount();
}
