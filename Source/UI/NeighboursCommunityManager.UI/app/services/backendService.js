(function () {
    'use strict';

    var serviceId = 'backendHubProxy';
    angular.module('app').factory(serviceId, ['$rootScope', backendFactory]);


    function backendFactory($rootScope) {

        var service = {
            createConnection: createConnection
        };

        return service;

        function createConnection(serverUrl, hubName) {
            var connection = $.hubConnection(serverUrl + 'signalr', { useDefaultPath: false });
            //var connection = $.hubConnection();
            //$.connection.hub.url = serverUrl;
            var proxy = connection.createHubProxy(hubName);

            // Fucking fake method to work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // AFTER 2 fuckin hours!!!!!!!!!!!!!!
            proxy.on("hello", function () { });

            connection.start().done(function () { console.log('Now connected, connection ID=' + connection.id); });

            return {

                on: function (eventName, callback) {
                    proxy.on(eventName, function (result) {
                        $rootScope.$apply(function () {
                            if (callback) {
                                callback(result);
                            }
                        });
                    });
                },
                invoke: function (methodName, callback) {
                    proxy.invoke(methodName)
                        .done(function (result) {
                            $rootScope.$apply(function () {
                                if (callback) {
                                    callback(result);
                                }
                            });
                        });
                },
                connection: connection
            };
        };
    }
})();