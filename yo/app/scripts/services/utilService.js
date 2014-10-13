'use strict';

/**
 * @ngdoc function
 * @name mainModule.service:utilService
 * @description # utilService Service utilService
 */
module.factory('utilService', function() {

  return {

    variableArrayToObject : function(variablesArray) {

      var variablesResult = {};

      // convert to Camunda format

      for (var i = 0; i < variablesArray.length; i++) {
        var value = {};
        Object.defineProperty(value, "value", {
          __proto__ : Object,
          enumerable : true,
          writeable : true,
          configurable : true,
          value : variablesArray[i].value
        });
        Object.defineProperty(value, "type", {
          __proto__ : Object,
          enumerable : true,
          writeable : true,
          configurable : true,
          value : variablesArray[i].type
        });
        Object.defineProperty(variablesResult, variablesArray[i].name, {
          __proto__ : Object,
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
        Object.defineProperty(variables[v], "type", {
          __proto__ : Object,
          enumerable : true,
          writeable : true,
          configurable : true,
          value : "String"
        });
      }
      return variables;
    }
  };

});
