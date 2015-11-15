(function () {
    'use strict';
    var controllerId = 'proposals';
    angular.module('app').controller(controllerId, ['$interval', 'common', 'datacontext','backendHubProxy', proposals]);

    function proposals($interval, common, datacontext, backendHubProxy) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;

        console.log('trying to connect to service');
        var hub = backendHubProxy("http://neighbourscommunityclient.azurewebsites.net/signalr", 'stickyNotesHub');
        console.log("connection id", hub.connectionId);




        vm.proposals = [];
        vm.title = "Proposals";

        vm.voteUp = function voteUp(id) {
            hub.on('addMe', function() {
                console.log("invoked!!!");
            });
            datacontext.voteUp(id);
            setTimeout(function () { getProposals(); }, 500);
        }

        activate();

        function activate() {
            common.activateController([getProposals()], controllerId)
                .then(function () { log('Activated Proposals View'); });
        }

        function getProposals() {
            return datacontext.getProposalsPartials().then(function (data) {

                vm.proposals = data;
                return vm.proposals;
            });
        }
    }
})();