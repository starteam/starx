package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.Iterator;

import star.genetics.client.Helper;
import star.genetics.client.JSONableList;
import star.genetics.genetic.model.Gel;
import star.genetics.genetic.model.GelPosition;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;

public class GelImpl implements Gel, Serializable
{
	private static final long serialVersionUID = 1L;
	private final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	public GelImpl(String name, int index, Model model)
	{
		this.model = model;
		data = new JSONObject();
		data.put(NAME, Helper.wrapString(name));
		data.put(INDEX, Helper.wrapNumber(index));
		data.put(SET, new JSONArray());
	}

	public GelImpl(JSONObject data, Model model)
	{
		this.model = model;
		this.data = data;
	}

	@Override
	public JSONObject getJSON()
	{
		return data;
	}

	@Override
	public String getName()
	{

		return Helper.unwrapString(data.get(NAME));
	}

	@Override
	public int getIndex()
	{
		return Math.round(Helper.unwrapNumber(data.get(INDEX)));
	}

	JSONableList<GelPosition> set()
	{
		return new JSONableList<GelPosition>(data.get(SET).isArray())
		{

			@Override
			public GelPosition create(JSONObject data)
			{
				return new GelPositionImpl(data, getModel());
			}
		};
	}

	public void addGelPosition(GelPosition gp)
	{
		set().add(gp);
	}

	@Override
	public Iterator<GelPosition> iterator()
	{
		// TODO Auto-generated method stub
		return set().iterator();
	}

}
