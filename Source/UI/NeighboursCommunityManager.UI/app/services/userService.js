(function () {
    'use strict';

    var serviceId = 'userService';
    angular.module('app').factory(serviceId, [ userService]);


    function userService() {

        var service = {
            isLogged: isLogged
        };

        return service;

        function isLogged() {
            var checkLogged = localStorage.getItem('token');

            return checkLogged;
        }
    }
})();