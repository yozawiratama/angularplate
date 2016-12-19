angular.module('service.home', [])
    .factory('homeService', ['$rootScope', '$http', function ($rootScope, $http) {
        var factory = {};

        factory.Intro = function () {
            return 'Hello I\'m Angularplate';
        };

        return factory;
    }]);
