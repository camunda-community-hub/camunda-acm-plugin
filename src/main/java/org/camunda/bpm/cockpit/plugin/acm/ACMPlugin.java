package org.camunda.bpm.cockpit.plugin.acm;

import java.util.HashSet;
import java.util.Set;

import org.camunda.bpm.cockpit.plugin.spi.impl.AbstractCockpitPlugin;

/**
 * ACM plugin.
 * 
 * @author Simon Zambrovski, holisticon AG
 */
public class ACMPlugin extends AbstractCockpitPlugin {

  public static final String ID = "acm-plugin";

  @Override
  public String getId() {
    return ID;
  }

  @Override
  public Set<Class<?>> getResourceClasses() {
    final Set<Class<?>> classes = new HashSet<Class<?>>();
    classes.add(RESTRootResource.class);
    return classes;
  }
}