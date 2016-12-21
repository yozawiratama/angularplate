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