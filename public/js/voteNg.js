var voteApp = angular.module('voteApp', []);
voteApp.controller('voteApp', function($scope, $http) {
    $scope.formHide = false;
    $scope.respMsg  = '';

    const categories = ['artist','css','admin','friendliest','nonpony','techie',
                        'musician','page','forum','moment','hugger','oc','roleplayer',
                        'mentions','country', 'subpol', 'gender','nextsite','remarks'];
    

    $scope.submitVote = function(){
        //Prevent editing and give an initial messgae
        $scope.formHide = true;
        $scope.respMsg  = "Submitting vote..."

        //Set up the POST entry parameter
        //using only non-empty entries
        var params = {entry:{}}
        for (var cat of categories){
            if ($scope[cat] != ''){
                params.entry[cat] = $scope[cat];
            }
        }

        $http.post('/api/votes', JSON.stringify(params))
            .then(
            function success (data) {
                $scope.respMsg = "Your vote has been cast! Thank you for maintaining PonySquare history!"
                console.log(data);
            },
            function error(data) {
                //400 is bad request which our back end will send in case of a vote rejection
                //Our backend will also end an error messsage at err.
                if (data.status == 400){
                    if (data.data.err == "IP already counted")
                        $scope.respMsg = "Your vote was not cast. Are you sure you haven't already voted?";
                    else if (data.data.err == "Voting for self")
                        $scope.respMsg = "Your vote was not cast. Are you sure you're not voting for yourself?";
                }
                else{
                    //Most likely a 500 error happened at this point.
                    $scope.respMsg = "Your vote was not cast. Something bad happened on our end. Try voting again";
                }
            
            });
        
    }
});