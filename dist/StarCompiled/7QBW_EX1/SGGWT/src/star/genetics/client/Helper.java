package star.genetics.client;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import star.genetics.genetic.model.Creature;
import star.genetics.visualizers.Visualizer;

import com.google.gwt.json.client.JSONNumber;
import com.google.gwt.json.client.JSONString;
import com.google.gwt.json.client.JSONValue;

public class Helper
{
	public static void setVisualizerFromCreature(Visualizer v, Creature c)
	{
		v.setName(c.getName());
		v.setProperties(c.getProperties().asMap(), c.getSex());
	}

	public static void setVisualizerFromCreature(Visualizer v, Creature c, HashMap<String, String> additional)
	{
		v.setName(c.getName());
		// additional.putAll(c.getProperties());
		HashMap<String, String> prop = new HashMap<String, String>();
		prop.putAll(c.getProperties().asMap());
		prop.putAll(additional);
		v.setProperties(prop, c.getSex());
	}

	public static Map<String, String> parse(String value)
	{
		Map<String, String> ret = new TreeMap<String, String>();
		if (value != null)
		{
			if (value.contains("=")) //$NON-NLS-1$
			{
				String elements[] = value.split(","); //$NON-NLS-1$
				for (String element : elements)
				{
					if (element.indexOf('=') != -1)
					{
						String[] pair = element.split("=", 2); //$NON-NLS-1$
						ret.put(pair[0], pair[1]);
					}
					else
					{
						throw new RuntimeException();
						//throw new RuntimeException(MessageFormat.format(Messages.getString("Helper.0"), element, value)); //$NON-NLS-1$
					}
				}
			}
			else if (!value.equalsIgnoreCase("wildtype")) //$NON-NLS-1$
			{
				throw new RuntimeException(Messages.getString("Helper.5")); //$NON-NLS-1$
			}
		}
		return ret;
	}

	public static String export(Map<String, String> source)
	{
		StringBuffer sb = new StringBuffer();
		for (Entry<String, String> entry : source.entrySet())
		{
			sb.append(entry.getKey() + "=" + entry.getValue() + ","); //$NON-NLS-1$ //$NON-NLS-2$
		}
		sb.setLength(sb.length() - 1);
		return sb.toString();
	}

	private static String MODEL_PROVIDER_EXCEPTION = "Model Modified Provider not found"; //$NON-NLS-1$

	public static final JSONValue wrapString(String value)
	{
		if (value != null)
		{
			return new JSONString(value);
		}
		return new JSONString("");
	}

	public static final String unwrapString(JSONValue value)
	{
		if (value == null)
		{
			return null;
		}
		JSONString s = value.isString();
		return s != null ? s.stringValue() : null;
	}

	public static JSONValue wrapNumber(float position)
	{
		return new JSONNumber(position);
	}

	public static float unwrapNumber(JSONValue jsonValue)
	{
		JSONNumber ret = jsonValue.isNumber();
		return ret != null ? (float) ret.doubleValue() : Float.NaN;
	}
}
