package star.genetics.client.messages;

import java.util.logging.Level;
import java.util.logging.Logger;

import star.genetics.client.StarGenetics;
import star.genetics.genetic.impl.ModelImpl;
import star.genetics.genetic.model.Model;
import star.genetics.parser.ModelParser;

import com.google.gwt.core.client.JavaScriptObject;
import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONParser;
import com.google.gwt.json.client.JSONString;

public class Open extends Exec
{
	protected Open()
	{
	}

	public final native String getProtocol() /*-{
		return this.data.protocol;
	}-*/;

	public final native String getJSONModel() /*-{
		return JSON.stringify(this.data.model);
	}-*/;

	public final native JavaScriptObject getModel() /*-{
		return this.data.model;
	}-*/;

	public final Model execute(StarGenetics starGenetics)
	{
		final String VERSION_1 = "Version_1";
		final String SERIALIZED_1 = "Serialized_1";
		Model model = null;
		if (VERSION_1.equalsIgnoreCase(getProtocol()))
		{
			model = ModelParser.parse(getJSONModel());
			JSONObject ret = new JSONObject();
			starGenetics.setModel(model);
			onSuccess(ret.getJavaScriptObject());
		}
		else if (SERIALIZED_1.equalsIgnoreCase(getProtocol()))
		{
						
			model = new ModelImpl(JSONParser.parseStrict(getJSONModel()).isObject());
			starGenetics.setModel(model);
			JSONObject ret = new JSONObject();
			onSuccess(ret.getJavaScriptObject());
			starGenetics.setModel(model);
		}
		else
		{
			JSONObject ret = new JSONObject();
			ret.put("error", new JSONString("Unrecognized protocol."));
			onError(ret.getJavaScriptObject());
		}
		return model;
	}
}
