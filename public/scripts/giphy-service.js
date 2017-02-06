app.service('GiphyService', function($http) {
  var API = "https://api.giphy.com/v1/";
  var params = {params: {api_key: 'dc6zaTOxFJmzC', limit: "1"}};


  this.randomGIF = function() {
    return $http.get(API + "gifs/random", params).then(function(response) {
      console.log('gif received: ', response);
      return response.data;
  });
}

this.searchGIF = function(searchTerm) {
  params.params.q = searchTerm.split(' ').join('+');

  return $http.get(API + "gifs/search", params).then(function(response) {
    return response.data;
  });
}

this.favoriteThisGIF = function(favGIF) {
  return $http({
    method: 'POST',
    url: '/favorite/favPOST',
    data: favGIF
  }).then(function(response) {
    return response;
    console.log('post success', response);
  }).catch(function(error) {
    console.log('post error', error);
  });
}
















});//end app.service
