app.controller('navCtrl', ['$scope', '$rootScope', '$state', '$uibModal', 'authSvc',
        function ($scope, $rootScope, $state, $uibModal, authSvc) {
            $scope.mdlTitle = 'Login Modal';
            $scope.items = ['item1', 'item2', 'item3'];

            $scope.isAuthenticated = null;
            $scope.username = null;
            $scope.userInfo = authSvc.getUserInfo();

            if ($scope.userInfo) {
                $scope.isAuthenticated = true;
                $scope.username = $scope.userInfo.username;
            } else {
                $scope.isAuthenticated = false;
            }

            $scope.logout = function () {
                authSvc.logout();
                $scope.isAuthenticated = false;
            };


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
                        mdlTitle: function () {
                            return $scope.mdlTitle;
                        }
                    }
                });

                modalInstance.result.then(function (res) {
                    console.log(res);
                    $scope.userInfo = authSvc.getUserInfo();

                    if ($scope.userInfo) {
                        $scope.isAuthenticated = true;
                        $scope.username = $scope.userInfo.username;
                    } else {
                        $scope.isAuthenticated = false;
                    }

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        }
    ])
    .controller('ModalInstanceCtrl', function ($uibModalInstance, authSvc,mdlTitle) {
        var $ctrl = this;
        $ctrl.mdlTitle = mdlTitle;
        $ctrl.fullname = 'Mr. Administrator';
        $ctrl.username = 'admin';
        $ctrl.password = 'admin';

        $ctrl.ok = function () {
            console.log($ctrl.mdlTitle);
            var loginres = authSvc.login($ctrl.username, $ctrl.password);
            console.log(loginres.then(function (res) {
                console.log(res);
                $uibModalInstance.close();
            }), function (error) {
                console.log(error);
                alert('Login Fail');
            });

        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

