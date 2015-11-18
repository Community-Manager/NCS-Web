(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('app').controller(controllerId, ['$location','common','userService', admin]);

    function admin($location,common, userService) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        
        var vm = this;
        vm.title = 'Admin';
        vm.isLogged = userService.isLogged();

        if (!vm.isLogged) {
            $location.path('/');
        }

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () {  });
        }
    }
})();