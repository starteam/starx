package star.genetics.client.messages;

import com.google.gwt.core.client.JavaScriptObject;

public class Strain extends JavaScriptObject
{
	protected Strain()
	{
	};

	public final native String getId() /*-{
	                                   return this.id;
	                                   }-*/;

}
