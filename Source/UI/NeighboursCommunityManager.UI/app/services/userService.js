(function () {
    'use strict';

    var serviceId = 'userService';
    angular.module('app').factory(serviceId, ['$location', 'common', userService]);


    function userService($location, common) {

        var service = {
            isLogged: isLogged,
            
        };

        return service;

        function isLogged() {
            var checkLogged = localStorage.getItem('token');

            return checkLogged;
        }

    }



})();