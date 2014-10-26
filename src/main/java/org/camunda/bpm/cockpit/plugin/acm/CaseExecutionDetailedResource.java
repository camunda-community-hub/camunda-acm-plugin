package org.camunda.bpm.cockpit.plugin.acm;

import java.io.InputStream;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;

import org.camunda.bpm.cockpit.plugin.resource.AbstractCockpitPluginResource;
import org.camunda.bpm.engine.runtime.CaseExecution;
import org.camunda.bpm.model.cmmn.Cmmn;
import org.camunda.bpm.model.cmmn.CmmnModelInstance;
import org.camunda.bpm.model.cmmn.impl.instance.PlanItemImpl;
import org.camunda.bpm.model.xml.instance.ModelElementInstance;

/**
 * Enriched executions resource providing plan item description and type
 * information.
 * 
 * @author Simon Zambrovski.
 * 
 */
public class CaseExecutionDetailedResource extends AbstractCockpitPluginResource {

  private static final String DEFINITION_REF = "definitionRef";
  private final String id;

  public CaseExecutionDetailedResource(final String engineName, final String id) {
    super(engineName);
    this.id = id;
  }

  @GET
  @Produces("application/json")
  public List<DetailedCaseExecution> findTasks() {

    final List<CaseExecution> executions = getProcessEngine().getCaseService().createCaseExecutionQuery().caseInstanceId(id).list();
    final List<DetailedCaseExecution> detailedExecutions = DetailedCaseExecution.fromExecutions(executions);

    // FIXME, remove as soon as public API is available
    if (!detailedExecutions.isEmpty()) {
      // get the case definition and parse it.
      final String caseDefinition = detailedExecutions.get(0).getCaseDefinitionId();
      final InputStream caseModel = getProcessEngine().getRepositoryService().getCaseModel(caseDefinition);
      final CmmnModelInstance modelInstance = Cmmn.readModelFromStream(caseModel);

      // enrich information
      for (final DetailedCaseExecution detailed : detailedExecutions) {

        final ModelElementInstance plainItemModel = modelInstance.getModelElementById(detailed.getActivityId());
        if (plainItemModel instanceof PlanItemImpl) {
          final PlanItemImpl planItem = (PlanItemImpl) plainItemModel;
          final String attributeValue = planItem.getAttributeValue(DEFINITION_REF);
          final ModelElementInstance element = modelInstance.getModelElementById(attributeValue);
          detailed.enrichType(element);
          detailed.enrichLabels(element);
        }
      }

    }
    return detailedExecutions;
  }

}
