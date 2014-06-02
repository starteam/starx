package star.genetics.genetic.model;

import star.genetics.client.Helper;
import star.genetics.client.JSONable;
import star.genetics.client.JSONableMap;

import com.google.gwt.json.client.JSONValue;

public interface Creature extends Comparable<Creature>, JSONable
{
	public static enum Sex
	{
		MALE, FEMALE;

		public JSONValue getJSON()
		{
			return Helper.wrapString(this.name());
		}

		public static Sex fromJSON(JSONValue value)
        {
			return Sex.valueOf(Helper.unwrapString(value));	        
        }
	};

	public String getName();

	public Genome getGenome();

	public GeneticMakeup getMakeup();

	public Sex getSex();

	public void setName(String string);

	public boolean isMateable();

	public void mated();

	public JSONableMap getProperties();

	public CreatureSet getParents();

	public String getUUID();

	public int getMatingsAvailable();
}
