package star.genetics.tests;

import star.genetics.beans.StringTokenizer;
import star.genetics.client.Stargenetics_gwt_java;
import star.genetics.client.messages.Exec;

import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONString;

public class JSONModel extends BaseTest
{
	public String getJson()
	{
		// getJSON("setupmodel.json");
		return getJson1();
	}

	public void st_test()
	{
		if( true )
		{
		StringTokenizer st = new StringTokenizer("a,b" , ",");
		assertTrue(st.hasMoreTokens());
		assertEquals("a", st.nextToken().trim());
		assertTrue(st.hasMoreTokens());
		assertEquals("b", st.nextToken().trim());
		}
	}
	public void test()
	{
		open();
		listStrains();
	}

	private void listStrains()
	{

		JSONObject request = new JSONObject();
		request.put("token", new JSONString("1"));
		request.put("command", new JSONString("liststrains"));
		Exec exec = request.getJavaScriptObject().cast();
		Exec.testingCallback = info;
		Stargenetics_gwt_java.execute(exec);
		assertTrue(success);
	}

	
}
