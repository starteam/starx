package star.genetics.genetic.model;

import java.util.Iterator;

import star.genetics.client.JSONable;

public interface CrateSet extends Iterable<CrateModel>, JSONable
{
	CrateModel current();

	Iterator<CrateModel> iterator();

	CrateModel newCrateModel();

	int size();
}
