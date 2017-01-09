var songtracker = angular.module('songtracker', ['ngRoute']);
songtracker.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'static/pages/home.html',
            controller: 'SongTrackerCtrl'
        })
        .when('/display/song/:id', {
            templateUrl: 'static/pages/display.html',
            controller: 'DisplaySongTrackerCtrl'
        })
        .when('/update/song/:id', {
            templateUrl: 'static/pages/update.html',
            controller: 'UpdateSongTrackerCtrl'
        })
        .when('/create/song/', {
            templateUrl: 'static/pages/create.html',
            controller: 'CreateSongTrackerCtrl'
        })
});
