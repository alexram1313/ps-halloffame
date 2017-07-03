var demoApp = angular.module('listApp', []);
demoApp.controller('listCtrl', function($scope, $http) {

    $scope.setCurrCode = function(code){
        $scope.currCode = code;
        $scope.updateCurrentData();
    };

    $scope.updateCurrentData = function(){
        $scope.results = {};
        $scope.tabularResults = [];

        $http.get('/api/results/'+$scope.currCode)
            .then(function success (data) {
                // console.log(data);
                $scope.results = data.data.results;
                // console.log(myPieChart.data);
            }, function error (data) {
                console.log('Error:', data);
            });
    };

    
});
