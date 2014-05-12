/**
 * 
 */
package star.genetics.xls;

public enum Properties
{
	NAME("Name") // //$NON-NLS-1$
	, VISUALIZER("Visualizer") // //$NON-NLS-1$
	, MATING_TYPE("Mating type") // //$NON-NLS-1$
	, PROGENIESCOUNT("Total progeny per cross") // //$NON-NLS-1$
	, MALERECOMBINATIONRATE("Male recombination rate") // //$NON-NLS-1$
	, FEMALERECOMBINATIONRATE("Female recombination rate") // //$NON-NLS-1$
	, MATINGSCOUNT("Matings") // //$NON-NLS-1$
	, SPONTANIOUSMALES("Spontanious males") // //$NON-NLS-1$
	, AVAILABLEEXPERIMENTS("Available experiments") // //$NON-NLS-1$
	, TWINNINGFREQUENCY("Twinning frequency") // //$NON-NLS-1$
	, IDENTICALTWINSFREQUENCY("Identical twins frequency"); //$NON-NLS-1$

	String name;

	private Properties(String name)
	{
		this.name = name;
	}

	@Override
	public String toString()
	{
		return name;
	}
}