package org.camunda.bpm.cockpit.plugin.acm;

import org.camunda.bpm.model.cmmn.impl.instance.HumanTaskImpl;
import org.camunda.bpm.model.xml.instance.ModelElementInstance;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.Mockito;

import static org.junit.Assert.assertEquals;

public class DetailedCaseExecutionTest {

  private final DetailedCaseExecution testee = new DetailedCaseExecution("", "", "", "", true, true, false);

  @Rule
  public ExpectedException thrown = ExpectedException.none();

  @Test
  public void testDispatch() {
    testee.enrichType(Mockito.mock(HumanTaskImpl.class));
    assertEquals(DetailedCaseExecution.Type.HUMANTASK, testee.getType());
  }

  @Test
  public void testDispatchError() {
    final ModelElementInstance type = Mockito.mock(ModelElementInstance.class);
    thrown.expectMessage("Unknown model element of type " + type.getClass().getName() + " detected.");
    thrown.expect(IllegalStateException.class);

    testee.enrichType(type);
  }

}
