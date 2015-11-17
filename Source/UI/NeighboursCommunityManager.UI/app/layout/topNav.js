(function () {
    'use strict';

    var controllerId = 'topnav';
    angular.module('app').controller(controllerId,
        ['$route', 'config', 'routes', 'userService', topnav]);

    function topnav($route, config, routes, userService) {
        var vm = this;

        vm.isLogged = userService.isLogged();

        activate();

        function activate() {  }
    };
})();
