package star.genetics.beans;

public class PropertyChangeEvent
{

	private Object source;
	private String name;
	private Object oldValue;
	private Object newValue;

	public PropertyChangeEvent(Object source, String name, Object oldValue, Object newValue)
	{
		this.source = source;
		this.name = name;
		this.oldValue = oldValue;
		this.newValue = newValue;
	}

	public String getPropertyName()
	{
		return name;
	}

	public Object getOldValue()
	{
		return oldValue;
	}

	public Object getNewValue()
	{
		return newValue;
	}
}
