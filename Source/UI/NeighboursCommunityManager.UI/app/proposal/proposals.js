(function () {
    'use strict';
    var controllerId = 'proposals';
    angular.module('app').controller(controllerId, ['$interval', 'common', 'datacontext', proposals]);

    function proposals($interval, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;

        vm.proposals = [];
        vm.title = "Proposals";

        vm.voteUp = function voteUp(id) {
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