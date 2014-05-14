package star.genetics.genetic.impl;

import java.io.Serializable;

import star.genetics.genetic.model.Creature.Sex;
import star.genetics.genetic.model.GeneticMakeup;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONObject;

public class SexRuleImpl implements IndividualRule, Serializable
{
	private static final long serialVersionUID = 1L;

	final Model model;

	@Override
	public Model getModel()
	{
		return model;
	}

	private Sex s()
	{
		return Sex.fromJSON(data.get(SEX));
	};

	private final JSONObject data;

	public SexRuleImpl(Sex s, Model model)
	{
		data = new JSONObject();
		data.put(SEX, s.getJSON());
		this.model = model;
	}

	public SexRuleImpl(JSONObject data, Model model)
	{
		this.data = data;
		this.model = model;
	}

	@Override
	public JSONObject getJSON()
	{
		return data;
	}

	public boolean test(GeneticMakeup makeup, Sex sex)
	{

		return s().equals(sex);
	}

}
