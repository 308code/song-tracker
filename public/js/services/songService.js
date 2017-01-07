songtracker.service('songService', function($log, $http, $location) {

    var self = this;

    this.getSong = function(id) {
        $http({
                method: 'GET',
                url: '/api/song/' + id,
                type: 'application/json'
            })
            .then(function(response) {
                self.data = response.data;
            }, function(response) {
                $log.error('Error in the getSong(id) service.\n\n' + response);
            });
        return self;
    };
    //
    // this.getNewShow = function() {
    //     self.orderSegments(self.data);
    //     return self;
    // };
    //
    this.updateSong = function(obj) {
      if(obj){
        $http({
                method: 'POST',
                url: '/api/songs',
                type: 'application/json',
                data: obj
            })
            .then(function(response) {
                self.getSongs();
            }, function(response) {
                $log.error('Error in the updateSong() service.\n\n' + response);
            });
            console.log("I am in the if part with obj");
      }else{
        $http({
                method: 'POST',
                url: '/api/songs',
                type: 'application/json',
                data: self.data
            })
            .then(function(response) {
                self.getSongs();
            }, function(response) {
                $log.error('Error in the updateSong() service.\n\n' + response);
            });
          }
        return self;
    };

    this.getSongs = function(query) {
      if(!query){
        query = '/api/songs';
      }
        $http({
                method: 'GET',
                url: query,
                type: 'application/json'
            })
            .then(function(response) {
                self.data = response.data;
            }, function(response) {
                $log.error('Error in the getSongs() service.\n' + response);
            });
        return self;
    };

    this.copySong = function(id) {
      var temp;
        $http({
                method: 'POST',
                url: '/api/song/' + id,
                type: 'application/json'
            })
            .then(function(response) {
              self.data = response.data;
              $location.path("/update/song/" + response.data._id);
            //     self.data = response.data;
            //     return response;
            // }, function(response) {
            //     console.log(response);
            // })
            // .then(function(response) {
            //     $location.path("/update/song/" + response.data._id);
            }, function(response) {
                console.log(response);
            })
            ;
    };

    this.deleteSong = function(id) {
        if (self.data.length <= 1) {
            alert("Sorry you are not allowed to remove the only song in the system.\n" +
                "Please contact the administrator for further assistance.");
        } else {
            $http({
                    method: 'DELETE',
                    url: '/api/song/' + id,
                    type: 'application/json'
                })
                .then(function(response) {
                    self.data = response.data;
                }, function(response) {
                    $log.info(response);
                });
        }
    }

    // this.createShow = function() {
    //     self.data = {};
    //     self.data = {
    //         "title": "title goes here!",
    //         "showNumber": 1,
    //         "season": "",
    //         "series": "1 of 1",
    //         "wraps": new Date(),
    //         "doner": new Date(),
    //         "spots": "",
    //         "credits": true,
    //         "aired": "",
    //         "close": [],
    //         "interview": [],
    //         "middle": [],
    //         "product": [],
    //         "message": [],
    //         "intro": [],
    //         "open": [],
    //         "tease": [{
    //             "details": "",
    //             "filename": "",
    //             "end": 0,
    //             "start": 0,
    //             "position": 1,
    //             "label": "tease"
    //         }]
    //     };
    // };



    return self;
});
