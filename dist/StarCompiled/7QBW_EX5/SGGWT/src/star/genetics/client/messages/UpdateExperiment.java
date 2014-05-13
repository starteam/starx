package star.genetics.client.messages;

public class UpdateExperiment extends Exec
{

	protected UpdateExperiment()
	{
	}

	public final native Experiment getExperiment() /*-{
	                                               return this.data.experiment;
	                                               }-*/;

	public final native String getExperimentCommand() /*-{
	                                                  return this.data.command;
	                                                  }-*/;

	public final native String getAvgOffspringCount() /*-{
    return this.data.avg_offspring_count;
    }-*/;

}