(function () {
    'use strict';

    var controllerId = 'sidebar';
    angular.module('app').controller(controllerId,
        ['$route', '$scope', 'config', 'routes', 'userService', sidebar]);





    function sidebar($route, $scope, config, routes, userService) {
        var vm = this;



        function initScope(service) {


            vm.isLogged = service.isLogged();
            vm.isAdmin = service.isAdmin();
            vm.isCurrent = isCurrent;
            activate();
        }

        initScope(userService);

        $scope.$on('$routeChangeStart', function (next, current) {
            initScope(userService);
        });

        $scope.$on('$locationChangeStart', initScope(userService));
        $scope.$on('$locationChangeSuccess', initScope(userService));

        function activate() { getNavRoutes(); }

        function isLogged() {
            var checkLogged = localStorage.getItem('token');

            return checkLogged;
        }

        function getNavRoutes() {
            vm.navRoutes = routes.filter(function (r) {
                return r.config.settings && r.config.settings.nav;
            }).sort(function (r1, r2) {
                return r1.config.settings.nav - r2.config.settings.nav;
            });
            if (!vm.isAdmin) {
                vm.navRoutes = vm.navRoutes.filter(function(n) {
                    return n.url != '/admin';
                })
            }
            console.log(vm.navRoutes);

        }

        function isCurrent(route) {
            if (!route.config.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.config.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }



    };
})();
