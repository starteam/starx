package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.Iterator;

import star.genetics.client.Helper;
import star.genetics.client.JSONableList;
import star.genetics.genetic.model.CrateModel;
import star.genetics.genetic.model.CrateSet;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;

public class CrateSetImpl implements CrateSet, Serializable
{
	private static final long serialVersionUID = 1L;
	private JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	CrateSetImpl(JSONObject data, Model model)
	{
		this.data = data;
		this.model = model;
	}

	CrateSetImpl(Model model)
	{
		this.model = model;
		this.data = new JSONObject();
		data.put(ID, Helper.wrapNumber(1));
		data.put(SET, new JSONArray());
	}

	public JSONObject getJSON()
	{
		return data;
	}

	public void setJSON(JSONObject data)
	{
		this.data = data;
	}

	JSONableList<CrateModel> getSet()
	{
		return new JSONableList<CrateModel>(data.get(SET).isArray())
		{
			public CrateModel create(JSONObject data)
			{
				return new CrateModelImpl(data, getModel());
			}
		};
	}

	private void add(CrateModel crate)
	{
		getSet().add(crate);
	}

	public CrateModel current()
	{
		return getSet().get(getSet().size() - 1);
	}

	static class CrateIterator implements Iterator<CrateModel>
	{
		public CrateIterator(JSONableList<CrateModel> set)
		{
			this.set = set;
			index = set.size();
		}

		int index;
		JSONableList<CrateModel> set;

		public boolean hasNext()
		{
			return index > 0;
		}

		public CrateModel next()
		{
			index--;
			if (index > set.size())
			{
				index = set.size() - 1;
			}
			return set.get(index);
		}

		public void remove()
		{

		}

	}

	public Iterator<CrateModel> iterator()
	{
		// return set.iterator();
		return new CrateIterator(getSet());
	}

	public CrateModel newCrateModel()
	{
		int id = Math.round(Helper.unwrapNumber(data.get(ID)));
		CrateModel ret = new CrateModelImpl(id, getModel());
		id++;
		data.put(ID, Helper.wrapNumber(id));
		add(ret);
		return ret;
	}

	public int size()
	{
		return getSet().size();
	}
}
