package star.genetics.genetic.model;

import java.util.Map;
import java.util.Set;

import star.genetics.client.JSONable;

public interface RuleSet extends JSONable
{
	public boolean add(Rule rule);

	public Map<String, String> getProperties(GeneticMakeup genotype, Creature.Sex sex);

	public Set<String> getPropertyNames();
}
