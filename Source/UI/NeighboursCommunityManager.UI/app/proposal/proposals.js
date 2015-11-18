(function () {
    'use strict';
    var controllerId = 'proposals';
    angular.module('app').controller(controllerId, ['$interval', '$rootScope','$location', 'common', 'datacontext', 'backendHubProxy','userService', proposals]);



    function proposals($interval, $rootScope, $location, common, datacontext, backendFactory, userService) {
        
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;


        console.log('trying to connect to service');
        var hub = backendFactory.createConnection("http://neighbourscommunity.azurewebsites.net/", 'stickyNotesHub');
        //var hub = backendFactory.createConnection("http://localhost:6951/", 'stickyNotesHub');

        vm.isLogged = userService.isLogged();
        vm.proposals = [];
        vm.title = "Proposals";


        if (!vm.isLogged) {
            $location.path('/');
        }
        //$rootScope.$on('$viewContentLoaded', function () {
           
        //});

        //TEST AND WORKING
        hub.on("AddMe", function (data) {
            getProposals();
            
        });

        vm.voteUp = function voteUp(id) {
            
                hub.invoke('AddProposal', function (data) {
                    
                });

                datacontext.voteUp(id);
            //datacontext.voteUp(id).then(setTimeout(function () { getProposals() }, 500));

        }

        activate();

        function activate() {
            common.activateController([getProposals()], controllerId)
                .then(function () { });
        }

        function getProposals() {
            return datacontext.getProposalsPartials().then(function (data) {

                vm.proposals = data;
                return vm.proposals;
            });
        }

        
    }
})();