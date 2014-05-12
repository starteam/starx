package star.genetics.genetic.impl;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.Level;
import java.util.logging.Logger;

import star.genetics.beans.StringTokenizer;
import star.genetics.client.Helper;
import star.genetics.client.JSONableList;
import star.genetics.client.JSONableMap;
import star.genetics.client.MessageFormat;
import star.genetics.client.Messages;
import star.genetics.genetic.model.Allele;
import star.genetics.genetic.model.Chromosome;
import star.genetics.genetic.model.Creature;
import star.genetics.genetic.model.Gene;
import star.genetics.genetic.model.GeneticMakeup;
import star.genetics.genetic.model.Genome;
import star.genetics.genetic.model.Genome.SexType;
import star.genetics.genetic.model.Model;

import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;

public class RuleImpl implements star.genetics.genetic.model.Rule, Serializable
{
	private static final long serialVersionUID = 1L;

	private JSONableList<IndividualRule> compiledRules()
	{
		return new JSONableList<IndividualRule>(data.get(COMPILEDRULES).isArray())
		{

			@Override
			public IndividualRule create(JSONObject data)
			{
				String kind = Helper.unwrapString(data.get(KIND));
				if ("ChromosomeRuleImpl".equals(kind))
				{
					return new ChromosomeRuleImpl(data, getModel());
				}
				else if ("HaploidRuleImpl".equals(kind))
				{
					return new HaploidRuleImpl(data);
				}
				else if ("SexRuleImpl".equals(kind))
				{
					return new SexRuleImpl(data, getModel());
				}
				else
				{
					throw new RuntimeException("Missing rule kind");
				}
			}

			@Override
			public void add(IndividualRule element)
			{
				JSONObject data = element.getJSON();
				if (element instanceof ChromosomeRuleImpl)
				{
					data.put(KIND, Helper.wrapString("ChromosomeRuleImpl"));
				}
				else if (element instanceof HaploidRuleImpl)
				{
					data.put(KIND, Helper.wrapString("HaploidRuleImpl"));

				}
				else if (element instanceof SexRuleImpl)
				{
					data.put(KIND, Helper.wrapString("SexRuleImpl"));
				}
				else
				{
					throw new RuntimeException("Unknown rule type");
				}
				super.add(element);
			}
		};
	}

	private final JSONObject data;
	private final Model model;

	public Model getModel()
	{
		return model;
	}

	public RuleImpl(JSONObject data, Model model)
	{
		this.data = data;
		this.model = model;
	}


	public RuleImpl(String rule, HashMap<String, String> properties, Genome g, Model model)
	{
		this.model = model;
		data = new JSONObject();
		data.put(NAME, Helper.wrapString(rule));
		data.put(COMPILEDRULES, new JSONArray());
		data.put(PROPERTIES, new JSONObject());
		addProperties(properties);
		if (!isDefault())
		{
			parseRules(rule, g);
		}
	}

	@Override
	public JSONObject getJSON()
	{
		return data;
	}

	public void addProperties(Map<String, String> properties)
	{
		for (Entry<String, String> entry : properties.entrySet())
		{
			getProperties().put(entry.getKey(), entry.getValue());
		}
	}

	public JSONableMap getProperties()
	{
		return new JSONableMap(data.get(PROPERTIES).isObject());
	}

	String getName()
	{
		return Helper.unwrapString(data.get(NAME));
	}

	private void parseRules(String rule, Genome g)
	{
		data.put(COMPILEDRULES, new JSONArray());
		StringTokenizer ruleSplit = new StringTokenizer(rule, ";"); //$NON-NLS-1$
		while (ruleSplit.hasMoreTokens())
		{
			String oneRule = ruleSplit.nextToken().trim();
			boolean isRuleParsed = false;

			if (!isRuleParsed)
			{
				isRuleParsed = parseSexRule(oneRule, g);
			}
			if (!isRuleParsed)
			{
				isRuleParsed = parseHaploidRule(oneRule, g);
			}
			if (!isRuleParsed)
			{
				parseOneRule(oneRule, g);

			}
		}
	}

	private boolean parseHaploidRule(String oneRule, Genome g)
	{
		boolean ret = false;
		String s = oneRule.trim().toLowerCase();
		if (SexType.Aa.equals(g.getSexType()))
		{
			if (s.startsWith("haploid")) //$NON-NLS-1$
			{
				ret = true;
				compiledRules().add(new HaploidRuleImpl());
			}
		}
		return ret;

	}

