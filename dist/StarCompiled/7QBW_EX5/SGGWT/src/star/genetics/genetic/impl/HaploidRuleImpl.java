package star.genetics.genetic.impl;

import star.genetics.genetic.model.Creature.Sex;
import star.genetics.genetic.model.GeneticMakeup;

import com.google.gwt.json.client.JSONObject;

public class HaploidRuleImpl implements IndividualRule
{
	private static final long serialVersionUID = 1L;

	public boolean test(GeneticMakeup makeup, Sex sex)
	{

		return sex != null;
	}

	@Override
	public JSONObject getJSON()
	{
		return new JSONObject();
	}

	public HaploidRuleImpl(JSONObject data)
	{
	}

	public HaploidRuleImpl()
	{

	}

	public star.genetics.genetic.model.Model getModel()
	{
		return null;
	};
}
