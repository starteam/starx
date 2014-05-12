package star.genetics.genetic.model;

import star.genetics.client.JSONable;

public interface CrateModel extends JSONable
{
	public CreatureSet getParents();

	public CreatureSet getProgenies();

	public String getName();

	public void setName(String name);

	public String getUUID();

}