	private boolean parseSexRule(String oneRule, Genome g)
	{
		boolean ret = false;
		String s = oneRule.trim().toLowerCase();
		if (SexType.XY.equals(g.getSexType()) || SexType.XO.equals(g.getSexType()))
		{
			if (s.startsWith("sex:")) //$NON-NLS-1$
			{
				s = s.replace(" ", ""); //$NON-NLS-1$ //$NON-NLS-2$
				if (s.equals("sex:male")) //$NON-NLS-1$
				{
					ret = true;
					compiledRules().add(new SexRuleImpl(Creature.Sex.MALE, getModel()));
				}
				else if (s.equals("sex:female")) //$NON-NLS-1$
				{
					ret = true;
					compiledRules().add(new SexRuleImpl(Creature.Sex.FEMALE, getModel()));
				}
			}
		}
		else if (SexType.Aa.equals(g.getSexType()))
		{
			if (s.startsWith("sex:")) //$NON-NLS-1$
			{
				s = s.replace(" ", ""); //$NON-NLS-1$ //$NON-NLS-2$
				if (s.equals("sex:mata")) //$NON-NLS-1$
				{
					ret = true;
					compiledRules().add(new SexRuleImpl(Creature.Sex.MALE, getModel()));
				}
				else if (s.equals("sex:matalpha")) //$NON-NLS-1$
				{
					ret = true;
					compiledRules().add(new SexRuleImpl(Creature.Sex.FEMALE, getModel()));
				}
			}
		}
		return ret;
	}

	private void parseOneRule(String oneRule, Genome g)
	{
		int chromosomeSplit = oneRule.indexOf(':');
		String chromosomeName = null;
		Chromosome chromosome = null;

		if (chromosomeSplit != -1)
		{
			chromosomeName = oneRule.substring(0, chromosomeSplit).trim();
			chromosome = g.getChromosomeByName(chromosomeName);
		}
		else
		{
			int indexC = oneRule.indexOf(',');
			int indexS = oneRule.indexOf(' ');
			if (indexC == -1)
			{
				indexC = oneRule.length();
			}
			if (indexS == -1)
			{
				indexS = oneRule.length();
			}
			int index = Math.min(indexC, indexS);
			String alleleName = oneRule.substring(0, index);
			for (Gene gene : g.getGenes())
			{
				if (gene.getAlleleByName(alleleName) != null)
				{
					chromosome = gene.getChromosome();
					chromosomeName = chromosome.getName();
					break;
				}
			}
		}
		if (chromosome != null)
		{
			String alleles = oneRule.substring(chromosomeSplit + 1).trim();
			ChromosomeRuleImpl cr = makeChromosomeRule(alleles, chromosome);
			if (cr != null)
			{
				compiledRules().add(cr);
			}
		}
		else
		{
			if (!"default".equalsIgnoreCase(oneRule.trim())) //$NON-NLS-1$
			{
				throw new RuntimeException(MessageFormat.format(Messages.getString("RuleImpl.2"), oneRule)); //$NON-NLS-1$
			}
		}
	}

	private ChromosomeRuleImpl makeChromosomeRule(String alleles, Chromosome chromosome)
	{
		ChromosomeRuleImpl cr = new ChromosomeRuleImpl(chromosome, getModel());
		StringTokenizer strandSplit = new StringTokenizer(alleles, ","); //$NON-NLS-1$
		boolean add = false;
		int strand = 0;
		while (strandSplit.hasMoreTokens())
		{
			String strandRule = strandSplit.nextToken().trim();
			StringTokenizer allelesSplit = new StringTokenizer(strandRule, " "); //$NON-NLS-1$
			while (allelesSplit.hasMoreTokens())
			{
				String alleleName = allelesSplit.nextToken().trim();
				Allele allele = chromosome.getAlleleByName(alleleName);
				if (allele != null)
				{
					cr.addAllele(strand, allele);
					add = true;
				}
				else
				{
					throw new RuntimeException(MessageFormat.format(Messages.getString("RuleImpl.1"), alleleName, getName())); //$NON-NLS-1$
				}
			}
			strand++;
		}
		return add ? cr : null;
	}

	public boolean isDefault()
	{
		return DEFAULT.equalsIgnoreCase(getName()) || "*".equalsIgnoreCase(getName());
	}

	public boolean isMatching(GeneticMakeup makeup, Creature.Sex sex)
	{
		boolean ret = compiledRules().size() > 0;
		for (IndividualRule c : compiledRules())
		{
			ret &= c.test(makeup, sex);
		}
		return ret;
	}

}
