package star.genetics.client.messages;

import com.google.gwt.core.client.JavaScriptObject;
import com.google.gwt.json.client.JSONArray;

public class Experiment extends JavaScriptObject
{
	protected Experiment()
	{
	}

	public final native String getId() /*-{
	                                   return this.id; 
	                                   }-*/;

	public final native String getName() /*-{
	                                     return this.name; 
	                                     }-*/;

	public final JavaScriptObject[] getParents()
	{
		JavaScriptObject src = getNativeParents();
		JSONArray array = new JSONArray(src);
		JavaScriptObject[] ret = new JavaScriptObject[array.size()];
		for (int i = 0; i < ret.length; i++)
		{
			ret[i] = array.get(i).isObject().getJavaScriptObject();
		}
		return ret;
	}

	public final native JavaScriptObject getNativeParents() /*-{
	                                                        return this.parents; 
	                                                        }-*/;

	public final native JavaScriptObject[] getProgenies() /*-{
	                                                      return this.progenies; 
	                                                      }-*/;

}
