package org.camunda.bpm.cockpit.plugin.acm;

import org.camunda.bpm.cockpit.plugin.spi.impl.AbstractCockpitPlugin;

/**
 * ACM plugin.
 * 
 * @author Simon Zambrovski
 */
public class ACMPlugin extends AbstractCockpitPlugin {

	public static final String ID = "acm-plugin";

	public String getId() {
		return ID;
	}
}