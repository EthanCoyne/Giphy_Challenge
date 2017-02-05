var app = angular.module('giphyApp', ['ngRoute']);

//pages routes
app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: '/views/pages/main.html',
    controller: 'giphyController as giphyCtrl'
  }).when('/favorites', {
    templateUrl: '/views/pages/favorites.html',
    controller: 'giphyController as giphyCtrl'
  });
    $locationProvider.html5Mode(true);
}); // end app.config








  //controller getting gifs from Giphy API
app.controller('giphyController', function(GiphyService){
  console.log("giphyController Loaded");
  // GET to retrieve favorites from database could go here



  var ctrl = this;
  ctrl.favGIF = {};
  // ctrl.searchTerm = '';



  //API KEYs , { params: { api_key: 'key goes here'}}
  ctrl.randomGIF = function () {
    GiphyService.randomGIF().then(function(gif) {
        ctrl.randomImageURL = gif.data.image_url;
        console.log('img URL: ', ctrl.randomImageURL);
      });
  };

//calls the giphyservice to search for a gif
  ctrl.searchGIF = function(searchTerm){
    GiphyService.searchGIF(searchTerm).then(function(gif) {
      //url of searched gif
      ctrl.searchImageURL = gif.data;
      console.log('img URL: ', ctrl.searchImageURL);
    });
  }

  ctrl.favoriteThisGIF = function(favComment, gifUrl) {
    ctrl.favGIF = {
      'comment': favComment,
      'url': gifUrl
    }
    console.log("favorited object: ", ctrl.favGIF);

    GiphyService.favoriteThisGIF(ctrl.favGIF);

  }
}); // end giphyController
