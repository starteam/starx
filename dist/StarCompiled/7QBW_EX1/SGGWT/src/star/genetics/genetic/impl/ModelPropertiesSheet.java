package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.HashMap;

public class ModelPropertiesSheet implements Serializable
{

	private static final long serialVersionUID = 1L;

	private HashMap<String, String> map = new HashMap<String, String>();

	public void put(String key, String value)
	{
		map.put(key, value);
	}

	public String get(String key)
	{
		return map.get(key);
	}
}
