﻿(function () {
    'use strict';
    var controllerId = 'proposals';
    angular.module('app').controller(controllerId, ['$interval', '$rootScope', '$scope', '$location', 'common', 'datacontext', 'backendHubProxy', 'userService', proposals]);

    function proposals($interval, $rootScope, $scope, $location, common, datacontext, backendFactory, userService) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;

        console.log('trying to connect to service');
        var hub = backendFactory.createConnection("http://neighbourscommunity.azurewebsites.net/", 'stickyNotesHub');
        //var hub = backendFactory.createConnection("http://localhost:6951/", 'stickyNotesHub');

        vm.isLogged = userService.isLogged();
        vm.proposals = [];
        vm.votesUp = [];
        vm.votesDown = [];
        vm.title = "Proposals";
        vm.tokenUser = localStorage.getItem('token');
        vm.userId = localStorage.getItem('userId');
        vm.redirectToAdd = function () {
            $location.path('/add-proposal');
        }
        var token = localStorage.getItem('token');

        if (!vm.isLogged) {
            $location.path('/');
        }

        // SignalR
        hub.on("refresh", function (data) {
            setTimeout(getProposals(token),1000);
        });

        vm.voteUp = function voteUp(id, token) {
            console.log('vote');
            hub.invoke('VoteUpProposal', function (data) {
                datacontext.voteUp(id, token).then(setTimeout(function () { getProposals(token) },0));
            });
        }

        vm.voteDown = function voteDown(id, token) {
            hub.invoke('VoteUpProposal', function (data) {
                datacontext.voteDown(id, token).then(setTimeout(function () { getProposals(token) }, 0));
            });
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

                for (var i in vm.proposals) {
                    vm.proposals[i].votesUp = getVotesUp(vm.proposals[i]);
                    vm.proposals[i].votesDown = getVotesDown(vm.proposals[i]);
                }
                console.log(vm.proposals);
                return vm.proposals;
            });
        }


        function getVotesUp(proposal) {
            var votes = proposal.votes.filter(function(v) {
                return v.optionId === 1;
            });

            return votes.length;
        }

        function getVotesDown(proposal) {
            var votes = proposal.votes.filter(function (v) {
                return v.optionId === 2;
            });

            return votes.length;
        }

    }
})();