package star.genetics.utils;

public class Timer
{
	static long start;

	public static void start()
	{
		start = System.currentTimeMillis();
	}

	public static void stop()
	{
		long stop = System.currentTimeMillis();
		RuntimeException ex = new RuntimeException();
		ex.fillInStackTrace();
		StackTraceElement[] elements = ex.getStackTrace();
		System.err.println("Timer: " + elements[1] + " " + (stop - start) + " ms");
	}
}
