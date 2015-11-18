(function () {
    'use strict';

    var controllerId = 'topnav';
    angular.module('app').controller(controllerId,
        ['$route', '$scope', '$location','common', 'config', 'routes', 'userService', topnav]);

    function topnav($route, $scope, $location,common, config, routes, userService) {
        var vm = this;
       
        function initScope(service) {

            var getLogFn = common.logger.getLogFn;
            var log = getLogFn(controllerId);
            var logError = getLogFn(controllerId, 'error');
            var logSuccess = getLogFn(controllerId, 'success');
            var $q = common.$q;


            vm.isLogged = service.isLogged();
            vm.username = localStorage.getItem('user');
            vm.logout = function () {
                logSuccess(localStorage.getItem('user') + ' logged out.');
                localStorage.setItem('user','');
                localStorage.setItem('token','');
            }

        }

        initScope(userService);

        $scope.$on('$routeChangeStart', function (next, current) {
            initScope(userService);
        });

        $scope.$on('$locationChangeStart', initScope(userService));
        $scope.$on('$locationChangeSuccess', initScope(userService));

       
        activate();

        function activate() { }
    };
})();
