var demoApp = angular.module('hofApp', []);
demoApp.controller('hofCtrl', function($scope, $http) {

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

                $scope.winner = "";
                var currMax = 0;
                $scope.winners = [];

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

                    if (($scope.results[key] > 1)){
                        if ($scope.results[key] > currMax){
                            $scope.winner = key;
                            currMax = $scope.results[key];
                            $scope.winners = [key];
                        } else if ($scope.results[key] == currMax){
                            $scope.winner += ", "+key;
                            $scope.winners.push(key);
                        }
                    }
                }
                myPieChart.update();
                if ($scope.winner === '') $scope.winner = 'No winner'
                else $scope.winnerImg = '/public/images/winners/'+$scope.winner+'.png';
                // console.log(myPieChart.data);
            }, function error (data) {
                console.log('Error:', data);
            });
    };

    
});
