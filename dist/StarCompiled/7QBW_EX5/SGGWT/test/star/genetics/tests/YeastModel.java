package star.genetics.tests;

import star.genetics.genetic.impl.CreatureSetImpl;
import star.genetics.genetic.impl.MatingException;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.CreatureSet;
import star.genetics.genetic.model.Model;
import star.genetics.parser.ModelParser;

import com.google.gwt.json.client.JSONObject;
import com.google.gwt.junit.client.GWTTestCase;

public class YeastModel extends GWTTestCase
{
	String getJson() {
		return "{\"genetics\":{\"visualizer\":{\"name\":\"yeast\"},\"engine\":{\"sex_type\":\"Aa\",\"avg_offspring_count\":10},\"genome\":{\"chromosomes\":{\"C1\":{\"name\":\"Chromosome 1\",\"genes\":[{\"name\":\"LEU2\",\"position\":0,\"alleles\":[{\"name\":\"LEU2-3\"},{\"name\":\"leu2-3\"}]},{\"name\":\"LEU2.1\",\"position\":5,\"alleles\":[{\"name\":\"LEU2-112\"},{\"name\":\"leu2-112\"}]}]},\"C2\":{\"name\":\"Chromosome 2\",\"genes\":[{\"name\":\"LEUX\",\"position\":0,\"alleles\":[{\"name\":\"LEUX\"},{\"name\":\"leux\"}]}]},\"C4\":{\"name\":\"Chromosome 4\",\"genes\":[{\"name\":\"TRP1\",\"position\":0,\"alleles\":[{\"name\":\"TRP1\"},{\"name\":\"trp1\"}]}]},\"C3\":{\"name\":\"Chromosome 3\",\"genes\":[{\"name\":\"ADE1\",\"position\":0,\"alleles\":[{\"name\":\"ADE1\"},{\"name\":\"ade1\"}]}]},\"C7\":{\"name\":\"Chromosome 7\",\"genes\":[{\"name\":\"COX4\",\"position\":0,\"alleles\":[{\"name\":\"COX4\"},{\"name\":\"cox4\"}]}]},\"C5\":{\"name\":\"Chromosome 5\",\"genes\":[{\"name\":\"PET1\",\"position\":0,\"alleles\":[{\"name\":\"PET1\"},{\"name\":\"pet1\"}]}]},\"C10\":{\"name\":\"Chromosome 10\",\"genes\":[{\"name\":\"LYS9\",\"position\":0,\"alleles\":[{\"name\":\"LYS9\"},{\"name\":\"lys9\"}]}]}}},\"experiments\":{},\"phenotype_rules\":[{\"name\":\"leu2-3\",\"matches\":\"leu2-3;haploid\",\"phenotype\":{\"-Leu\":{\"growth\":0.1}}},{\"name\":\"leu2-112\",\"matches\":\"leu2-112;haploid\",\"phenotype\":{\"-Leu\":{\"growth\":0.1}}},{\"name\":\"leux\",\"matches\":\"leux;haploid\",\"phenotype\":{\"-Leu\":{\"growth\":0.1}}},{\"name\":\"leu2-3 diploid\",\"matches\":\"leu2-3,leu2-3\",\"phenotype\":{\"-Leu\":{\"growth\":0.1}}},{\"name\":\"leu2-112 diploid\",\"matches\":\"leu2-112,leu2-112\",\"phenotype\":{\"-Leu\":{\"growth\":0.1}}},{\"name\":\"leux diploid\",\"matches\":\"leux,leux\",\"phenotype\":{\"-Leu\":{\"growth\":0.1}}},{\"name\":\"leu2 broken\",\"matches\":\"leu2-3 LEU2-112,LEU2-3 leu2-112\",\"phenotype\":{\"-Leu\":{\"growth\":0.1}}},{\"name\":\"trp1\",\"matches\":\"trp1;haploid\",\"phenotype\":{\"-Trp\":{\"growth\":0.1},\"-Trp -Lys\":{\"growth\":0.1}}},{\"name\":\"trp1 diploid\",\"matches\":\"trp1,trp1\",\"phenotype\":{\"-Trp\":{\"growth\":0.1},\"-Trp -Lys\":{\"growth\":0.1}}},{\"name\":\"ade1\",\"matches\":\"ade1;haploid\",\"phenotype\":{\"Complete\":{\"color\":\"red\"},\"YPG\":{\"color\":\"red\"},\"-Leu\":{\"color\":\"red\"},\"-Ade\":{\"color\":\"red\",\"growth\":0.1},\"-Lys\":{\"color\":\"red\"},\"-Trp\":{\"color\":\"red\"},\"-Trp -Lys\":{\"color\":\"red\"}}},{\"name\":\"ade1 diploid\",\"matches\":\"ade1,ade1\",\"phenotype\":{\"Complete\":{\"color\":\"red\"},\"YPG\":{\"color\":\"red\"},\"-Leu\":{\"color\":\"red\"},\"-Ade\":{\"color\":\"red\",\"growth\":0.1},\"-Lys\":{\"color\":\"red\"},\"-Trp\":{\"color\":\"red\"},\"-Trp -Lys\":{\"color\":\"red\"}}},{\"name\":\"cox4\",\"matches\":\"cox4;haploid\",\"phenotype\":{\"Complete\":{\"size\":0.25},\"YPG\":{\"size\":0.25,\"growth\":0.1},\"-Leu\":{\"size\":0.25},\"-Ade\":{\"size\":0.25},\"-Lys\":{\"size\":0.25},\"-Trp\":{\"size\":0.25},\"-Lys -Trp\":{\"size\":0.25}}},{\"name\":\"cox4 diploid\",\"matches\":\"cox4;cox4\",\"phenotype\":{\"Complete\":{\"size\":0.25},\"YPG\":{\"size\":0.25,\"growth\":0.1},\"-Leu\":{\"size\":0.25},\"-Ade\":{\"size\":0.25},\"-Lys\":{\"size\":0.25},\"-Trp\":{\"size\":0.25},\"-Lys -Trp\":{\"size\":0.25}}},{\"name\":\"pet1\",\"matches\":\"pet1;haploid\",\"phenotype\":{\"Complete\":{\"size\":0.25},\"YPG\":{\"size\":0.25,\"growth\":0.1},\"-Leu\":{\"size\":0.25},\"-Ade\":{\"size\":0.25},\"-Lys\":{\"size\":0.25},\"-Trp\":{\"size\":0.25},\"-Lys -Trp\":{\"size\":0.25}}},{\"name\":\"pet1 diploid\",\"matches\":\"pet1,pet1\",\"phenotype\":{\"Complete\":{\"size\":0.25},\"YPG\":{\"size\":0.25,\"growth\":0.1},\"-Leu\":{\"size\":0.25},\"-Ade\":{\"size\":0.25},\"-Lys\":{\"size\":0.25},\"-Trp\":{\"size\":0.25},\"-Lys -Trp\":{\"size\":0.25}}},{\"name\":\"lys9\",\"matches\":\"lys9;haploid\",\"phenotype\":{\"-Lys\":{\"growth\":0.1},\"-Trp -Lys\":{\"growth\":0.1}}},{\"name\":\"lys9 diploid\",\"matches\":\"lys9\",\"phenotype\":{\"-Lys\":{\"growth\":0.1},\"-Trp -Lys\":{\"growth\":0.1}}}],\"gel_rules\":{},\"model_metadata\":{},\"strains\":{\"initial\":{\"name\":\"Initial Strains\",\"list\":[{\"name\":\"Strain 1\",\"sex\":\"a\",\"alleles\":[\"leu2-3\",\"LEU2-112\",\"LEUX\",\"ADE1\",\"COX4\",\"PET1\",\"LYS9\",\"trp1\"]},{\"name\":\"Strain 2\",\"sex\":\"alpha\",\"alleles\":[\"LEU2-3\",\"leu2-112\",\"LEUX\",\"ADE1\",\"COX4\",\"PET1\",\"LYS9\",\"trp1\"]},{\"name\":\"Strain 3\",\"sex\":\"alpha\",\"alleles\":[\"LEU2-3\",\"LEU2-112\",\"leux\",\"ADE1\",\"COX4\",\"PET1\",\"LYS9\",\"trp1\"]},{\"name\":\"Strain 4\",\"sex\":\"a\",\"alleles\":[\"LEU2-3\",\"LEU2-112\",\"LEUX\",\"ade1\",\"COX4\",\"PET1\",\"LYS9\",\"TRP1\"]},{\"name\":\"Strain 5\",\"sex\":\"a\",\"alleles\":[\"LEU2-3\",\"LEU2-112\",\"LEUX\",\"ADE1\",\"cox4\",\"PET1\",\"LYS9\",\"TRP1\"]},{\"name\":\"Strain 6\",\"sex\":\"alpha\",\"alleles\":[\"LEU2-3\",\"LEU2-112\",\"LEUX\",\"ADE1\",\"COX4\",\"pet1\",\"LYS9\",\"TRP1\"]},{\"name\":\"MATa tester\",\"sex\":\"a\",\"alleles\":[\"LEU2-3\",\"LEU2-112\",\"LEUX\",\"ADE1\",\"COX4\",\"PET1\",\"lys9\",\"TRP1\"]},{\"name\":\"MATalpha tester\",\"sex\":\"alpha\",\"alleles\":[\"LEU2-3\",\"LEU2-112\",\"LEUX\",\"ADE1\",\"COX4\",\"PET1\",\"lys9\",\"TRP1\"]}]}}}}";
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
		CreatureSetImpl parents = new CreatureSetImpl(m);
		parents.add(c0);
		parents.add(c1);		
		try
        {
			int progenies = 40;
			String prefix = "Experiment 1";
	       CreatureSet progeny = m.getMatingEngine().getProgenies(prefix, parents, 1, progenies, m.getRules());
	       assertEquals(progenies, progeny.size());
	       assertEquals(prefix+"-1A", progeny.get(0).getName());
	       assertEquals(prefix+"-1B", progeny.get(1).getName());
	       assertEquals(prefix+"-1C", progeny.get(2).getName());
	       assertEquals(prefix+"-1D", progeny.get(3).getName());
	       for( Creature c : progeny)
	       {
	    	   System.out.println( c.getName() );
	    	   System.out.println( c.getJSON() );
	       }
	       System.out.println( m.getJSON());
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
