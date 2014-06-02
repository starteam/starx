package star.genetics.utils;

import java.util.HashMap;

public class Colors
{
	private static HashMap<String, String> colors;
	private static HashMap<String, String> colorNames;

	private static String Color(int red, int green, int blue)
	{
		return "rgb(" + red + ", " + green + ", " + blue + ")";
	}

	private static String Color(float red, float green, float blue)
	{
		return "rgb(" + red + ", " + green + ", " + blue + ")";
	}

	public static String parseName(String name, String defaultColor)
	{
		String c = null;

		if (name != null)
		{
			if (name.startsWith("#") && name.length() == 7)
			{
				int red = Integer.parseInt(name.substring(1, 3), 16);
				int green = Integer.parseInt(name.substring(3, 5), 16);
				int blue = Integer.parseInt(name.substring(5, 7), 16);
				return Color(red, green, blue);
			}
			if (colors == null)
			{
				initColors();
			}
			c = colors.get(String.valueOf(name).toLowerCase());
		}
		if (c == null)
		{
			c = defaultColor;
		}
		return c;
	}

	private static String parseName(String name)
	{
		name = name.trim();
		if (name.startsWith("#") && name.length() == 7)
		{
			int red = Integer.parseInt(name.substring(1, 3), 16);
			int green = Integer.parseInt(name.substring(3, 5), 16);
			int blue = Integer.parseInt(name.substring(5, 7), 16);
			return Color(red, green, blue);
		}

		if (colors == null)
		{
			initColors();
		}

		return colors.get(String.valueOf(name).toLowerCase());
	}

	public static String parseColor(String color)
	{
		if (colorNames == null)
		{
			initColors();
		}
		String colorName = colorNames.get(color);
		return colorName != null ? colorName : String.valueOf(color);

	}

	private static synchronized void initColors()
	{
		try
		{
			if (colors != null && colorNames != null)
			{
				return;
			}
			// InputStream is = Colors.class.getClassLoader().getResourceAsStream("utils/rgb.txt");
			// if (is != null)
			// {
			// BufferedReader r = new BufferedReader(new InputStreamReader(is));
			// colors = new HashMap<String, String>();
			// colorNames = new HashMap<String, String>();
			// String line;
			// while ((line = r.readLine()) != null)
			// {
			// if (line.startsWith("!"))
			// {
			// continue;
			// }
			// StringTokenizer st = new StringTokenizer(line);
			// try
			// {
			// int red = Integer.parseInt(st.nextToken());
			// int green = Integer.parseInt(st.nextToken());
			// int blue = Integer.parseInt(st.nextToken());
			// String name = st.nextToken("\n");
			// if (name != null)
			// {
			// name = name.trim();
			// name = name.toLowerCase();
			// colors.put(name, Color(red, green, blue));
			// colorNames.put(Color(red, green, blue), name);
			// }
			// }
			// catch (Exception ex)
			// {
			// ex.printStackTrace();
			// }
			// }
			// addSpecialColors();
			// }
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
	}

	private static void addSpecialColors()
	{
		colors.put("wildtype", colors.get("burlywood4"));
		colorNames.put(colors.get("wildtype"), "wildtype");

	}

	public static String CMYKtoRGBColor(int[] p_colorvalue)
	{
		float[] ret = CMYKtoRGB(p_colorvalue);
		return Color(ret[0], ret[1], ret[2]);
	}

	public static float[] CMYKtoRGB(int[] p_colorvalue)
	{
		float[] l_res = { 0, 0, 0 };
		if (p_colorvalue.length >= 4)
		{
			float l_black = (float) 1.0 - 1.0f / 256 * p_colorvalue[3];
			l_res[0] = l_black * ((float) 1.0 - 1.0f / 256 * p_colorvalue[0]);
			l_res[1] = l_black * ((float) 1.0 - 1.0f / 256 * p_colorvalue[1]);
			l_res[2] = l_black * ((float) 1.0 - 1.0f / 256 * p_colorvalue[2]);
		}
		return normalizeColors(l_res);
	}

	public static float[] CMYKtoRGB(float[] p_colorvalue)
	{
		float[] l_res = { 0, 0, 0 };
		if (p_colorvalue.length >= 4)
		{
			float l_black = (float) 1.0 - p_colorvalue[3];
			l_res[0] = l_black * ((float) 1.0 - p_colorvalue[0]);
			l_res[1] = l_black * ((float) 1.0 - p_colorvalue[1]);
			l_res[2] = l_black * ((float) 1.0 - p_colorvalue[2]);
		}
		return normalizeColors(l_res);
	}

	private static float[] normalizeColors(float[] p_colors)
	{
		for (int l_i = 0; l_i < p_colors.length; l_i++)
		{
			if (p_colors[l_i] > (float) 1.0)
				p_colors[l_i] = (float) 1.0;
			else if (p_colors[l_i] < (float) 0.0)
				p_colors[l_i] = (float) 0.0;
		}
		return p_colors;
	}

	public static void main(String[] args)
	{
		System.out.println(parseName("red"));
		System.out.println(parseName("violet"));
		System.out.println(parseName("brown"));
		System.out.println(parseName("#000000"));
		System.out.println(parseName("#ffffff"));
		System.out.println(parseName("lavender blush"));
		System.out.println(parseName("lavenderblush"));
	}
}
