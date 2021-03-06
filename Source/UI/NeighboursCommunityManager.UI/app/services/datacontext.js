(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['$http', '$route', '$location', 'common', 'entityManagerFactory', 'config', datacontext]);

    function datacontext($http, $route, $location, common, emFactory, config) {
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
            register: register,
            getAvailableCommunities: getAvailableCommunities,
            voteUp: voteUp,
            voteDown: voteDown,
            login: login,
            getCommunitiesByUser: getCommunitiesByUser,
            addProposal: addProposal,
            addCommunity: addCommunity,
            registerAdminAndCommunity: registerAdminAndCommunity,
            invite: invite
        };

        return service;

        function getMessageCount() {
            return $q.when();
        }

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

        function getProposalsPartials(token) {
            //var url = config.remoteServiceName + "api/Proposals/Get";
            var manager = emFactory.newManager("api/proposals/");
            //var orderBy = 'id';
            var proposals;

            var ajaxImpl = breeze.config.getAdapterInstance("ajax");
            ajaxImpl.defaultSettings = {
                headers: {
                    // any CORS or other headers that you want to specify.
                    "Authorization": "Bearer " + token
                },
            };

            return EntityQuery.from('Get')
                .expand(['author', 'votes'])
                .select('id, description,title, author.firstName, author.lastName, votes')
                .using(manager).execute()
                .then(querySucceeded, _queryFailed);

            function querySucceeded(data) {
                proposals = data.results;
                //console.log('__--__')
                //console.log(proposals);
                //log('Retrieved [Proposal Partials] from remote data source', proposals.length, true);
                return proposals;
            }
        }

        function voteUp(id, token) {
            var url = config.remoteServiceName + "api/proposals/VoteUp/" + id;

            $http({
                method: 'POST',
                url: url,
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .success(function querySucceeded(data) {
                    if (data == 1) {
                        logSuccess('Voted up for proposal ' + id);
                    } else if (data == 0) {
                        log('Removed vote for proposal ' + id);
                    }
                }).error(function (data) {
                    console.log(data);
                });
            return $q.when();
        }

        function voteDown(id, token) {
            var url = config.remoteServiceName + "api/proposals/VoteDown/" + id;

            $http({
                method: 'POST',
                url: url,
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .success(function querySucceeded(data) {
                    if (data == 1) {
                        logSuccess('Voted down for proposal ' + id);
                    } else if (data == 0) {
                        log('Removed vote for proposal ' + id);
                    }
                }).error(function (data) {
                    console.log(data);
                });
            return $q.when();
        }

        function invite(invite) {
            var url = config.remoteServiceName + "api/invitations/SendInvitation";

            $http({
                method: 'POST',
                url: url,
                data: { email: invite.email, communityKey: invite.communityKey }
            })
                .success(function querySucceeded(data) {

                    logSuccess('Invite sent to ' + invite.email);
                    $location.path('/');

                }).error(function (data) {
                    console.log(data);
                });
            return $q.when();
        }

        function getRole(userId, token) {
            var url = config.remoteServiceName + "api/Account/Role"
            return $q.all(
                $http({
                    method: "POST",
                    url: url,
                    data: ({ userId: userId }),
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                .success(function querySucceeded(data) {
                    localStorage.setItem('isAdmin', data);
                    $location.path('/');
                }).error(function (data) {


                })
            );
        }

        function addProposal(proposal, token) {
            var url = config.remoteServiceName + "api/Proposals/Post"
            return $q.all(
                $http({
                    method: "POST",
                    url: url,
                    data: ({ description: proposal.description, title: proposal.title, communityName: proposal.community }),
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                .success(function querySucceeded(data) {
                    $location.path('/proposals');
                }).error(function (data) {


                })
            );
        }

        function addCommunity(community, token) {

            var url = config.remoteServiceName + "api/communities/PostCommunityByLoggedAdmin";

            var request = $http({
                method: "POST",
                url: url,
                params: {
                    action: "post"
                },
                data: ({ Name: community.Name, Description: community.Description }),
                headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
            });

            return (request.then(querySucceeded, _queryFailed));

            function querySucceeded(data) {
                console.log('new community Added')
                console.log(data);

                $location.path('/communities');
            }
        }

        function registerAdminAndCommunity(userWithCommunity) {
            var url = config.remoteServiceName + "api/communities/Post";

            var request = $http({
                method: "POST",
                url: url,
                params: {
                    action: "post"
                },
                data: ({
                    email: userWithCommunity.email,
                    password: userWithCommunity.password,
                    firstname: userWithCommunity.firstName,
                    lastname: userWithCommunity.lastName,
                    appartmentnumber: userWithCommunity.apartmentNumber,
                    communitymodel: {
                        name: communityName,
                        description: communityDescription
                    },
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            return (request.then(querySucceeded, _queryFailed));

            function querySucceeded(data) {
                console.log('new community and ADMIN Added')
                console.log(data);

                $location.path('/communities');
            }


        }

        function login(email, pass) {
            var url = config.remoteServiceName + "token";
            return $q.all(
                $http({
                    method: "POST",
                    url: url,
                    data: $.param({ username: email, password: pass, grant_type: "password" })

                })
                .success(function querySucceeded(data) {
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('userId', data.userId);
                    logSuccess(email + ' logged in.')
                    getRole(data.userId, data.access_token);


                }).error(function (data) {

                    //console.log(data);
                    logError(data.error_description);
                    $route.reload();
                })
            );
            $location.path('/');
        }

        function register(user) {
            var url = config.remoteServiceName + "api/account/register";
            return $q.all(
                $http({
                    method: "POST",
                    url: url,
                    data: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userName: user.userName,
                        apartmentNumber: user.apartmentNumber,
                        email: user.email,
                        password: user.password,
                        confirmPassword: user.confirmPassword,
                        isAdmin: user.isAdmin,
                        isAccountant: user.isAccountant,
                        verificationToken: user.verificationToken

                    },
                    headers: { 'Content-Type': 'application/json' },

                })
                .success(function (data) {
                    logSuccess(user.email + ' registered successfuly.')
                    login(user.email, user.password);

                }).error(function (data) {
                    console.log(data);
                    for (var item in data.ModelState) {
                        logError(data.ModelState[item][0]);
                    }
                    logError('Wrong data. Try again!')
                })
                );

        }

        function getAvailableCommunities() {
            var url = config.remoteServiceName + "api/communities/";
            var communities = null;

            var request = $http({
                method: "get",
                url: url,
                params: {
                    action: "get"
                }
            });

            return (request.then(querySucceeded, _queryFailed));


            function querySucceeded(data) {
                communities = data;

                //console.log(communities);

                return communities;
            }


        }

        function getCommunitiesByUser(userId) {
            var url = config.remoteServiceName + "api/communities?userId=" + userId;
            var communities = null;

            return $q.all($http({
                method: "get",
                url: url,
                params: {
                    action: "get"
                }
            }).success(function (data) {
                //console.log('===============================')
                //console.log(data);
                //console.log('===============================')

            }).error(function (data) {

            }));



        }

        function _queryFailed(error) {
            var msg = config.appErrorPrefix + 'Error retriveing data.' + error.message;
            logError(msg, error);
            throw error;
        }
    }
})();