var app = angular.module('giphyApp', []);

app.controller('giphyController', function(GiphyService){
  console.log("giphyController Loaded");

  var ctrl = this;
  // ctrl.searchTerm = '';



  //API KEYs , { params: { api_key: 'key goes here'}}
  ctrl.randomGIF = function () {
    GiphyService.randomGIF().then(function(gif) {
        ctrl.imageName = gif.data.id;
        ctrl.imageURL = gif.data.image_url;
        console.log('img URL: ', ctrl.imageURL);
      });
  };


  ctrl.searchGIF = function(searchTerm){
    GiphyService.searchGIF(searchTerm).then(function(gif) {
      ctrl.imageName = gif.data[0].id;
      ctrl.imageURL = gif.data[0].images.original.url;
      console.log('img URL: ', ctrl.imageURL);
    });
  }

});
