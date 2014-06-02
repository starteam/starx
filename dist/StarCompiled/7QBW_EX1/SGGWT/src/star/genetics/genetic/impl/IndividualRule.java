package star.genetics.genetic.impl;

import java.io.Serializable;

import star.genetics.client.JSONable;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.GeneticMakeup;

public interface IndividualRule extends Serializable, JSONable
{
	boolean test(GeneticMakeup makeup, Creature.Sex sex);
}
