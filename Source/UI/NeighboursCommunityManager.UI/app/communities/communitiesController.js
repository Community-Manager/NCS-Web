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

                vm.communities = data;
                return vm.communities;
            });
        }
    }

})();