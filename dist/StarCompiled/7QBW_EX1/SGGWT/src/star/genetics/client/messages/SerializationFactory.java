package star.genetics.client.messages;

import star.genetics.genetic.model.Model;

import com.google.web.bindery.autobean.shared.AutoBean;
import com.google.web.bindery.autobean.shared.AutoBeanFactory;

public interface SerializationFactory extends AutoBeanFactory
{
	AutoBean<Model> model();
}
