package star.genetics.utils;

public class Debug
{

	public static void printStackTraceShort()
	{
		StackTraceElement[] array = (new RuntimeException()).getStackTrace();
		for (int i = 0; i < Math.min(array.length, 32); i++)
		{
			if (array[i].getLineNumber() >= 0)
			{
				System.err.println(array[i]);
			}
		}
	}

	public static void printStackTrace()
	{
		StackTraceElement[] array = (new RuntimeException()).getStackTrace();
		for (int i = 0; i < Math.min(array.length, 32); i++)
		{
			System.err.println(array[i]);
		}
	}
}
