package star.genetics.genetic.model;

import star.genetics.genetic.model.Creature.Sex;

public interface ModelWriter extends Model
{
	public void setVisualizerClass(String clazz);

	public void setCreatures(CreatureSet set);

	public void setRules(RuleSet set);

	public void setRecombinationRate(float value, Sex sex);

	public void setProgeniesCount(int value);

	public int getProgeniesCount();

	public void setGenome(Genome genome);

	public void setMatingsCount(int matingsCount);

	public int getMatingsCount();

	public void setGelRules(GelRules gri);

	public void setSpontaniousMales(float spontaniousMales);
}
