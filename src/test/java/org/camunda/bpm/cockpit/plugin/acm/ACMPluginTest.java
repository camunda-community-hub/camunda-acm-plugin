package org.camunda.bpm.cockpit.plugin.acm;

import org.camunda.bpm.cockpit.Cockpit;
import org.camunda.bpm.cockpit.plugin.spi.CockpitPlugin;
import org.camunda.bpm.cockpit.plugin.test.AbstractCockpitPluginTest;
import org.junit.Assert;
import org.junit.Test;

public class ACMPluginTest extends AbstractCockpitPluginTest {

  @Test
  public void testPluginDiscovery() {
    final CockpitPlugin samplePlugin = Cockpit.getRuntimeDelegate().getPluginRegistry().getPlugin("acm-plugin");
    Assert.assertNotNull(samplePlugin);
  }

}