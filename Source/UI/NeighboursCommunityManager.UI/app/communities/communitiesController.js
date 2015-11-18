(function () {
    'use strict';
    var controllerId = 'communities';
    angular.module('app').controller(controllerId, ['common', 'datacontext', communities]);

    function communities(common, datacontext) {
        var vm = this;

        activate();

        function activate() {
            common.activateController([getCommunities()], controllerId)
               .then(function () { console.log('Activated Community View'); });
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
    }

})();