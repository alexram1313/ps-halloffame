var demoApp = angular.module('demoApp', []);
demoApp.controller('demoCtrl', function($scope, $http) {

    $scope.setCurrCode = function(code){
        $scope.currCode = code;
        $scope.updateCurrentData()
    };

    $scope.updateCurrentData = function(){
        $scope.results = {};
        $scope.tabularResults = [];

        $http.get('/api/demo/'+$scope.currCode)
            .then(function success (data) {
                // console.log(data);
                $scope.results = data.data.results;
                
                //Pie chart and tabular entry processing
                for (var key in $scope.results){
                    //Entering data into the pie chart
                    myPieChart.data.labels.push(key);
                    myPieChart.data.datasets[0].data.push($scope.results[key]);
                    myPieChart.data.datasets[0].backgroundColor.
                                push('rgb(' + (Math.floor(Math.random() * 256)) + 
                                        ',' + (Math.floor(Math.random() * 256)) +
                                        ',' + (Math.floor(Math.random() * 256)) + ')');
                    //Restructuring data for tabular view
                    //We must create a new object representing the key-value pair
                    //for orderBy
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
