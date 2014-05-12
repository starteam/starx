package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

import star.genetics.client.Messages;
import star.genetics.genetic.model.Allele;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONValue;

public class DiploidAllelesImpl implements star.genetics.genetic.model.DiploidAlleles, Serializable
{
	private static final long serialVersionUID = 1L;
	private final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	DiploidAllelesImpl(JSONObject data, Model model)
	{
		this.data = data;
		this.model = model;
	}

	public DiploidAllelesImpl(Allele[] alleles, Model model)
	{
		this.model = model;
		if (alleles != null && (alleles.length == 1 || alleles.length == 2))
		{
			data = new JSONObject();
			if (alleles[0] != null)
			{
				data.put(ALLELE_1, alleles[0].getJSON());
			}
			if (alleles.length == 2 && alleles[1] != null)
			{
				data.put(ALLELE_2, alleles[1].getJSON());
			}
		}
		else
		{
			throw new RuntimeException(Messages.getString("DiploidAllelesImpl.0")); //$NON-NLS-1$
		}
	}

	public DiploidAllelesImpl(Allele a1, Allele a2, Model model)
	{
		this.model = model;
		data = new JSONObject();
		if (a1 != null)
		{
			data.put(ALLELE_1, a1.getJSON());
		}
		if (a2 != null)
		{
			data.put(ALLELE_2, a2.getJSON());
		}
	}

	Allele get(JSONValue data)
	{
		if (data != null)
		{
			JSONObject o = data.isObject();
			return o != null ? new AlleleImpl(o, getModel()) : null;
		}
		else
		{
			return null;
		}

	}

	Allele a1()
	{
		return get(data.get(ALLELE_1));
	}

	Allele a2()
	{
		return get(data.get(ALLELE_2));
	}

	Allele meiosis()
	{
		return (java.lang.Math.random() < .5) ? a1() : a2();
	}

	public String toStortString()
	{
		return "(" + (a1() != null ? a1().getName() : "-") + "," + (a2() != null ? a2().getName() : "-") + ")"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
	}

	public int getAlleleCount()
	{
		int ret = 0;
		ret += a1() != null ? 1 : 0;
		ret += a2() != null ? 1 : 0;
		return ret;
	}

	public Allele get(int i)
	{
		Allele ret = null;
		if (i == 0)
		{
			ret = a1();
		}
		else if (i == 1)
		{
			ret = a2();
		}
		return ret;
	}

	@Override
	public boolean equals(Object obj)
	{
		if (obj instanceof DiploidAllelesImpl)
		{
			DiploidAllelesImpl that = (DiploidAllelesImpl) obj;
			Allele this1 = this.get(0);
			Allele this2 = this.get(1);
			Allele that1 = that.get(0);
			Allele that2 = that.get(1);
			return (star.genetics.genetic.impl.Utilities.compare(this1, that1) && star.genetics.genetic.impl.Utilities.compare(this2, that2)) || (star.genetics.genetic.impl.Utilities.compare(this1, that2) && star.genetics.genetic.impl.Utilities.compare(this2, that1));
		}
		return false;
	}

	@Override
	public int hashCode()
	{
		return toStortString().hashCode();
	}

	@Override
	public JSONObject getJSON()
	{
		return data;
	}

}
