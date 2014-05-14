package star.genetics.parser;

import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import star.genetics.genetic.impl.ModelImpl;
import star.genetics.genetic.impl.RuleImpl;
import star.genetics.genetic.impl.RuleSetImpl;
import star.genetics.genetic.model.Genome;
import star.genetics.genetic.model.Rule;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;

public class PhenotypeRulesParser
{
	public static void parse(ModelImpl model, JSONArray rules)
	{
		RuleSetImpl set = new RuleSetImpl(model);
		for (int i = 0; i < rules.size(); i++)
		{
			JSONObject rule = rules.get(i).isObject();
			set.add(parseRule(set, rule, model.getGenome(),model));
		}
		model.setRules(set);
	}

	private static Rule parseRule(RuleSetImpl set, JSONObject rule, Genome genome, ModelImpl model)
	{
		String matches = rule.get("matches").isString().stringValue();
		HashMap<String, String> phenotype = parsePhenotype(rule.get("phenotype").isObject());
		RuleImpl ret = new RuleImpl(matches, phenotype, genome,model);
		return ret;
	}

	private static HashMap<String, String> parsePhenotype(JSONObject object)
	{
		HashMap<String, String> ret = new HashMap<String, String>();
		for (String key : object.keySet())
		{
			ret.put(key, object.get(key).toString());
		}
		return ret;
	}

}
