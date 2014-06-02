package star.genetics.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.core.client.JavaScriptObject;
import com.google.gwt.core.client.JsonUtils;
import com.google.gwt.http.client.Request;
import com.google.gwt.http.client.RequestBuilder;
import com.google.gwt.http.client.RequestCallback;
import com.google.gwt.http.client.RequestException;
import com.google.gwt.http.client.Response;

//import java.util.Locale;
//import java.util.MissingResourceException;
//import java.util.ResourceBundle;

public class Messages
{
	static JavaScriptObject map = null;

	static void initialize()
	{
		String url = GWT.getModuleBaseURL() + "/messages/messages_en.json";
		RequestBuilder builder = new RequestBuilder(RequestBuilder.GET, url);
		try
		{
			builder.sendRequest(null, new RequestCallback()
			{

				@Override
				public void onResponseReceived(Request request, Response response)
				{
					map = JsonUtils.safeEval(response.getText());
					getNativeString("About.0", map);
				}

				@Override
				public void onError(Request request, Throwable exception)
				{

				}
			});
		}
		catch (RequestException e)
		{

		}
	}

	private static native String getNativeString(String key, JavaScriptObject map)
	/*-{
		if (map) {
			var ret = decodeURI(map[key]);
			console.info("getNativeString: MAP: " + map);
			console.info("getNativeString: KEY: " + key);
			console.info("getNativeString: RET: " + ret);
			console.info(map);
			return ret;
		}
		else
		{
		return '!NATIVE!' + key + '!';
		}
	}-*/;

	public static String getString(String key)
	{
		String ret = getNativeString(key, map);
		// String ret = null;
		return ret != null ? ret : '!' + key + '!';
	}

}
