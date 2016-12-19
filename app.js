// Make sure to include the `ui.router` module as a dependency
angular.module('app', [
    'controller.home',
    'module.home',
    'module.dashboard',
    'module.user',
    'service.home',
    'ngEnter',
    'ui.router',
    'ngAnimate',
    'mdMarkdownIt',
    'angular-loading-bar',
    'ui.bootstrap',
    'ui.bootstrap.contextMenu'
])

    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

            }
        ]
    )

    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .when('/c?id', '/contacts/:id')
                    .when('/user/:id', '/contacts/:id')
                    .otherwise('/');
                $stateProvider
                    .state("loginAPI", {
                        url: "/login/api",
                        controller: ['$scope', '$rootScope','$state',
                            function ($scope, $rootScope,$state) {

                            }]
                    })
                    .state("login", {
                        url: "/login",
                        controller: ['$scope', '$rootScope','$state',
                            function ($scope, $rootScope,$state) {

                            }]
                    })
                    .state("logout", {
                        url: "/logout",
                        controller: ['$scope', '$state',
                            function ($scope, $state) {
                                $state.go('login');
                            }]
                    })
                    .state('contact-us', {
                        url: '/contact-us',
                        // Showing off how you could return a promise from templateProvider
                        templateProvider: ['$timeout',
                            function ($timeout) {
                                return $timeout(function () {
                                    return '<p class="lead">UI-Router Resources</p><ul>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router/tree/gh-pages/sample">Source for this Sample</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router">GitHub Main Page</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                                        '</ul>';
                                }, 100);
                            }]
                    })
            }
        ]);
