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
        for (var i = 0, j=$scope.song.aka.length; i < $scope.aka.length; i++) {
            if ("" === $scope.aka[i].trim()) {
                //DO NOTHING
            }else{
              $scope.song.aka[j] = $scope.aka[i].trim();
              j = j + 1;
            }
        }
        for (var i = 0, j=$scope.song.sequence.length; i < $scope.sequence.length; i++) {
            if ("" === $scope.sequence[i].trim()) {
                //DO NOTHING
            }else{
              $scope.song.sequence[j] = $scope.sequence[i].trim();
              j = j + 1;
            }
        }
        $scope.song.played = $scope.played;
        self.data = songService.updateSong();
        $location.path('/');
    }
});
