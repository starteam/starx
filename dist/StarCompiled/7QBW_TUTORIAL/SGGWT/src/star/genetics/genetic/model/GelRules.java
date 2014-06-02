package star.genetics.genetic.model;

import star.genetics.client.JSONable;

public interface GelRules extends JSONable
{
	Iterable<Gel> getAllGelNames();

	Iterable<GelPosition> getGel(Iterable<Allele> alleles);

	Iterable<GelPosition> getAllGelPositions();

	int sizeGels();
}
