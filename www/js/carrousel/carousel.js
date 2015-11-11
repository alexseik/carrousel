/**
 * Created by alexseik on 11/11/15.
 */
/*global angular*/
angular.module('starter')
  .constant('CarouselMockService' , function (){
    'use strict';
    var lista = [];
    lista[0] = {dato1:'V',dato2:'1'};
    lista[1] = {dato1:'V',dato2:'2'};
    lista[2] = {dato1:'A',dato2:'3'};
    lista[3] = {dato1:'A',dato2:'4'};
    lista[4] = {dato1:'R',dato2:'5'};
    lista[5] = {dato1:'R',dato2:'6'};
    lista[6] = {dato1:'V',dato2:'7'};
    return lista;
  })
  .directive('complexCarousel', [
    'CarouselMockService',
    function (CarouselMockService) {
      'use strict';
      function group(elements, groupSize){
        var slides = [];
        var floor = Math.floor(elements.length/groupSize);
        var groups = (elements.length % groupSize === 0)? floor : floor + 1;
        for (var i = 0; i < groups; i++) {
          var elementsSet = [];
          for (var j = 0; j < groupSize; j++) {
            var elementPosition = i*groupSize + j;
            if (elementPosition >= elements.length) {
              break;
            }
            elementsSet.push(elements[elementPosition]);
          }
          var elementsGroup = {};
          elementsGroup.elements = elementsSet;
          slides.push(elementsGroup);
        }
        return slides;
      }

      return {
        restrict: 'E',
        templateUrl: 'js/carrousel/carousel.html',
        scope: {
          groupSize: '=groupSize'
        },
        link: function (scope) {
          var elements = CarouselMockService();
          if (isNaN(scope.groupSize) || scope.groupSize === 0) {
            scope.groupSize = 3;
            scope.widthPercentage = "{width:30%}";
          } else {
            var percentage = (scope.groupSize === 0) ? 100 : Math.floor(100 / scope.groupSize);
            percentage -= 2;
            scope.widthPercentage = "{width:" + percentage + "%}";
          }
          scope.slides = group(elements,scope.groupSize);
        }
      };
    }]);
