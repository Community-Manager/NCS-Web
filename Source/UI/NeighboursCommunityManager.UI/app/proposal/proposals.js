(function () {
    'use strict';
    var controllerId = 'proposals';
    angular.module('app').controller(controllerId, ['$interval', '$rootScope', 'common', 'datacontext', 'backendHubProxy', proposals]);



    function proposals($interval, $rootScope, common, datacontext, backendFactory) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;
        
        console.log('trying to connect to service');
        var hub = backendFactory.createConnection("http://neighbourscommunity.azurewebsites.net/", 'stickyNotesHub');
        //var hub = backendFactory.createConnection("http://localhost:6951/", 'stickyNotesHub');

        vm.proposals = [];
        vm.title = "Proposals";


        //TEST AND WORKING
        hub.on("AddMe", function (data) {
            getProposals();
            
        });

        vm.voteUp = function voteUp(id) {
            
                hub.invoke('AddProposal', function (data) {
                    console.log(data);
                    
                });

                datacontext.voteUp(id);
            //datacontext.voteUp(id).then(setTimeout(function () { getProposals() }, 500));

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