package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.Map;
import java.util.Map.Entry;

import star.genetics.client.Helper;
import star.genetics.client.JSONableMap;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.CreatureSet;
import star.genetics.genetic.model.GeneticMakeup;
import star.genetics.genetic.model.GeneticModel;
import star.genetics.genetic.model.Genome;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONBoolean;
import com.google.gwt.json.client.JSONObject;

public class CreatureImpl implements star.genetics.genetic.model.Creature, Serializable
{
	private static final long serialVersionUID = 1L;
	private final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	CreatureImpl(JSONObject data, Model model)
	{
		this.model = model;
		this.data = model.getCreatureData(Helper.unwrapString(data.get(UUID)));
	}

	public CreatureImpl(String name, Genome genome, Sex sex, GeneticMakeup makeup, int matingsAvailable, Map<String, String> properties, CreatureSet parents, Model model)
	{
		this.model = model;
		this.data = new JSONObject();
		data.put(NAME, Helper.wrapString(name));
		// data.put(GENOME, genome.getJSON());
		data.put(SEX, sex.getJSON());
		data.put(MAKEUP, makeup.getJSON());
		data.put(MATINGSAVAILABLE, Helper.wrapNumber(matingsAvailable));
		data.put(PROPERTIES, new JSONObject());
		data.put(PARENTS, parents != null ? parents.getJSON() : new JSONObject());
		data.put(READONLY, JSONBoolean.getInstance(false));
		addProperties(properties);
		data.put(UUID, Helper.wrapString(generateUUID()));
		model.setCreatureData(data);
	}

	public CreatureSet getParents()
	{
		return new CreatureSetImpl(data.get(PARENTS).isObject(), getModel());
	}

	public Genome getGenome()
	{
		return getModel().getGenome();
	}

	public GeneticMakeup getMakeup()
	{
		return new GeneticMakeupImpl(data.get(MAKEUP).isObject(), getModel());
	}

	public String getName()
	{
		return Helper.unwrapString(data.get(NAME));
	}

	public void setName(String name)
	{
		data.put(NAME, Helper.wrapString(name));
	}

	public Sex getSex()
	{
		return Sex.fromJSON(data.get(SEX));
	}

	public void setSex(Sex sex)
	{
		data.put(SEX, sex.getJSON());
	}

	// TODO: May be a problem - REVISIT
	public int compareTo(star.genetics.genetic.model.Creature o)
	{
		return this.getName().compareTo(o.getName());
	}

	@Override
	public boolean equals(Object obj)
	{
		return (obj instanceof Creature) && (compareTo((Creature) obj) == 0);
	}

	@Override
	public int hashCode()
	{
		return super.hashCode() >> 1;
	}

	public boolean isMateable()
	{
		return !isSterile() && getMatingsAvailable() != 0;
	}

	private boolean isSterile()
	{
		boolean ret = false;
		String sterile = getProperties().get(GeneticModel.sterile);
		if (sterile != null)
		{
			ret = Boolean.parseBoolean(sterile);
		}
		return ret;
	}

	public int getMatingsAvailable()
	{
		return Math.round(Helper.unwrapNumber(data.get(MATINGSAVAILABLE)));
	}

	public void mated()
	{
		int matingsAvailable = getMatingsAvailable();
		matingsAvailable--;
		data.put(MATINGSAVAILABLE, Helper.wrapNumber(matingsAvailable));
		updateMatings();
	}

	public void addProperties(Map<String, String> properties)
	{
		for (Entry<String, String> entry : properties.entrySet())
		{
			getProperties().put(entry.getKey(), entry.getValue());
		}
		updateMatings();
	}

	public JSONableMap getProperties()
	{
		return new JSONableMap(data.get(PROPERTIES).isObject());
	}

	private void updateMatings()
	{
		getProperties().put(GeneticModel.matings, (getMatingsAvailable() > 100 ? "100+" : Integer.toString(getMatingsAvailable()))); //$NON-NLS-1$
	}

	private String generateUUID()
	{
		long uuid1 = -(long) (Math.random() * Long.MAX_VALUE);
		long uuid2 = -(long) (Math.random() * Long.MAX_VALUE);
		return Long.toHexString(uuid1) + Long.toHexString(uuid2);

	}

	@Override
	public String getUUID()
	{
		return Helper.unwrapString(data.get(UUID));
	}

	public JSONObject getJSON()
	{
		JSONObject ret = new JSONObject();
		ret.put(UUID, data.get(UUID));
		return ret;
	}

}
