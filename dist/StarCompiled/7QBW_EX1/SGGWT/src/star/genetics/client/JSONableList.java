package star.genetics.client;

import java.util.Iterator;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONValue;

public abstract class JSONableList<T> implements Iterable<T>
{
	JSONArray data;

	public JSONableList(JSONArray array)
	{
		this.data = array;
	}

	public abstract T create(JSONObject data);

	public void add(T element)
	{
		if( element instanceof String)
		{
			data.set(data.size(), Helper.wrapString((String)element));
		}
		else
		{
		JSONable e = (JSONable) element;
		data.set(data.size(), e.getJSON());
		}
	}

	public int size()
	{
		return data.size();
	}

	public T get(int i)
	{
		return create(data.get(i).isObject());
	}

	@Override
	public Iterator<T> iterator()
	{
		return new Iterator<T>()
		{
			int index = 0;

			@Override
			public boolean hasNext()
			{
				return index < data.size();
			}

			@Override
			public T next()
			{
				JSONValue element = data.get(index);
				index++;
				if( element.isString() != null)
				{
					return (T)Helper.unwrapString(element);
				}
				return create(element.isObject());
			}

			@Override
			public void remove()
			{
				throw new UnsupportedOperationException();
			}

		};
	}

	public boolean contains(T q)
	{
		if (q == null)
		{
			return false;
		}
		for (T a : this)
		{
			if (q.equals(a))
			{
				return true;
			}
		}
		return false;
	}
}
