var app = angular.module('giphyApp', []);

app.controller('giphyController', function($http){
  console.log("giphyController Loaded");

  var ctrl = this;
  var API = "http://api.giphy.com/v1/";
  var params = {params: {api_key: 'dc6zaTOxFJmzC'}};
  ctrl.searchTerm = '';

  //API KEYs , { params: { api_key: 'key goes here'}}
  ctrl.randomGIF = function(){
    $http.get(API + "gifs/random", params).then(function(response){
      console.log(response);
      ctrl.imageURL = response.data.data.image_url;
      console.log('img URL: ', ctrl.imageURL);
    });
  };

  ctrl.searchGIF = function(){
    params.params.q = ctrl.searchTerm.split(' ').join('+');
    console.log(params.params.q);
    $http.get(API + "gifs/search", params).then(function(response){
      console.log(response);
      ctrl.imageURL = response.data.data[0].images.original.url;
      console.log('img URL: ', ctrl.imageURL);
    });
  }
  // ctrl.iChooseYou = function(poke){
  //   $http.get(poke.url).then(function(response){
  //     console.log(response);
  //     poke.imageUrl = response.data.sprites.front_default;
  //   });
  // }
});
