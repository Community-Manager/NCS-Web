(function () {
    'use strict';
    var controllerId = 'invitations';
    angular.module('app').controller(controllerId, ['$interval', '$route', '$rootScope', '$scope', '$location', 'common', 'datacontext', 'backendHubProxy', 'userService', invitations]);

    function invitations($interval, $route, $rootScope, $scope, $location, common, datacontext, backendFactory, userService) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;



        vm.sendInvitation = function add() {

            var invite = {
                email: $scope.email,
                communityKey:localStorage.getItem('community')
            }

            datacontext.invite(invite);

        }

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function() {});
        }

    }


})();