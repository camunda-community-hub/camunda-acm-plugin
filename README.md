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

In order to build the plugin, you only require Apache Maven. In order to build it, check out the source code and run `mvn clean install`. The resulting JAR file must be packed inside the Camunda Webapp WAR. The plugin requires at least Camunda 7.2.0 alpha6 for execution. (Tested on camunda-webapp-jboss-7.2.0-alpha6.war).

After copying the JAR inside the Webapps WAR, you need to modify the MANIFEST.MF of the webapp WAR and put two further dependencies on it. My Manifest looks like following:

     Manifest-Version: 1.0
     Implementation-Vendor: camunda services GmbH
     Implementation-Title: camunda BPM - webapp - JBoss
     Implementation-Version: 7.2.0-alpha6
     Implementation-Vendor-Id: org.camunda.bpm.webapp
     Dependencies: org.camunda.bpm.camunda-engine,org.camunda.bpm.model.camun
      da-cmmn-model,org.camunda.bpm.model.camunda-xml-model
     Built-By: java
     Build-Jdk: 1.7.0_67
     Created-By: Apache Maven
     Archiver-Version: Plexus Archiver
 
## Contributors

*  _[Simon Zambrovski](https://github.com/zambrovski)_
*  _[Jan Galinski](https://github.com/galinski)_
*  _[Oliver Ochs](https://github.com/simonox)_

## License

Apache License, Version 2.0
