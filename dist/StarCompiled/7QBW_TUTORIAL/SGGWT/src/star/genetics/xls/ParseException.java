package star.genetics.xls;

public class ParseException extends Exception
{

	private static final long serialVersionUID = 1L;

	public ParseException(String name)
	{
		super(name);
	}

	public ParseException(String name, Throwable source)
	{
		super(name, source);
	}
}
