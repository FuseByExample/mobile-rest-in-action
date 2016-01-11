'use strict';

var blog = angular.module('blog.directives', []);

blog.directive('fhfooter', function() {
    return {
        scope: {},
        restrict: 'E',
        replace: true,
        templateUrl: 'views/footer.html',
        link: function(scope, elem, attrs, ctrl) {
            scope.version = attrs.version;
        }
    };
});