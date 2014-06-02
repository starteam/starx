package star.genetics.client;

import java.util.LinkedHashMap;
import java.util.Map;

import com.google.gwt.json.client.JSONObject;

public class JSONableMap
{

	private JSONObject data;

	public JSONableMap(JSONObject data)
	{
		this.data = data;
	}

	public void put(String matings, String string)
	{
		data.put(matings, Helper.wrapString(string));
	}

	public String get(String str)
	{
		return Helper.unwrapString(data.get(str));
	}

	public Map<String, String> asMap()
	{
		LinkedHashMap<String, String> q = new LinkedHashMap<String, String>();
		for (String key : data.keySet())
		{
			q.put(key, Helper.unwrapString(data.get(key)));
		}
		return java.util.Collections.unmodifiableMap(q);
	}

}
