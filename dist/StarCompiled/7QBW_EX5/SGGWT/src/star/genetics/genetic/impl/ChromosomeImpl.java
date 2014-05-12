package star.genetics.genetic.impl;

import java.io.Serializable;

import star.genetics.client.Helper;
import star.genetics.client.JSONableList;
import star.genetics.genetic.model.Allele;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.Genome;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;

public class ChromosomeImpl implements star.genetics.genetic.model.Chromosome, Serializable
{
	private static final long serialVersionUID = 1L;
	private final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	public ChromosomeImpl(JSONObject data, Model model)
	{
		this.data = data;
		this.model = model;
	}

	public ChromosomeImpl(String name, Genome genome, Model model)
	{
		data = new JSONObject();
		data.put(NAME, Helper.wrapString(name));
		data.put(GENES, new JSONArray());
		genome.addChromosome(this);
		this.model = model;
	}

	public String getName()
	{
		return Helper.unwrapString(data.get(NAME));
	}

	public JSONableList<Gene> getGenes()
	{
		return new JSONableList<Gene>(data.get(GENES).isArray())
		{
			public Gene create(JSONObject d)
			{
				return new GeneImpl(d, getModel());
			}
		};
	}

	public Allele getAlleleByName(String name)
	{
		Allele ret = null;
		for (Gene g : getGenes())
		{
			Allele a = g.getAlleleByName(name);
			if (a != null)
			{
				ret = a;
				break;
			}
		}
		return ret;
	}

	public Gene getGeneByName(String name)
	{
		Gene ret = null;
		for (Gene g : getGenes())
		{
			if (name.equals(g.getName()))
			{
				ret = g;
				break;
			}
		}
		return ret;
	}

	@Override
	public String toString()
	{
		return this.getClass() + " " + getName() + " " + getGenes(); //$NON-NLS-1$
	}

	@Override
	public JSONObject getJSON()
	{
		return data;
	}

}
