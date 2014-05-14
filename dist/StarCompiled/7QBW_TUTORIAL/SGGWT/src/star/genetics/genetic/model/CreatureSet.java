package star.genetics.genetic.model;

import star.genetics.client.JSONable;

public interface CreatureSet extends Iterable<Creature>, JSONable
{
	public void add(Creature c);

	public Creature get(int index);

	public boolean contains(Creature c);

	public int size();
}
