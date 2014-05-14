package star.genetics.tests;

import star.genetics.client.Stargenetics_gwt_java;
import star.genetics.client.messages.Exec;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONString;

public class Mate1 extends BaseTest
{

	@Override
    public String getJson()
    {
		return getJson1();
    }

	public void test()
	{
		open();
		listStrains();
		mate();
	}

	private void listStrains()
	{

		JSONObject request = new JSONObject();
		request.put("token", new JSONString("1"));
		request.put("command", new JSONString("liststrains"));
		Exec exec = request.getJavaScriptObject().cast();
		Exec.testingCallback = info;
		Stargenetics_gwt_java.execute(exec);
	}
	
	private void mate()
	{
		listStrains();
		JSONObject listStrainsResult = new JSONObject(info_result);
		JSONArray strains = listStrainsResult.get("strains").isArray();
		
		JSONObject request = new JSONObject();
		request.put("token", new JSONString("1"));
		request.put("command", new JSONString("updateexperiment"));
		
		JSONObject data = new JSONObject();
		request.put("data", data);
		data.put( "command" , new JSONString("mate"));
		
		JSONObject experiment = new JSONObject();	
		data.put( "experiment" , experiment) ;
		experiment.put("name", new JSONString("New Experiment"));
		
		JSONArray parents = new JSONArray();
		parents.set(0, strains.get(0));
		parents.set(1, strains.get(1));
		experiment.put("parents", parents);
		
		Exec exec = request.getJavaScriptObject().cast();
		Exec.testingCallback = info;
		Stargenetics_gwt_java.execute(exec);
				
	}
}
