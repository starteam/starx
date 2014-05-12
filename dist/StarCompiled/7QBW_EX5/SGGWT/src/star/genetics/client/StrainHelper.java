package star.genetics.client;

import java.util.Map;
import java.util.Map.Entry;

import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.RuleSet;

import com.google.gwt.json.client.JSONNumber;
import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONString;

public class StrainHelper
{
	public static JSONObject getShort(Creature creature)
	{
		JSONObject ret = new JSONObject();
		ret.put("name", new JSONString(creature.getName()));
		ret.put("id", new JSONString(creature.getUUID()));
		ret.put("export_type", new JSONString("short"));
		return ret;
	}

	public static JSONObject getLong(Creature creature, RuleSet rules)
	{
		JSONObject ret = new JSONObject();
		if (creature != null)
		{
			JSONObject phenotype = new JSONObject();
			Map<String, String> properties = rules.getProperties(creature.getMakeup(), creature.getSex());
			for (Entry<String, String> e : properties.entrySet())
			{
				phenotype.put(e.getKey(), new JSONString(e.getValue()));
			}
			ret.put("phenotype", phenotype);
			ret.put("name", new JSONString(creature.getName()));
			ret.put("id", new JSONString(creature.getUUID()));
			ret.put("export_type", new JSONString("long"));
			ret.put("sex", new JSONString(creature.getSex().name()));
			ret.put("matings_available", new JSONNumber(creature.getMatingsAvailable()));

		}
		return ret;

	}
}
