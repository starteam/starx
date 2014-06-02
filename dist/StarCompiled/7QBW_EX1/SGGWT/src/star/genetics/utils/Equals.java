package star.genetics.utils;

final public class Equals
{
	public static Object getNullEquals(Object obj)
	{
		return obj != null ? obj : new Equals();
	}

	public static boolean isEquals(Object a, Object b)
	{
		return getNullEquals(a).equals(getNullEquals(b));
	}

	@Override
	public boolean equals(Object obj)
	{
		if (obj != null)
		{
			return (obj instanceof Equals);
		}
		return true;
	}
}
