(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['$http', 'common', 'entityManagerFactory', 'config', datacontext]);

    function datacontext($http, common, emFactory, config) {
        var EntityQuery = breeze.EntityQuery;

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(serviceId);
        var logError = getLogFn(serviceId, 'error');
        var logSuccess = getLogFn(serviceId, 'success');
        var $q = common.$q;

        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getProposalsPartials: getProposalsPartials,
            voteUp: voteUp,
            login: login
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return $q.when(people);
        }

        function getProposalsPartials() {
            var manager = emFactory.newManager("api/proposals/");
            var orderBy = 'id';
            var proposals;

            return EntityQuery.from('Get')
                .expand(['author', 'votes'])
                .select('id, description, author.firstName, author.lastName, votes')
                .orderBy(orderBy)
                .toType('Proposal')
                .using(manager).execute()
                .then(querySucceeded, _queryFailed);

            function querySucceeded(data) {
                proposals = data.results;
                console.log(proposals);
                log('Retrieved [Proposal Partials] from remote data source', proposals.length, true);
                return proposals;
            }
        }

        function voteUp(id) {
            var url = config.remoteServiceName + "api/proposals/VoteUp/" + id;

            $http.post(url)
                .then(function querySucceeded(data) {
                    log('Voted for proposal', data);
                }, function (data) {
                    console.log(data);
                });
        }

        function login(id) {
            var url = config.remoteServiceName + "token";
            
            $http({
                    method:"POST",
                    url:url,
                    data: $.param({ username: 'archer@gmail.com', password: '123456', grant_type: "password" }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    
                })
                .then(function querySucceeded(data) {
                    log(data);
                }, function (data) {
                    console.log(data);
                });
        }

        function _queryFailed(error) {
            var msg = config.appErrorPrefix + 'Error retriveing data.' + error.message;
            logError(msg, error);
            throw error;
        }
    }
})();