(function() {

  angular.module('gotFoodApp')
    .service('gotFoodData', gotFoodData);

  gotFoodData.$inject = ['$http'];
  function gotFoodData($http) {
    var locationByOptions = function (loc, term, sort, curLat, curLng) {
      return $http.get('/api/locations?loc=' + loc + '&term=' + term + '&sort=' + sort + '&curlat=' + curLat + '&curlng=' + curLng);
    };
    return {
      locationByOptions: locationByOptions
    };
  }

})();
