songtracker.controller('CreateSongTrackerCtrl', function($scope, $location, $routeParams, songService) {
    var self = this;
    $scope.title = "";
    $scope.machine = "";
    $scope.tithing = false;
    $scope.played = new Date();
    $scope.sequence = new Array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
    $scope.aka = new Array("", "", "", "");
    $scope.note = "";

    $scope.song = {};


    $scope.createSong = function() {
      var newAka = new Array();
      for(var i=0; i < 4; i++){
        if($scope.aka && $scope.aka[i] && ($scope.aka[i].trim().length > 0)  ){
          newAka.push($scope.aka[i].trim().toUpperCase());
        }
      }
      var newSequence = new Array();
      for(var i=0; i < 36; i++){
        if($scope.sequence && $scope.sequence[i] && ($scope.sequence[i].trim().length > 0)  ){
          newSequence.push($scope.sequence[i].trim().toUpperCase());
        }
      }
        $scope.song.title = $scope.title;
        $scope.song.machine = $scope.machine;
        $scope.song.tithing = $scope.tithing;
        $scope.song.played = $scope.played;
        $scope.song.played = $scope.played;
        $scope.song.aka = newAka;
        $scope.song.sequence = newSequence;
        $scope.song.note = $scope.note;
        $scope.data = $scope.song;
        songService.updateSong($scope.song);
        $location.path('/');
    }


});
