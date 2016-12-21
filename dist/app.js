// Make sure to include the `ui.router` module as a dependency
var app = angular.module('app', [
    'module.home',
    'module.dashboard',
    'module.user',
    'service.auth',
    'service.home',
    'ngEnter',
    'ui.router',
    'ngAnimate',
    'mdMarkdownIt',
    'angular-loading-bar',
    'ui.bootstrap',
    'ui.bootstrap.contextMenu'
]);
app.run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.appTitle = 'Angularplate';

                $rootScope.$on("$stateChangeStart",
                    function (event, toState, toParams, fromState, fromParams) {

                    });

                $rootScope.$on("stateChangeSuccess",
                    function (event, toState, toParams, fromState, fromParams) {
                        console.log(userInfo);
                    });

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
        ])
    .controller('navCtrl', 'navCtrl');


app.controller('homeAbstractCtrl', ['$scope', '$state', 'homeService',
        function ($scope, $state, homeService) {
            $scope.say = homeService.Intro();
        }
    ])
    .controller('homeIndexCtrl', ['$scope', '$state', 'homeService',
        function ($scope, $state, homeService) {
            $scope.say = homeService.Intro();
        }
    ]);
app.controller('navCtrl', ['$scope', '$rootScope', '$state', '$uibModal',
        function ($scope, $rootScope, $state, $uibModal) {
            $scope.appTitle = $rootScope.appTitle;
            $scope.items = ['item1', 'item2', 'item3'];
            $scope.open = function (size) {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'views/modal/login.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: '$ctrl',
                    size: size,
                    resolve: {
                        appTitle: function () {
                            return $scope.appTitle;
                        }
                    }
                });

                modalInstance.result.then(function (newAppTitle) {
                    console.log(newAppTitle);
                    $scope.appTitle = newAppTitle;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        }
    ])
    .controller('ModalInstanceCtrl', function ($uibModalInstance, appTitle) {
        var $ctrl = this;
        $ctrl.appTitle = appTitle;

        $ctrl.ok = function () {
            console.log($ctrl.appTitle);
            $uibModalInstance.close($ctrl.appTitle);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });


/**
 * Created by Y50 on 19/12/2016.
 */

angular.module('module.dashboard', [
    'ui.router'
])

    .config(
        ['$stateProvider',
            function($stateProvider) {
                $stateProvider
                    .state('dashboard', {
                        abstract: true,
                        url: '/dashboard',
                        templateUrl: 'views/dashboard/layout.html',
                        controller: ['$scope', '$state',
                            function ($scope, $state) {

                            }
                        ]
                    })
                    .state('dashboard.index', {
                        url: '',
                        templateUrl: 'views/dashboard/index.html',
                        controller: ['$scope', '$state',
                            function ($scope, $state) {
                                $scope.contact = 10;
                                $scope.feed = 42;
                                $scope.message = 3;
                            }
                        ]
                    })



            }
        ]
    );
angular.module('module.home', [
    'ui.router'
])

    .config(
        ['$stateProvider',
            function($stateProvider) {
                $stateProvider
                    .state('home', {
                        abstract: true,
                        url: '/',
                        templateUrl: 'views/user/layout.html',
                        resolve : {
                            auth: ['$q', 'authSvc',function($q, authSvc) {
                                console.log('masuk');

                                var userInfo = authSvc.getUserInfo();
                                console.log(userInfo);
                                if (userInfo) {
                                    return $q.when(userInfo);
                                } else {
                                    return $q.reject({ authenticated: false });
                                }
                            }]
                        },
                        controller: 'homeAbstractCtrl'
                    })
                    .state('home.index', {
                        url: '',
                        templateUrl: 'views/home/index.html',
                        controller: 'homeIndexCtrl'
                    })



            }
        ]
    );
angular.module('module.user', [
    'ui.router'
])

    .config(
        ['$stateProvider',
            function($stateProvider) {
                $stateProvider
                    .state('user', {
                        abstract: true,
                        url: '/user',
                        templateUrl: 'views/user/layout.html',
                        controller: ['$scope', '$state',
                            function ($scope, $state) {

                            }
                        ]
                    })
                    .state('user.list', {
                        url: '',
                        templateUrl: 'views/user/list.html',
                        controller: ['$scope', '$state',
                            function ($scope, $state) {

                            }
                        ]
                    })



            }
        ]
    );
angular.module('ngEnter',[])
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
angular.module('service.auth', [])
    .service("authSvc", ['$http', '$q', '$window', function($http, $q, $window) {
        var userInfo;
        var factory = {};
        factory.Intro = function () {
            return 'Hello I\'m Angularplate';
        };
        //
        factory.login = function(userName, password) {
            var deferred = $q.defer();

            //or you can use post for real condition
            $http.get("/datas/login.json")
                .then(function(result) {
                    console.log('result');
                userInfo = {
                    accessToken: result.data.access_token,
                    username: result.data.userName
                };
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        factory.logout = function() {
            var deferred = $q.defer();

            $http({
                method: "POST",
                url: logoutUrl,
                headers: {
                    "access_token": userInfo.accessToken
                }
            }).then(function(result) {
                $window.sessionStorage["userInfo"] = null;
                userInfo = null;
                deferred.resolve(result);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        factory.getUserInfo = function() {
            return userInfo;
        }

        factory.init = function() {
            if ($window.sessionStorage["userInfo"]) {
                userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            }
        };
        factory.init();

        return factory;
    }]);

angular.module('service.home', [])
    .service('homeSvc', ['$rootScope', '$http', function ($rootScope, $http) {
        var factory = {};

        factory.Intro = function () {
            return 'Hello I\'m Angularplate';
        };

        return factory;
    }]);
