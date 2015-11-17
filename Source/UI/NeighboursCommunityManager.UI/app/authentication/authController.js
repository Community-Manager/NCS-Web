(function () {
    'use strict';
    var controllerId = 'auth';
    angular.module('app').controller(controllerId, ['common', 'datacontext', auth]);

    function auth(common, datacontext) {
       

        var vm = this;
        

        activate();

        function activate() {
            common.activateController([], controllerId)
               .then(function () { log('Activated Auth View'); });
        }

        
    }
})();