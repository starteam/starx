package star.genetics.genetic.model;

import star.genetics.client.JSONable;
import star.genetics.genetic.impl.RuleMakeup;

public interface GeneticMakeup extends JSONable
{

	DiploidAlleles get(Gene g);

	void put(Gene g, DiploidAlleles d);

	boolean test(Chromosome c, RuleMakeup map);

}
