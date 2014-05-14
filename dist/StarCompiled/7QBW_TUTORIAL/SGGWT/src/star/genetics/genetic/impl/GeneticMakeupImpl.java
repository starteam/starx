package star.genetics.genetic.impl;

import java.util.logging.Level;
import java.util.logging.Logger;

import star.genetics.client.Helper;
import star.genetics.genetic.model.Allele;
import star.genetics.genetic.model.Chromosome;
import star.genetics.genetic.model.DiploidAlleles;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONString;
import com.google.gwt.json.client.JSONValue;

public class GeneticMakeupImpl implements star.genetics.genetic.model.GeneticMakeup
{

	private static final long serialVersionUID = 1L;
	private final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	GeneticMakeupImpl(JSONObject data, Model model)
	{
		this.model = model;
		this.data = data;
	}

	public GeneticMakeupImpl(Model model)
	{
		this.model = model;
		this.data = new JSONObject();
		data.put(MAKEUP, new JSONObject());
	}

	@Override
	public JSONObject getJSON()
	{
		return data;
	}

	public String toStr(Gene g)
	{
//		JSONObject ret = new JSONObject();
//		ret.put("chromosome", Helper.wrapString(g.getChromosome().getName()));
//		ret.put("gene", Helper.wrapString(g.getName()));
//		return ret.toString();
		return g.getId();
	}

	public void put(Gene g, DiploidAlleles d)
	{
		data.get(MAKEUP).isObject().put(toStr(g), d.getJSON());
	}

	public DiploidAlleles get(Gene g)
	{
		JSONValue value = data.get(MAKEUP).isObject().get(toStr(g));
		if (value != null)
		{
			return new DiploidAllelesImpl(value.isObject(), getModel());
		}
		else
		{
			return null;
		}
	}

	public DiploidAlleles get(String g)
	{
		JSONValue value = data.get(MAKEUP).isObject().get(g);
		if (value != null)
		{
			return new DiploidAllelesImpl(value.isObject(), getModel());
		}
		else
		{
			return null;
		}
	}

	int size()
	{
		return data.get(MAKEUP).isObject().size();
	}

	@Override
	public boolean equals(Object other)
	{
		boolean ret = false;
		if (other != null && other.getClass().equals(this.getClass()))
		{
			GeneticMakeupImpl that = (GeneticMakeupImpl) other;
			if (that.size() == this.size())
			{
				ret = true;
				for (String g : data.get(MAKEUP).isObject().keySet())
				{
					DiploidAlleles thisDiploid = this.get(g);
					DiploidAlleles thatDiploid = that.get(g);
					if (thisDiploid == null || thatDiploid == null)
					{
						ret = false;
						break;
					}
					if (!thisDiploid.equals(thatDiploid))
					{
						ret = false;
						break;
					}
				}
			}
		}
		return ret;
	}

	private boolean test(Allele a, Allele b, Allele x, Allele y)
	{

		boolean ax, by;
		if (a != null)
		{
			ax = a.equals(x);
		}
		else
		{
			ax = true;
		}
		if (b != null)
		{
			by = b.equals(y);
		}
		else
		{
			by = true;
		}
		return ax & by;
	}

	private boolean test(RuleMakeup map, boolean swap)
	{
		boolean ret = true;
		try
		{
			for (String s : map.keySet())
			{
				
				DiploidAlleles rule = map.get(s);
				DiploidAlleles organism = get(s);
				// for (Entry<Gene, DiploidAlleles> entry : map.entrySet())
				// {
				// DiploidAlleles rule = entry.getValue();
				// DiploidAlleles organism = get(entry.getKey());

				if (organism == null)
				{
					ret = false;
					break;
				}
				Allele r0 = rule.get(swap ? 0 : 1);
				Allele r1 = rule.get(swap ? 1 : 0);

				Allele o0 = organism.get(0);
				Allele o1 = organism.get(1);

				ret &= test(r0, r1, o0, o1);

				if (!ret)
				{
					break;
				}
			}
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}

		return ret;
	}

	public boolean test(Chromosome chromosome, RuleMakeup map)
	{
		boolean ret = test(map, false) || test(map, true);
		return ret;
	}

	public String toShortString()
	{
		StringBuilder sb = new StringBuilder();
		for (String g : data.get(MAKEUP).isObject().keySet())
		{
			DiploidAlleles alleles = get(g);
			if (alleles instanceof DiploidAllelesImpl)
			{
				sb.append(((DiploidAllelesImpl) alleles).toStortString());
			}
			else
			{
				sb.append(alleles.toString());
			}
		}
		return sb.toString();
	}
}
