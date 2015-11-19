(function () {
    'use strict';

    var app = angular.module('app');


    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {


            $routeProvider.when(r.url, r.config);

        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }

                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                },
                access: {
                    requiresLogin: true,
                    requiredPermissions: ['Admin', 'UserManager'],
                    permissionType: 'AtLeastOne'
                }
            }, {
                url: '/proposals',
                config: {
                    title: 'proposals',
                    templateUrl: 'app/proposal/proposals.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-sticky-note-o"></i> Proposals'
                    }
                }
            }, {
                url: '/register',
                config: {
                    title: 'register',
                    templateUrl: 'app/authentication/register.html',
                    settings: {

                    }
                }
            },
            {
                url: '/communities',
                config: {
                    title: 'communities',
                    templateUrl: 'app/communities/communities.html',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-group"></i> Communities'
                    }
                }


            },
            {
                url: '/login',
                config: {
                    title: 'login',
                    templateUrl: 'app/authentication/login.html',
                    settings: {

                    }
                }
            },
            {
                url: '/register-admin',
                config: {
                    title: 'register-admin',
                    templateUrl: 'app/authentication/register-admin.html',
                    settings: {

                    }
                }
            },
            {
                url: '/add-proposal',
                config: {
                    title: 'add-proposal',
                    templateUrl: 'app/proposal/add-proposal.html',
                    settings: {

                    }
                }
            },
            {
                url: '/add-community',
                config: {
                    title: 'add-community',
                    templateUrl: 'app/communities/add-community.html',
                    settings: {

                    }
                }
            }

        ];
    }
})();