package star.genetics.genetic.impl;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import star.genetics.client.Helper;
import star.genetics.client.JSONableList;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.GeneticMakeup;
import star.genetics.genetic.model.Model;
import star.genetics.genetic.model.Rule;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;

public class RuleSetImpl implements star.genetics.genetic.model.RuleSet
{
	private static final long serialVersionUID = 1L;

	private final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	JSONableList<Rule> getRules()
	{
		return new JSONableList<Rule>(data.get(RULES).isArray())
		{

			@Override
			public Rule create(JSONObject data)
			{
				return new RuleImpl(data, getModel());
			}
		};
	}

	public RuleSetImpl(LinkedHashSet<String> orderedSet, Model model)
	{
		this.data = new JSONObject();
		this.model = model;
		JSONArray d = new JSONArray();
		JSONableList<String> q = new JSONableList<String>(d)
		{

			@Override
			public String create(JSONObject data)
			{
				return Helper.unwrapString(data);
			}
		};
		for (String s : orderedSet)
		{
			q.add(s);
		}
		data.put(PROPERTIES, d);
		data.put(RULES, new JSONArray());
	}

	public JSONObject getJSON()
	{
		return data;
	}

	JSONableList<String> propertyNames()
	{
		return new JSONableList<String>(data.get(PROPERTIES).isArray())
		{
			@Override
			public String create(JSONObject data)
			{
				return Helper.unwrapString(data);
			}

			@Override
			public Iterator<String> iterator()
			{
				return super.iterator();
			}
		};
	}

	public RuleSetImpl(Model model)
	{
		this.model = model;
		this.data = new JSONObject();
		data.put(PROPERTIES, new JSONArray());
		data.put(RULES, new JSONArray());

	}

	public RuleSetImpl(JSONObject data, Model model)
	{
		this.model = model;
		this.data = data;
	}

	public Map<String, String> getProperties(GeneticMakeup genotype, Creature.Sex sex)
	{
		Map<String, String> ret = new TreeMap<String, String>();
		initialize(ret);
		for (Rule r : getRules())
		{
			if (r.isMatching(genotype, sex))
			{
				combine(ret, r.getProperties().asMap());
			}
		}
		LinkedHashMap<String, String> retRule = new LinkedHashMap<String, String>();
		for (String key : propertyNames())
		{
			if (ret.containsKey(key))
			{
				retRule.put(key, ret.get(key));
			}
		}
		return retRule;
	}

	private void combine(Map<String, String> target, Map<String, String> source)
	{
		for (Entry<String, String> entry : source.entrySet())
		{
			String key = entry.getKey();
			String value = entry.getValue();
			if (value.indexOf('=') != -1 && target.containsKey(key))
			{
				String old_value = target.get(key);
				Map<String, String> state = Helper.parse(old_value);
				Map<String, String> update = Helper.parse(value);
				state.putAll(update);
				value = Helper.export(state);
			}
			target.put(key, value);
		}
	}

	@Override
	public boolean add(Rule rule)
	{
		JSONableList<String> propertyNames = propertyNames();
		for (String s : rule.getProperties().asMap().keySet())
		{
			propertyNames.add(s);
		}
		getRules().add(rule);
		return true;
	}

	private void initialize(Map<String, String> ret)
	{
		for (Rule r : getRules())
		{
			if (r.isDefault())
			{
				ret.putAll(r.getProperties().asMap());
			}
		}
	}

	public Set<String> getPropertyNames()
	{
		LinkedHashSet<String> ret = new LinkedHashSet<String>();
		for (String s : propertyNames())
		{
			ret.add(s);
		}
		return ret;
	}

}