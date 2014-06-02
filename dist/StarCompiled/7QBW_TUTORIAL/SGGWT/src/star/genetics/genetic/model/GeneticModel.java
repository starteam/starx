package star.genetics.genetic.model;

import star.genetics.client.JSONable;
import star.genetics.visualizers.VisualizerFactory;

public interface GeneticModel extends JSONable
{
	final static String sterile = "Sterile";
	final static String lethal = "Lethal";
	final static String matings = "Matings";

	VisualizerFactory getVisualizerFactory();

}
