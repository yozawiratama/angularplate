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

