package star.genetics.beans;

public class StringTokenizer
{
	// TODO: make better or correct
	private String str;
	private String split;
	private int index;
	private boolean hasMoreTokens = true;

	public StringTokenizer(String str, String split)
	{
		this.str = str;
		this.split = split;
		this.index = 0;

	}

	public boolean hasMoreTokens()
	{
		return hasMoreTokens;
	}

	public String nextToken()
	{
		int next_index = str.indexOf(split, index);
		String ret;
		if (next_index == -1)
		{
			hasMoreTokens = false;
			ret = str.substring(index);
		}
		else
		{
			ret = str.substring(index, next_index);
			index = next_index + split.length();
		}
		return ret;
	}

}
