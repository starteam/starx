package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.ArrayList;

import star.genetics.client.JSONableList;
import star.genetics.genetic.model.Allele;
import star.genetics.genetic.model.Gel;
import star.genetics.genetic.model.GelPosition;
import star.genetics.genetic.model.GelRules;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;

public class GelRulesImpl implements GelRules, Serializable
{
	private static final long serialVersionUID = 1L;

	private final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	public GelRulesImpl(JSONObject data, Model model)
	{
		this.data = data;
		this.model = model;
	}

	public GelRulesImpl(Model model)
	{
		this.model = model;
		data = new JSONObject();
		data.put(GELS, new JSONArray());
		data.put(POS, new JSONArray());
	}

	public JSONObject getJSON()
	{
		return data;
	};

	JSONableList<Gel> gels()
	{
		return new JSONableList<Gel>(data.get(GELS).isArray())
		{

			@Override
			public Gel create(JSONObject data)
			{
				return new GelImpl(data, getModel());
			}
		};
	}

	JSONableList<GelPosition> pos()
	{
		return new JSONableList<GelPosition>(data.get(POS).isArray())
		{

			@Override
			public GelPosition create(JSONObject data)
			{
				return new GelPositionImpl(data, getModel());
			}
		};
	}

	private Gel getOrCreateGel(String name)
	{
		for (Gel g : gels())
		{
			if (g.getName().equals(name))
			{
				return g;
			}
		}
		GelImpl gi = new GelImpl(name, gels().size(), getModel());
		gels().add(gi);
		return gi;
	}

	public void addGel(String gelName)
	{
		getOrCreateGel(gelName);
	}

	public void addGel(String gelName, Allele allele, Float[] position)
	{
		Gel g = getOrCreateGel(gelName);
		GelPositionImpl gpi = new GelPositionImpl(g, position, allele, getModel());
		g.addGelPosition(gpi);
		pos().add(gpi);
	}

	@Override
	public Iterable<Gel> getAllGelNames()
	{
		return gels();
	}

	@Override
	public Iterable<GelPosition> getGel(Iterable<Allele> alleles)
	{
		ArrayList<GelPosition> ret = new ArrayList<GelPosition>();
		for (GelPosition g : pos())
		{
			for (Allele a : alleles)
			{
				if (g.getAllele().equals(a))
				{
					ret.add(g);
				}
			}
		}
		return ret;
	}

	@Override
	public String toString()
	{
		StringBuffer sb = new StringBuffer();
		sb.append("[" + this.getClass().getName()); //$NON-NLS-1$
		for (GelPosition gp : pos())
		{
			sb.append("\n\t" + gp); //$NON-NLS-1$
		}
		sb.append("\n]"); //$NON-NLS-1$
		return sb.toString();
	}

	@Override
	public Iterable<GelPosition> getAllGelPositions()
	{
		return pos();
	}

	@Override
	public int sizeGels()
	{
		return gels().size();
	}
}
