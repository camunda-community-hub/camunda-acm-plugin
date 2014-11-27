# camunda ACM Cockpit plugin

This Camunda Cockpit plugin provides information about case definitions and case instances deployed into Camunda BPM engine. It seamless integrates into the cockpit is constructed in the same way, as the corresponding process pages. 

![Dashboard](https://raw.githubusercontent.com/holisticon/camunda-acm-plugin/master/screenshots/plugin-dashboard.png)
![Instance details](https://raw.githubusercontent.com/holisticon/camunda-acm-plugin/master/screenshots/plugin-instance-taskOverview.png)
![User tasks](https://raw.githubusercontent.com/holisticon/camunda-acm-plugin/master/screenshots/plugin-instance-userTasks.png)
![User tasks](https://raw.githubusercontent.com/holisticon/camunda-acm-plugin/master/screenshots/plugin-instance-variables.png)

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

In order to build the plugin, you will require Apache Maven only. Check out the source code and run `mvn clean install`. The resulting JAR file must be packed inside the Camunda Webapp WAR. The plugin requires at least Camunda 7.2.0 for execution.

## Contributors

*  _[Simon Zambrovski](https://github.com/zambrovski)_
*  _[Jan Galinski](https://github.com/galinski)_
*  _[Oliver Ochs](https://github.com/simonox)_

## License

Apache License, Version 2.0
