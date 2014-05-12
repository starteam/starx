package star.genetics.genetic.impl;

import java.io.Serializable;

import star.genetics.xls.Properties;

public class MatingEngineMetadata implements Serializable
{
	private static final long serialVersionUID = 1L;

	private float twinningFrequency;

	private float identicalTwinsFrequency;

	public void set(Properties property, String value)
	{
		if (Properties.TWINNINGFREQUENCY.equals(property))
		{
			twinningFrequency = Float.parseFloat(value);
		}
		if (Properties.IDENTICALTWINSFREQUENCY.equals(property))
		{
			identicalTwinsFrequency = Float.parseFloat(value);
		}
	}

	public float getIdenticalTwinsFrequency()
	{
		return identicalTwinsFrequency;
	}

	public float getTwinningFrequency()
	{
		return twinningFrequency;
	}
}
