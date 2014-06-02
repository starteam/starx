package star.genetics.parser;

import java.util.logging.Level;
import java.util.logging.Logger;

import star.genetics.genetic.impl.AlleleImpl;
import star.genetics.genetic.impl.ChromosomeImpl;
import star.genetics.genetic.impl.GeneImpl;
import star.genetics.genetic.impl.GenomeImpl;
import star.genetics.genetic.impl.ModelImpl;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;

public class GenomeParser
{
	static Logger logger = Logger.getLogger("GenomeParser");

	public static void parse(ModelImpl model, JSONObject genome)
	{
		GenomeImpl ret = new GenomeImpl(model);
		model.setGenome(ret);
		parseChromosomes(ret, genome.get("chromosomes").isObject(), model);

	}

	private static void parseChromosomes(GenomeImpl genome, JSONObject chromosomes, ModelImpl model)
	{
		for (String chromosome_id : chromosomes.keySet())
		{
			ChromosomeImpl c = new ChromosomeImpl(chromosome_id, genome, model);
			parseChromosome(c, chromosomes.get(chromosome_id).isObject(), model);
		}
	}

	private static void parseChromosome(ChromosomeImpl c, JSONObject chromosome, ModelImpl model)
	{
		String name = chromosome.get("name").isString().stringValue();
		parseGenes(c, chromosome.get("genes").isArray(), model);
	}

	private static void parseGenes(ChromosomeImpl c, JSONArray genes, ModelImpl model)
	{
		for (int i = 0; i < genes.size(); i++)
		{
			JSONObject gene = genes.get(i).isObject();
			parseGene(c, gene, model);
		}
	}

	private static void parseGene(ChromosomeImpl c, JSONObject gene, ModelImpl model)
	{
		String name = gene.get("name").isString().stringValue();
		float position = (float) gene.get("position").isNumber().doubleValue();
		GeneImpl g = new GeneImpl(name, position, c, model);
		parseAlleles(g, gene.get("alleles").isArray(), model);
	}

	private static void parseAlleles(GeneImpl gene, JSONArray alleles, ModelImpl model)
	{
		for (int i = 0; i < alleles.size(); i++)
		{
			parseAllele(gene, alleles.get(i).isObject(), model);
		}
	}

	private static void parseAllele(GeneImpl gene, JSONObject allele, ModelImpl model)
	{
		String name = allele.get("name").isString().stringValue();
		AlleleImpl a = new AlleleImpl(name, gene, model);
	}

}
