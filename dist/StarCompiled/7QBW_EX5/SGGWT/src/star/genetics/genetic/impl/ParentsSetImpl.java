package star.genetics.genetic.impl;

import star.genetics.genetic.model.Model;
import star.genetics.genetic.model.ParentsSet;

public class ParentsSetImpl extends CreatureSetImpl implements ParentsSet
{
	private static final long serialVersionUID = 1L;

	public ParentsSetImpl(Model model)
	{
		super(model);
	}

	public boolean canMate()
	{
		if (size() == 2)
		{
			return true;
		}
		if (size() == 1)
		{

		}
		return false;
	}
}
