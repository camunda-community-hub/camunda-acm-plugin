# camunda ACM Cockpit plugin

This Camunda Cockpit plugin provides information about case definitions and case instances deployed into Camunda BPM engine. It seamless integrates 
into the cockpit is constructed in the same way, as the corresponding process pages. 

![Dashboard](https://raw.githubusercontent.com/holisticon/camunda-acm-plugin/master/screenshots/plugin-dashboard.png)
![Instance details](https://raw.githubusercontent.com/holisticon/camunda-acm-plugin/master/screenshots/plugin-instance-stepExecutions.png)
![User tasks](https://raw.githubusercontent.com/holisticon/camunda-acm-plugin/master/screenshots/plugin-instance-userTasks.png)

## Features

 - Dashboard view for deployed Case Definitions (in CMMN), their versions and running instances
 - Case Definition view
 - Filtering in Case Definition view
 - Case Instances of current Case Definition as a Tab in Case Definition View
 - Case Instance View 

## Backlog
 
 - Filtering in Case Instance view
 - Undeploy Case Definition Action
 
## Installation & Building

You currently need two components: the ACM Cockpit plugin and the camunda ACM REST api fix (https://github.com/holisticon/camunda-rest-api-fix). Checkout both of them, and put the plugin inside the camunda webapp (e.G. camunda-webapp-jboss)and deploy the fix as a ordinary WAR file. 

Dependencies: org.camunda.bpm.camunda-engine org.camunda.bpm.model.camunda-xml-model org.camunda.bpm.model.camunda-cmmn-model

 
## Contributors

*  _[Simon Zambrovski](https://github.com/zambrovski)_
*  _[Jan Galinski](https://github.com/galinski)_
*  _[Oliver Ochs](https://github.com/simonox)_

## License

Apache License, Version 2.0
