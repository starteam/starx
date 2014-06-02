package star.genetics.client.messages;

import com.google.gwt.core.client.Callback;
import com.google.gwt.core.client.JavaScriptObject;

public class Exec extends JavaScriptObject
{
	public static Callback<JavaScriptObject, JavaScriptObject> testingCallback;

	protected Exec()
	{
		super();
	}

	public final native String getToken() /*-{
	                                      return this.token;
	                                      }-*/;

	public final native String getCommand() /*-{
	                                        return this.command;
	                                        }-*/;

	public final void onSuccess(JavaScriptObject json)
	{
		if (!onSuccessNative(json))
		{
			if (testingCallback != null)
			{
				testingCallback.onSuccess(json);
			}
		}
	}

	private final native String toJSON(JavaScriptObject that) /*-{
	                                                          return JSON.stringify(that);
	                                                          }-*/;

	private final native boolean onSuccessNative(JavaScriptObject json)
	/*-{
		if (this.callbacks) {
			this.callbacks.onsuccess({
				source : this,
				payload : json
			});
			return true;
		} else {
			return false;
		}
	}-*/;

	public final void onError(JavaScriptObject json)
	{
		if (!onErrorNative(json))
		{
			if (testingCallback != null)
			{
				testingCallback.onFailure(json);
			}
		}
	}

	private final native boolean onErrorNative(JavaScriptObject json)
	/*-{
		if (this.callbacks) {
			this.callbacks.onerror({
				source : this,
				payload : json
			});
			return true;
		} else {
			return false;
		}
	}-*/;
}