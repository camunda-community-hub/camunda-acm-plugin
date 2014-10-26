ngDefine('cockpit.plugin.acm-plugin.services', function(module) {

  module.factory('utilService', function() {
    'use strict';

    return {

      variableArrayToObject : function(variablesArray) {

        var variablesResult = {};

        // convert to Camunda format

        for (var i = 0; i < variablesArray.length; i++) {
          var value = {};
          Object.defineProperty(value, 'value', {
            enumerable : true,
            writeable : true,
            configurable : true,
            value : variablesArray[i].value
          });
          Object.defineProperty(value, 'type', {
            enumerable : true,
            writeable : true,
            configurable : true,
            value : variablesArray[i].type
          });
          Object.defineProperty(variablesResult, variablesArray[i].name, {
            enumerable : true,
            writeable : true,
            configurable : true,
            value : value
          });
        }
        return variablesResult;
      },

      addVariableTypeString : function(variables) {
        for ( var v in variables) {
        if (!variables[v].hasOwnProperty('type')) {
          Object.defineProperty(variables[v], 'type', {
            enumerable : true,
            writeable : true,
            configurable : true,
            value : 'String'
          });
        }
      }
        return variables;
      }
    };

  });
  
});