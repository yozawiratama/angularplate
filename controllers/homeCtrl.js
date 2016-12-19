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