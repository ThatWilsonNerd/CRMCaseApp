require.config({
    paths: {
        angular: 'cog_angular.min',
        json2: 'cog_/Scripts/Common/json2',
        XrmServiceToolkit: 'cog_/Scripts/Common/XrmServiceToolkit'
    }
});
require(['angular', 'json2', 'XrmServiceToolkit'], function () {
    //  set up angular stuff 
    var app = angular.module('myApp', []);
    app.controller('ctlrCases', function ($scope) {
        $scope.cases = [];
        
        $scope.getCases = function() {
            XrmServiceToolkit.Rest.RetrieveMultiple(
                "IncidentSet",
                "$select=IncidentId,Title,TicketNumber,CreatedOn",
                function (r) {
                    for (var i = 0; i < r.length; i++) {
                        $scope.cases.push(r[i]);
                    }
                },
                function (error) { console.log(error.message); },
                function onComplete() {  },
                false
            );
        };
        $scope.getCases();

        $scope.current = {};
        $scope.loadCase = function (c) {
            XrmServiceToolkit.Rest.Retrieve(
                c.IncidentId,
                "IncidentSet",
                null, null,
                function (r) {
                    $scope.current = r;
                    console.log(r);
                },
                function (error) {
                    equal(true, false, error.message);
                },
                false
            );
        };
    });
});