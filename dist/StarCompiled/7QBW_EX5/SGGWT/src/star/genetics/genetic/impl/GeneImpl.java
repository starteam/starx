package star.genetics.genetic.impl;

import star.genetics.client.Helper;
import star.genetics.client.JSONableList;
import star.genetics.genetic.model.Allele;
import star.genetics.genetic.model.Chromosome;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;

public class GeneImpl implements star.genetics.genetic.model.Gene
{
	private static final long serialVersionUID = 1L;

	private final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	public GeneImpl(JSONObject data, Model model)
	{
		this.data = data;
		this.model = model;
	}

	public GeneImpl(String name, float position, Chromosome chromosome, Model model)
	{
		data = new JSONObject();
		data.put(NAME, Helper.wrapString(name));
		data.put(POSITON, Helper.wrapNumber(position));
		data.put(CHROMOSOME, Helper.wrapString(chromosome.getName()));
		data.put(GENETYPES, new JSONArray());
		chromosome.getGenes().add(this);
		this.model = model;
	}

	public star.genetics.genetic.model.Chromosome getChromosome()
	{
		return getModel().getGenome().getChromosomeByName(Helper.unwrapString(data.get(CHROMOSOME)));
	}

	public String getName()
	{
		return Helper.unwrapString(data.get(NAME));
	}

	public float getPosition()
	{
		return Helper.unwrapNumber(data.get(POSITON));
	}

	public JSONableList<Allele> getGeneTypes()
	{
		return new JSONableList<Allele>(data.get(GENETYPES).isArray())
		{

			@Override
			public Allele create(JSONObject data)
			{
				return new AlleleImpl(data, getModel());
			}
		};
	}

	public String getId()
	{
		return (getChromosome() != null ? getChromosome().getName() : "") + ":" + getName(); //$NON-NLS-1$ //$NON-NLS-2$
	}

	public star.genetics.genetic.model.Allele getAlleleByName(String name)
	{
		star.genetics.genetic.model.Allele ret = null;
		for (star.genetics.genetic.model.Allele a : getGeneTypes())
		{
			if (name.equals(a.getName()))
			{
				ret = a;
				break;
			}
		}
		return ret;
	}

	public int compareTo(star.genetics.genetic.model.Gene that)
	{
		if (this.getChromosome() != null && that.getChromosome() != null && this.getChromosome().equals(that.getChromosome()))
		{
			int ret = Double.compare(this.getPosition(), that.getPosition());
			return ret != 0 ? ret : this.getId().compareTo(that.getId());
		}
		return getId().compareTo(that.getId());
	}

	@Override
	public boolean equals(Object obj)
	{
		boolean ret = false;
		if (obj instanceof GeneImpl)
		{
			GeneImpl that = (GeneImpl) obj;
			ret = getId().equals(that.getId());
		}
		return ret;
	}

	@Override
	public int hashCode()
	{
		return getId().hashCode();
	}

	@Override
	public JSONObject getJSON()
	{
		return data;
	}

}
