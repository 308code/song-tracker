songtracker.controller('DisplaySongTrackerCtrl', function($scope, $routeParams, $location, songService) {
    var self = this;
    var findSong = function(id){
      for(var i=0;i < songService.data.length; i++){
        if(id === songService.data[i]._id){
          return songService.data[i];
        }
      }
    }
    $scope.song = findSong($routeParams.id);
    $scope.played = new Date($scope.song.played);
});
