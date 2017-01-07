songtracker.controller('SongTrackerCtrl', function($scope, $location, songService) {
    var self = this;
    var today = new Date();
    $scope.songs = songService.getSongs();

    $scope.titleSearch = "";
    $scope.playedSearch = today;
    $scope.machineSearchA = false;
    $scope.machineSearchB = false;

    $scope.deleteSong = function(id){
      songService.deleteSong(id);
    }

    $scope.copySong = function(id){
      songService.copySong(id);
      //$scope.songs = songService.getSongs();
    }

    $scope.queryWithFilterParams = function() {
        var useTitle = false;
        var usePlayed = false;
        if ($scope.titleSearch.trim().length > 0) {
            $scope.titleSearch = $scope.titleSearch.trim();
            useTitle = true;
        }
        if ($scope.playedSearch && $scope.playedSearch !== today) {
            usePlayed = true;
        }
        if (useTitle && usePlayed && $scope.machineSearchA && $scope.machineSearchB) {
                $scope.songs = songService.getSongs('/api/songs?title=' +
                $scope.titleSearch + '&played=' + $scope.playedSearch);
        } else if (useTitle && usePlayed && $scope.machineSearchA) {
                $scope.songs = songService.getSongs('/api/songs?title=' +
                $scope.titleSearch + '&played=' + $scope.playedSearch + '&machine=A');
        } else if (useTitle && usePlayed && $scope.machineSearchB) {
                $scope.songs = songService.getSongs('/api/songs?title=' +
                $scope.titleSearch + '&played=' + $scope.playedSearch + '&machine=B');
        } else if (useTitle && $scope.machineSearchA && $scope.machineSearchB) {
            $scope.songs = songService.getSongs('/api/songs?title=' +
            $scope.titleSearch);
        } else if (useTitle && $scope.machineSearchA) {
                $scope.songs = songService.getSongs('/api/songs?title=' +
                $scope.titleSearch + '&machine=A');
        } else if (useTitle && $scope.machineSearchB) {
                $scope.songs = songService.getSongs('/api/songs?title=' +
                $scope.titleSearch + '&machine=B');
        } else if (useTitle) {
            $scope.songs = songService.getSongs('/api/songs?title=' + $scope.titleSearch);
        } else if (usePlayed && $scope.machineSearchA && $scope.machineSearchB) {
            $scope.songs = songService.getSongs('/api/songs?played=' + $scope.playedSearch);
        } else if (usePlayed && $scope.machineSearchA) {
                $scope.songs = songService.getSongs('/api/songs?played=' + $scope.playedSearch + '&machine=A');
        } else if (usePlayed && $scope.machineSearchB) {
                $scope.songs = songService.getSongs('/api/songs?played=' + $scope.playedSearch + '&machine=B');
        } else if (usePlayed) {
            $scope.songs = songService.getSongs('/api/songs?played=' + $scope.playedSearch);
        } else if ($scope.machineSearchA && $scope.machineSearchB) {
            $scope.songs =  songService.getSongs();
        } else if ($scope.machineSearchA) {
            $scope.songs = songService.getSongs('/api/songs?machine=A');
        } else if ($scope.machineSearchB) {
            $scope.songs = songService.getSongs('/api/songs?machine=B');
        } else {
            $scope.songs =  songService.getSongs();
        }
        $location.path('/');
    }

    $scope.resetSearchParams = function() {
        $scope.titleSearch = "";
        $scope.playedSearch = today;
        $scope.machineSearchA = false;
        $scope.machineSearchB = false;
    }
});
