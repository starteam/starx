package star.genetics.genetic.model;

import star.genetics.client.JSONable;

public interface GelPosition extends JSONable
{
	Gel getGel();

	Float[] getPosition();

	Allele getAllele();
}
