﻿(function () {
    'use strict';
    var controllerId = 'communities';
    angular.module('app').controller(controllerId, ['common', 'datacontext','userService', communities]);

    function communities(common, datacontext, userService) {
        var vm = this;
        vm.isLogged = userService.isLogged();
        vm.userId = localStorage.getItem('userId');
        vm.communities = [];
        vm.community = "";

        activate();

        function activate() {
            common.activateController([getCommunities(), getCommunitiesByUser(vm.userId)], controllerId)
               .then(function () { console.log('Activated Community View'); });
        }

        if (!vm.isLogged) {
            $location.path('/');
        }
       
        function getCommunities() {
            return datacontext.getAvailableCommunities().then(function (data) {

                vm.communities = data.data;
                console.log("only data" + vm.communities);
                
                console.log(vm.communities.length);

                for (var i = 0; i < vm.communities.length; i += 1) {
                    console.log(vm.communities[i].Name);
                    console.log(vm.communities[i].Description);
                }


                console.log(vm.communities + "here");
                return vm.communities;
            });
        }

        function getCommunitiesByUser(userId) {
            return datacontext.getCommunitiesByUser(userId).then(function (data) {
                console.log('**********************');
                console.log(data);
                console.log('**********************');
                vm.communitiesByUser = data.data;
                
                return vm.communitiesByUser;
            });
        }
    }

})();