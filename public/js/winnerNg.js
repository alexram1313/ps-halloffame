var demoApp = angular.module('winnerApp', []);
demoApp.controller('winnerCtrl', function($scope, $http) {

    $scope.setCurrCode = function(parent, code){
        $scope.currParent = parent;
        $scope.currCode   = code;
        $scope.updateCurrentData();
        $scope.getSpeeches();
    };

    $scope.updateCurrentData = function(){
        $scope.results = {};
        $scope.tabularResults = [];

        $http.get('/api/'+$scope.currParent+'/'+$scope.currCode)
            .then(function success (data) {
                // console.log(data);
                $scope.results = data.data.results;

                $scope.winner = "";
                var currMax = 0;
                $scope.winners = [];

                //Pie Chart Processing, Winner Determination, Image Src getting
                for (var key in $scope.results){
                    //Enter data to pie chart
                    myPieChart.data.labels.push(key);
                    myPieChart.data.datasets[0].data.push($scope.results[key]);
                    myPieChart.data.datasets[0].backgroundColor.
                                push('rgb(' + (Math.floor(Math.random() * 256)) + 
                                        ',' + (Math.floor(Math.random() * 256)) +
                                        ',' + (Math.floor(Math.random() * 256)) + ')');

                    //Enter Data for table beside the pie chart
                    $scope.tabularResults.push({
                        e:key,
                        n:$scope.results[key]
                    });

                    //Determining the winner(s)
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

    $scope.getSpeeches = function(){
        $scope.speeches = [];

        $http.get('/api/speeches/results/'+$scope.currCode)
            .then(function success(data){
                $scope.speeches = data.data.speeches;
            },
            
            function error(data){
                $scope.speeches = [];
                console.log(data);
            });
    };

    
});
