package star.genetics.parser;

import java.util.logging.Level;
import java.util.logging.Logger;

import star.genetics.genetic.impl.ModelImpl;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONParser;
import com.google.gwt.json.client.JSONValue;

public class ModelParser
{
	static JSONObject getTop(String json)
	{
		JSONValue top = JSONParser.parseStrict(json);
		return top.isObject();
	}

	private static void parse(ModelImpl model, JSONObject top)
	{
		parseGenetics(model, top.get("genetics").isObject());
	}

	private static void parseGenetics(ModelImpl model, JSONObject genetics)
	{
		VisualizerParser.parse(model, genetics.get("visualizer").isObject());
		GenomeParser.parse(model, genetics.get("genome").isObject());
		EngineParser.parse(model, genetics.get("engine").isObject());
		PhenotypeRulesParser.parse(model, genetics.get("phenotype_rules").isArray());
		StrainsParser.parse(model, genetics.get("strains").isObject());
	}

	public static Model parse(String json)
	{
		ModelImpl model = new ModelImpl();
		JSONObject top = getTop(json);
		parse(model, top);
		return model;
	}

}
