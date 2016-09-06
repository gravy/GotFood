(function() {

  angular.module('gotFoodApp')
    .service('gotFoodData', gotFoodData);

  function gotFoodData($http) {
    var locationByLocation = function (loc, term) {
      //return $http.get('/api/locations?loc=' + loc + '&term=' + term);
      return $http.get('/api/locations');
    };
    return {
      locationByLocation: locationByLocation
    };
  }

})();
