package star.genetics.client;

import com.google.gwt.json.client.JSONObject;

public interface CreatureProxy
{
	public JSONObject getCreatureData(String uuid);

	public void setCreatureData(JSONObject data);
}
