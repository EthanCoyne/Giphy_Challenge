var app = angular.module('giphyApp', ['ngRoute']);





app.controller('giphyController', function(GiphyService){
  console.log("giphyController Loaded");
  // GET to retrieve favorites from database could go here



  var ctrl = this;
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

});
