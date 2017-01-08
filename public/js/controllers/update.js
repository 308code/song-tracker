songtracker.controller('UpdateSongTrackerCtrl', function($scope, $location, $routeParams, songService) {
    var self = this;

    $scope.played;
    $scope.sequence = new Array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
    $scope.aka = new Array("", "", "", "");

    var findSong = function(id) {
      if(! (songService.data instanceof Array)){
        return songService.data;
      }else{
        for (var i = 0; i < songService.data.length; i++) {
            if (id === songService.data[i]._id) {
                songService.data = songService.data[i];
                return songService.data;
            }
        }
      }
    }

    $scope.song = findSong($routeParams.id);
    $scope.played = new Date(songService.data.played);

    $scope.updateSong = function() {
      var newAka = new Array();
      for(var i=0; i < 4; i++){
        if(($scope.song.aka[i] && ($scope.song.aka[i].trim().length > 0) ) ){
          newAka.push($scope.song.aka[i].trim().toUpperCase());
        }
        if($scope.aka[i] && ($scope.aka[i].trim().length > 0)){
          newAka.push($scope.aka[i].trim().toUpperCase());
        }
      }

      var newSequence = new Array();
      for(var i=0; i < 36; i++){
        if(($scope.song.sequence[i] && ($scope.song.sequence[i].trim().length > 0) ) ){
          newSequence.push($scope.song.sequence[i].trim().toUpperCase());
        }
        if($scope.sequence[i] && ($scope.sequence[i].trim().length > 0)){
          newSequence.push($scope.sequence[i].trim().toUpperCase());
        }
      }

        $scope.song.played = $scope.played;
        $scope.song.title = $scope.song.title.toUpperCase();
        $scope.song.aka = newAka;
        $scope.song.sequence = newSequence;
        self.data = songService.updateSong();
        $location.path('/');
    }


});
