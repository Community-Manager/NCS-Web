(function () {
    'use strict';
    var controllerId = 'communities';
    angular.module('app').controller(controllerId, ['$scope','$location','common', 'datacontext', 'userService', communities]);

    function communities($scope, $location, common, datacontext, userService) {
        var vm = this;
        vm.isLogged = userService.isLogged();
        vm.isAdmin = userService.isAdmin();
        vm.userId = localStorage.getItem('userId');
        vm.tokenUser = localStorage.getItem('token');
        vm.communities = [];
        vm.community = "";
        vm.communitiesByUser = [];

        vm.AddCommunity = function () {
            var communityToAdd = {
                Name: $scope.Name,
                Description: $scope.Description,
            }
            console.log(communityToAdd);

            datacontext.addCommunity(communityToAdd, vm.tokenUser);//
        }

        vm.redirectToAddCommunity = function () {
            $location.path('/add-community');
        }

        if (!vm.isLogged) {
            $location.path('/');
        }

        activate();

        function activate() {

            if (vm.isLogged && !vm.isAdmin) {
                common.activateController([getCommunitiesByUser(vm.userId)], controllerId)
                            .then(function () { console.log('Activated Community By NO admin user View'); });
            }

            if (vm.isLogged && vm.isAdmin) {
                common.activateController([getCommunities()], controllerId)
                            .then(function () { console.log('Activated Community by Admin View'); });
            }
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