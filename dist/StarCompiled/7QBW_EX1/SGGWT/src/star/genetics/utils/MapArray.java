package star.genetics.utils;

import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class MapArray<K, V>
{
	private Map<K, Set<V>> map = new LinkedHashMap<K, Set<V>>();

	private Set<V> getSet(K key)
	{
		if (!map.containsKey(key))
		{
			map.put(key, new LinkedHashSet<V>());
		}
		return map.get(key);
	}

	public void add(K key, V value)
	{
		if (key != null)
		{
			getSet(key).add(value);
		}
	}

	public int size()
	{
		return map.size();
	}

	public int size(K key)
	{
		return map.get(key).size();
	}

	public Set<Entry<K, Set<V>>> entrySet()
	{
		return map.entrySet();
	}

	public Set<K> keySet()
	{
		return map.keySet();
	}

	public Set<V> get(K key)
	{
		return map.get(key);
	}
}
