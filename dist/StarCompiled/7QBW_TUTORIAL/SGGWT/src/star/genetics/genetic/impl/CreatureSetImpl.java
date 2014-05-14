package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.Iterator;

import star.genetics.client.JSONableList;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;

public class CreatureSetImpl implements star.genetics.genetic.model.CreatureSet, Serializable
{
	private static final long serialVersionUID = 1L;
	private final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	CreatureSetImpl(JSONObject data, Model model)
	{
		this.data = data;
		this.model = model;
		if (data.get(CREATURES) == null)
		{
			data.put(CREATURES, new JSONArray());
		}
	}

	public CreatureSetImpl(Model model)
	{
		this.model = model;
		data = new JSONObject();
		data.put(CREATURES, new JSONArray());
	}

	JSONableList<Creature> getCreatures()
	{
		return new JSONableList<Creature>(data.get(CREATURES).isArray())
		{
			@Override
			public Creature create(JSONObject data)
			{
				return new CreatureImpl(data, getModel());
			}

		};
	}

	public Iterator<Creature> iterator()
	{
		return getCreatures().iterator();
	}

	public void add(Creature c)
	{
		getCreatures().add(c);
	}

	public boolean contains(Creature c)
	{
		return getCreatures().contains(c);
	}

	public Creature get(int index)
	{
		return getCreatures().get(index);
	}

	public int size()
	{
		return getCreatures().size();
	}

	@Override
	public String toString()
	{
		StringBuilder sb = new StringBuilder();
		for (Creature c : this)
		{
			sb.append(c.getName());
			sb.append(","); //$NON-NLS-1$
		}
		return sb.length() > 0 ? sb.substring(0, sb.length() - 1) : ""; //$NON-NLS-1$
	}

	public String toShortString()
	{
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < getCreatures().size(); i++)
		{
			sb.append(" " + getCreatures().get(i).getName()); //$NON-NLS-1$
		}
		return sb.toString();
	}

	@Override
	public JSONObject getJSON()
	{
		return this.data;
	}

}
