(function () {
    'use strict';
    var controllerId = 'auth';
    angular.module('app').controller(controllerId, ['$route', '$scope', '$location', 'common', 'datacontext', auth]);

    function auth($route, $scope, $location, common, datacontext) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;




        vm.register = function register() {

            var user = {
                firstName: $scope.fname,
                lastName: $scope.lname,
                userName: $scope.uname,
                apartmentNumber: $scope.aptnum,
                email: $scope.email,
                password: $scope.pass,
                confirmPassword: $scope.confirmPass,
                verificationToken: $scope.verificationToken,
                isAdmin: false

            }
            localStorage.setItem('user', $scope.email);
            datacontext.register(user);


        }

        vm.login = function login() {

            var user = {
                userName: $scope.userName,
                password: $scope.passwordLogin
            }

            datacontext.login(user.userName, user.password);
            

            localStorage.setItem('user', user.userName);

        }

        vm.registerAdmin = function () {

            var userWithCommunity = {
                firstName: $scope.fnameAdmin,
                lastName: $scope.lnameAdmin,
                userName: $scope.unameAdmin,
                apartmentNumber: $scope.aptnumAdmin,
                email: $scope.emailAdmin,
                password: $scope.passAdmin,
                confirmPassword: $scope.confirmPassAdmin,
                verificationToken: $scope.verificationTokenAdmin,
                communityModel:{
                    communityName: $scope.communityName,
                    communityDescription: $scope.communityDescription
                },
                isAdmin: true
            }

            console.log(userWithCommunity);

            localStorage.setItem('user', $scope.email);

            datacontext.registerAdminAndCommunity(userWithCommunity);

    }

    activate();

    function activate() {
        common.activateController([], controllerId)
           .then(function () { });
    }
}
})();