package star.genetics.genetic.impl;

import star.genetics.genetic.model.Creature.Sex;
import star.genetics.genetic.model.GeneticMakeup;

import com.google.gwt.json.client.JSONObject;

public class HaploidRuleImpl implements IndividualRule
{
	private static final long serialVersionUID = 1L;
	private JSONObject data;

	public boolean test(GeneticMakeup makeup, Sex sex)
	{
//TODO: implement haploid rule
		return sex != null;
	}

	@Override
	public JSONObject getJSON()
	{
		return data;
	}

	public HaploidRuleImpl(JSONObject data)
	{
		this.data = data;
	}

	public HaploidRuleImpl()
	{
		this.data = new JSONObject();
	}

	public star.genetics.genetic.model.Model getModel()
	{
		return null;
	};
}
