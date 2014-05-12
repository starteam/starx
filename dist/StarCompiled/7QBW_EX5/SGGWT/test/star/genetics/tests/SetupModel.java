package star.genetics.tests;

import static org.junit.Assert.*;


import star.genetics.genetic.impl.CreatureSetImpl;
import star.genetics.genetic.impl.MatingException;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.CreatureSet;
import star.genetics.genetic.model.Model;
import star.genetics.parser.ModelParser;

import com.google.gwt.junit.client.GWTTestCase;

public class SetupModel extends GWTTestCase
{
	String getJson()
	{
		// getJSON("setupmodel.json");
		return "{\"genetics\":{\"visualizer\":{\"name\":\"fly\"},\"model_metadata\":{},\"experiments\":{},\"engine\":{\"sex_type\":\"XY\",\"male_recombination_rate\":1,\"female_sex_ratio\":0.51,\"avg_offspring_count\":50,\"female_recombination_rate\":1,\"twinning\":0,\"identical_twins_frequency\":0},\"strains\":{\"initial\":{\"name\":\"Initial Strains\",\"list\":[{\"sex\":\"M\",\"alleles\":[\"A,A\",\"B,B\"],\"name\":\"Wildtype M\"},{\"sex\":\"F\",\"alleles\":[\"A,A\",\"B,B\"],\"name\":\"Wildtype F\"},{\"sex\":\"M\",\"alleles\":[\"a,a\",\"b,b\"],\"name\":\"Double Mutant M\"},{\"sex\":\"F\",\"alleles\":[\"a,a\",\"b,b\"],\"name\":\"Double Mutant F\"}]}},\"gel_rules\":{},\"phenotype_rules\":[{\"matches\":\"*\",\"name\":\"default\",\"phenotype\":{\"wings\":1,\"eyes\":\"red\"}},{\"matches\":\"aa\",\"name\":\"white eyes\",\"phenotype\":{\"eyes\":\"white\"}},{\"matches\":\"bb\",\"name\":\"wingless\",\"phenotype\":{\"wings\":0}}],\"genome\":{\"chromosomes\":{\"C_1\":{\"genes\":[{\"position\":25,\"alleles\":[{\"name\":\"A\"},{\"name\":\"a\"}],\"name\":\"red_eyes\"},{\"position\":40,\"alleles\":[{\"name\":\"B\"},{\"name\":\"b\"}],\"name\":\"wingless\"}],\"name\":\"Chromosome 1\"}}}}}\n";
	}

	public void test()
	{
		Model m = ModelParser.parse(getJson());
		assertNotNull(m.getGenome());
		assertNotNull(m.getMatingEngine());
		assertNotNull(m.getRules());
		assertNotNull(m.getCreatures());
	}

	public void test2()
	{
		Model m = ModelParser.parse(getJson());
		Creature c0 = m.getCreatures().get(0);
		Creature c1 = m.getCreatures().get(1);
		assertTrue(c0.getSex() != c1.getSex() );
		CreatureSetImpl parents = new CreatureSetImpl(null);
		parents.add(c0);
		parents.add(c1);		
		try
        {
			int progenies = 50;
			String prefix = "Experiment 1";
	       CreatureSet progeny = m.getMatingEngine().getProgenies(prefix, parents, 1, progenies, m.getRules());
	       assertEquals(progenies, progeny.size());
	       assertEquals(prefix+"-1", progeny.get(0));
        }
        catch (MatingException e)
        {
	        e.printStackTrace();
	        fail(e.getMessage());
        }
		
	}
	
	@Override
	public String getModuleName()
	{
		return "star.genetics.StarGenetics_gwt_java";
	}

}
