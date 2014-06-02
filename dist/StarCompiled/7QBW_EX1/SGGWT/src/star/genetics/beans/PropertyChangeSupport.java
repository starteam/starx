package star.genetics.beans;

import java.util.ArrayList;

public class PropertyChangeSupport
{

	private Object source;
	private ArrayList<PropertyChangeListener> listeners = new ArrayList<PropertyChangeListener>();

	public PropertyChangeSupport(Object source)
	{
		this.source = source;
	}

	public void firePropertyChange(PropertyChangeEvent propertyChangeEvent)
	{
		for (PropertyChangeListener l : listeners)
		{
			l.propertyChange(propertyChangeEvent);
		}

	}

	public void addPropertyChangeListener(star.genetics.beans.PropertyChangeListener listener)
	{
		listeners.add(listener);
	}

	public void removePropertyChangeListener(PropertyChangeListener listener)
	{
		listeners.remove(listener);
	}

}
