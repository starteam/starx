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

}