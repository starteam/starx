package star.genetics.genetic.impl;

import java.io.Serializable;

import star.genetics.visualizers.Visualizer;
import star.genetics.visualizers.VisualizerFactory;

public class VisualizerFactoryImpl implements VisualizerFactory, Serializable
{
	private static final long serialVersionUID = 1L;
	private String visualizerClassName = null;
	private transient Class<Visualizer> visualizerClass = null;

	public VisualizerFactoryImpl(String name)
	{
		visualizerClassName = name;
		newVisualizerInstance();
	}

	public Visualizer newVisualizerInstance()
	{
		return null;
		// TODO: switch statement

		// if (visualizerClass == null)
		// {
		// initializeClass();
		// }
		// try
		// {
		// return visualizerClass.newInstance();
		// }
		// catch (Exception ex)
		// {
		// ex.printStackTrace();
		// throw new RuntimeException(ex);
		// }
	}

}
