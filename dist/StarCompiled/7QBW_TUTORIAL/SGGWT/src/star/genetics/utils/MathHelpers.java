package star.genetics.utils;

public class MathHelpers
{
	public static double truncate(double x)
	{
		return Math.round(Math.floor(x));
	}

	public static int truncate(float x)
	{
		return (int) Math.round(Math.floor(x));
	}

	public static float distance(float ax, float ay, float bx, float by)
	{
		float dx = bx - ax;
		float dy = by - ay;
		return (float) Math.sqrt(dx * dx + dy * dy);
	}

	public static float normalize(float scale)
	{
		if (scale < 0)
		{
			return 0f;
		}
		else if (scale > 1)
		{
			return 1f;
		}
		else
		{
			return scale;
		}
	}

	public static int compare(int a, int b)
	{
		if (a == b)
		{
			return 0;
		}
		else
		{
			return a > b ? 1 : -1;
		}

	}
}
