package star.genetics.utils;

import star.genetics.beans.PropertyChangeListener;

/**
 * Adds support for addPropertyChangeListener and removePropertyChangeListener
 * 
 * @author ceraj
 */
public interface PropertyChangeRaiser
{

	/**
	 * Register a listener for the PropertyChange event. The customizer should fire a PropertyChange event whenever it changes the target bean in a way that
	 * might require the displayed properties to be refreshed.
	 * 
	 * @param listener
	 *            An object to be invoked when a PropertyChange event is fired.
	 */
	void addPropertyChangeListener(PropertyChangeListener listener);

	/**
	 * Remove a listener for the PropertyChange event.
	 * 
	 * @param listener
	 *            The PropertyChange listener to be removed.
	 */
	void removePropertyChangeListener(PropertyChangeListener listener);

}
