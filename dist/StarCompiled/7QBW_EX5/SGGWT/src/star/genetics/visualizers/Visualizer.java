package star.genetics.visualizers;

import java.util.Map;

import star.genetics.genetic.model.Creature;

public interface Visualizer
{

	public enum UIClass
	{
		Fly, Worm, Yeast;
	}

	public void setSex(Creature.Sex sex);

	public void setName(String name);

	public void setNote(String note);

	// NOTE: For 'Show info' to work in summary tab, visualizer needs be subclass of JComponent
	// and JComponent shoul return this
	public Object getJComponent();

	public void setProperties(Map<String, String> properties, Creature.Sex sex);

	public Map<String, String> getTooltipProperties();

	public UIClass getUIClass();
}
