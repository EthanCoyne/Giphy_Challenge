var app = angular.module('giphyApp', ['ngRoute']);

//pages routes
app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: '/views/pages/main.html',
     controller: 'giphyController as giphyCtrl'
  }).when('/favorites', {
    templateUrl: '/views/pages/favorites.html',
     controller: 'favoriteController as favCtrl'
  });
    $locationProvider.html5Mode(true);
}); // end app.config








  //controller getting gifs from Giphy API
app.controller('giphyController', function(GiphyService){
  console.log("giphyController Loaded");




  var ctrl = this;
  ctrl.favGIF = {};
  ctrl.favoriteGIFs= [];
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
//calls giphyservice to POST favorited gif to the DB
  ctrl.favoriteThisGIF = function(favComment, gifUrl) {

    //creating object to send
    ctrl.favGIF = {
      'comment': favComment,
      'url': gifUrl
    }
    //pushing saved gif to array, may not need
    ctrl.favoriteGIFs.push(ctrl.favGIF);
    console.log("favorited object: ", ctrl.favGIF);

    //sending gif object to GiphyService
    GiphyService.favoriteThisGIF(ctrl.favGIF);

  }
}); // end giphyController


//controller for /favorites view
app.controller('favoriteController', function(GiphyService) {
  console.log('favoriteController loaded');

  var favCtrl = this;
  favCtrl.favGifList = [];

  //calls GiphyService to get favorite gifs from the DB
  favCtrl.getFavorites = function () {
    GiphyService.getFavorites().then(function(response) {
      console.log('response from getfavorites: ', response);
      favCtrl.favGifList = response;
    });
  } // end getFavorites()

  favCtrl.getFavorites();

}); // end favCtrl
