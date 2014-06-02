package star.genetics.genetic.impl;

import java.io.Serializable;

import star.genetics.client.Helper;
import star.genetics.genetic.model.Chromosome;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.Genome;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONObject;

public class AlleleImpl implements star.genetics.genetic.model.Allele, Serializable
{
	private static final long serialVersionUID = 1L;
	final JSONObject data;

	final Model model;

	@Override
	public Model getModel()
	{
		return model;
	}

	public AlleleImpl(JSONObject data, Model model)
	{
		this.data = data;
		this.model = model;
	}

	public AlleleImpl(String name, Gene gene, Model model)
	{
		data = new JSONObject();
		data.put(NAME, Helper.wrapString(name));
		data.put(CHROMOSOME, Helper.wrapString(gene.getChromosome().getName()));
		data.put(GENE, Helper.wrapString(gene.getName()));
		gene.getGeneTypes().add(this);
		this.model = model;
	}

	public String getName()
	{
		return Helper.unwrapString(data.get(NAME));
	}

	public Gene getGene()
	{
		Genome g = getModel().getGenome();
		Chromosome c = g.getChromosomeByName(Helper.unwrapString(data.get(CHROMOSOME)));
		Gene gene = c.getGeneByName(Helper.unwrapString(data.get(GENE)));
		return gene;
	}

	@Override
	public String toString()
	{
		return getGene().getName() + " " + getName(); //$NON-NLS-1$
	}

	@Override
	public boolean equals(Object obj)
	{
		boolean ret = false;
		if (obj instanceof AlleleImpl)
		{
			AlleleImpl that = (AlleleImpl) obj;
			if (this.getGene() != null && this.getGene().equals(that.getGene()))
			{
				ret = this.getName().equals(that.getName());
			}
		}
		return ret;
	}

	@Override
	public int hashCode()
	{
		return getName().hashCode() ^ getGene().hashCode();
	}

	@Override
	public JSONObject getJSON()
	{
		return data;
	}
}
