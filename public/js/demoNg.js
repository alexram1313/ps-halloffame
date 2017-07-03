var demoApp = angular.module('demoApp', []);
demoApp.controller('demoCtrl', function($scope, $http) {

    $scope.setCurrCode = function(code){
        $scope.currCode = code;
        $scope.updateCurrentData()
    };

    $scope.updateCurrentData = function(){
        $scope.results = {};
        $scope.tabularResults = [];

        $http.get('/api/results/'+$scope.currCode)
            .then(function success (data) {
                // console.log(data);
                $scope.results = data.data.results;
                for (var key in $scope.results){
                    myPieChart.data.labels.push(key);
                    myPieChart.data.datasets[0].data.push($scope.results[key]);
                    myPieChart.data.datasets[0].backgroundColor.
                                push('rgb(' + (Math.floor(Math.random() * 256)) + 
                                        ',' + (Math.floor(Math.random() * 256)) +
                                        ',' + (Math.floor(Math.random() * 256)) + ')');
                    $scope.tabularResults.push({
                        e:key,
                        n:$scope.results[key]
                    });
                }
                myPieChart.update();
                // console.log(myPieChart.data);
            }, function error (data) {
                console.log('Error:', data);
            });
    };

    
});
