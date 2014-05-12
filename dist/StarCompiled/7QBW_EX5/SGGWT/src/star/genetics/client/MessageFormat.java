package star.genetics.client;

public class MessageFormat
{
	public static String format(String format, Object... varags)
	{
		String ret = format;
		log("MessageFormat [A]:" + ret);
		for (int i = 0; i < varags.length; i++)
		{
			log("MessageFormat [E]:" + ret);
			ret = ret.replaceAll("\\{" + i + "\\}", String.valueOf(varags[i]));
			log("MessageFormat [" + i + "]:" + ret);

		}
		log("MessageFormat [Z]:" + ret);
		return ret;
	};

	private static native void log(String str)
	/*-{
			console.info( str ) ;
	}-*/;
}
