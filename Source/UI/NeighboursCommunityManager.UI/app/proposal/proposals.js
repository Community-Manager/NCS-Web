(function () {
    'use strict';
    var controllerId = 'proposals';
    angular.module('app').controller(controllerId, ['$interval', '$rootScope','$scope', '$location', 'common', 'datacontext', 'backendHubProxy', 'userService', proposals]);

    function proposals($interval, $rootScope,$scope, $location, common, datacontext, backendFactory, userService) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;

        console.log('trying to connect to service');
        var hub = backendFactory.createConnection("http://neighbourscommunity.azurewebsites.net/", 'stickyNotesHub');
        //var hub = backendFactory.createConnection("http://localhost:6951/", 'stickyNotesHub');

        vm.isLogged = userService.isLogged();
        vm.proposals = [];
        vm.title = "Proposals";
        vm.tokenUser = localStorage.getItem('token');
        vm.userId = localStorage.getItem('userId');
        vm.redirectToAdd = function() {
            $location.path('/add-proposal');
        }
        var token = localStorage.getItem('token');

        if (!vm.isLogged) {
            $location.path('/');
        }
        //$rootScope.$on('$viewContentLoaded', function () {

        //});

        //TEST AND WORKING
        hub.on("AddMe", function (data) {
            getProposals(token);

        });

        vm.voteUp = function voteUp(id, token) {
            datacontext.voteUp(id, token);
            //hub.invoke('AddProposal', function(data) {});
            //datacontext.voteUp(id).then(setTimeout(function () { getProposals() }, 500));
        }

        vm.addProposal = function add() {

            var proposal = {
                title: $scope.title,
                description: $scope.description,
                community: localStorage.getItem('community')
            }

            datacontext.addProposal(proposal, vm.tokenUser);

            localStorage.removeItem('community');
            
        }

        activate();

        function activate() {
            common.activateController([getProposals(token)], controllerId)
                .then(function () { });
        }

        function getProposals(token) {
            return datacontext.getProposalsPartials(token).then(function (data) {

                vm.proposals = data;
                return vm.proposals;
            });
        }

       


    }
})();