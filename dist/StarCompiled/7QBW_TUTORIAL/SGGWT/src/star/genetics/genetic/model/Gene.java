package star.genetics.genetic.model;

import java.io.Serializable;

import com.google.gwt.json.client.JSONObject;

import star.genetics.client.JSONable;
import star.genetics.client.JSONableList;

public interface Gene extends Serializable, Comparable<Gene>, JSONable
{
	Chromosome getChromosome();

	Allele getAlleleByName(String name);

	JSONableList<Allele> getGeneTypes();

	String getId();

	String getName();

	float getPosition();
	
}
