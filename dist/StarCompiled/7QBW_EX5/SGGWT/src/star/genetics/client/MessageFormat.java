package star.genetics.client;

public class MessageFormat
{
	static boolean DEBUG = false;

	public static String format(String format, Object... varags)
	{
		String ret = format;
		if (DEBUG)
			log("MessageFormat [A]:" + ret);
		if (varags != null && varags.length > 0)
		{
			for (int i = 0; i < varags.length; i++)
			{
				if (DEBUG)
					log("MessageFormat [E]:" + ret);
				ret = ret.replaceAll("\\{" + i + "\\}", String.valueOf(varags[i]));
				if (DEBUG)
					log("MessageFormat [" + i + "]:" + ret);

			}
		}
		if (DEBUG)
			log("MessageFormat [Z]:" + ret);
		return ret;
	};

	private static native void log(String str)
	/*-{
		if (console && console.info) {
			console.info(str);
		}
	}-*/;
}
