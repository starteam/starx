package star.genetics.genetic.model;

public interface Model extends GeneticModel
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
