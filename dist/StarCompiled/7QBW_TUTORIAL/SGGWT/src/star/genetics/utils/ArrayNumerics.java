package star.genetics.utils;

public class ArrayNumerics
{

	public static boolean containsNaN(float[] array)
	{
		for (float f : array)
		{
			if (Float.isNaN(f))
			{
				return true;
			}
		}
		return false;
	}

	public static float average(float[] array, boolean ignoreSpecial)
	{
		float ret = 0;
		int count = 0;
		for (int i = 0; i < array.length; i++)
		{
			if (ignoreSpecial)
			{
				if (!Float.isNaN(array[i]) && !Float.isInfinite(array[i]))
				{
					ret += array[i];
					count++;
				}
			}
			else
			{
				ret += array[i];
				count++;
			}
		}
		return ret / count;

	}

	public static void normalRange(float[] array)
	{
		float max = array[0];
		float min = array[0];
		for (int i = 0; i < array.length; i++)
		{
			max = Math.max(array[i], max);
			min = Math.min(array[i], min);
		}
		float scale = max - min;
		for (int i = 0; i < array.length; i++)
		{
			array[i] = (array[i] - min) / scale;
		}
	}

	public static void normalize(float[] array)
	{
		float sum = sum(array, true);
		for (int i = 0; i < array.length; i++)
		{
			array[i] /= sum;
		}
	}

	public static void normalize(float[][] array)
	{
		float sum = 0;
		for (int i = 0; i < array.length; i++)
		{
			sum += sum(array[i], true);
		}
		for (int i = 0; i < array.length; i++)
		{
			float[] f = array[i];
			for (int j = 0; j < f.length; j++)
			{
				f[j] /= sum;
			}
		}
	}

	public static float sum(float[] array, boolean ignoreSpecial)
	{
		float ret = 0;
		for (int i = 0; i < array.length; i++)
		{
			if (ignoreSpecial)
			{
				if (!Float.isNaN(array[i]) && !Float.isInfinite(array[i]))
				{
					ret += array[i];
				}
			}
			else
			{
				ret += array[i];
			}
		}
		return ret;
	}

	public static float sum(Float[] array, boolean ignoreSpecial)
	{
		float ret = 0;
		for (int i = 0; i < array.length; i++)
		{
			if (ignoreSpecial)
			{
				if (!Float.isNaN(array[i]) && !Float.isInfinite(array[i]))
				{
					ret += array[i];
				}
			}
			else
			{
				ret += array[i];
			}
		}
		return ret;
	}

	public static int findLastNonZero(float[] src)
	{
		int ret = src.length;
		while (src[ret - 1] == 0 && ret > 0)
		{
			ret--;
		}
		return ret;
	}

	public static float[] trimFloatArray(float[] src, int len)
	{
		if (src != null)
		{
			if (src.length > len)
			{
				float[] ret = new float[len];
				System.arraycopy(src, 0, ret, 0, len);
				return ret;
			}
			else
			{
				return src;
			}

		}
		else
		{
			return null;
		}
	}

	public static int[] trimIntArray(int[] src, int len)
	{
		if (src != null)
		{
			if (src.length > len)
			{
				int[] ret = new int[len];
				System.arraycopy(src, 0, ret, 0, len);
				return ret;
			}
			else
			{
				return src;
			}

		}
		else
		{
			return null;
		}
	}

	public static int intMin(int a, int b)
	{
		return a > b ? b : a;
	}

	public static int intMax(int a, int b)
	{
		return a > b ? a : b;
	}

	public static void multiply(float[] array, float scalar)
	{
		for (int i = 0; i != array.length; i++)
		{
			array[i] *= scalar;
		}
	}
}
