package org.camunda.bpm.cockpit.plugin.acm;

import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.camunda.bpm.cockpit.plugin.resource.AbstractCockpitPluginRootResource;

@Path("plugin/" + ACMPlugin.ID)
public class RESTRootResource extends AbstractCockpitPluginRootResource {

  public RESTRootResource() {
    super(ACMPlugin.ID);
  }

  @Path("{engineName}/case-execution-detailed/{id}")
  public CaseExecutionDetailedResource getCaseExecutionResource(@PathParam("engineName") final String engineName, @PathParam("id") final String id) {
    return subResource(new CaseExecutionDetailedResource(engineName, id), engineName);
  }

}
