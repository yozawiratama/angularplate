angular.module('module.home', [
    'ui.router'
])

    .config(
        ['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $stateProvider
                $stateProvider

                    .state('home',{
                        url: '/',
                        abstract: true
                    })
                    // .state('home.index', {
                    //     url: "/",
                    //     templateUrl: 'views/home/index.html',
                    //     controller: ['$scope', '$state',
                    //         function ($scope, $state) {
                    //             console.log('okay');
                    //         }
                    //     ]
                    // })
                    .state('home.dashboard', {
                        url: "/dashboard",
                        templateUrl: 'views/home/dashboard.html',
                        controller: ['$scope', '$state',
                            function ($scope, $state) {
                                console.log('dashboard');
                            }
                        ]
                    })



            }
        ]
    );