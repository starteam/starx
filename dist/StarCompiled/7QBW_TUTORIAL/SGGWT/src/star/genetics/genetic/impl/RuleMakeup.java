package star.genetics.genetic.impl;

import java.util.Set;

import star.genetics.client.JSONable;
import star.genetics.genetic.model.DiploidAlleles;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONObject;

public class RuleMakeup implements JSONable
{

	private final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	RuleMakeup(JSONObject data, Model model)
	{
		this.data = data;
		this.model = model;
	}

	@Override
	public JSONObject getJSON()
	{
		return data;
	}

	public void put(Gene g, DiploidAlleles d)
	{
		String gene_str = g.getId();
		data.get(MAKEUP).isObject().put(gene_str, d.getJSON());
	}

	public DiploidAlleles get(Gene g)
	{
		return new DiploidAllelesImpl(data.get(MAKEUP).isObject().get(g.getId()).isObject(), getModel());
	}

	public DiploidAlleles get(String g)
	{
		return new DiploidAllelesImpl(data.get(MAKEUP).isObject().get(g).isObject(), getModel());
	}

	int size()
	{
		return data.get(MAKEUP).isObject().size();
	}

	public Set<String> keySet()
	{
		return data.get(MAKEUP).isObject().keySet();
	}

}