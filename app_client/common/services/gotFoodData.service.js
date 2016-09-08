(function() {

  angular.module('gotFoodApp')
    .service('gotFoodData', gotFoodData);

  gotFoodData.$inject = ['$http'];
  function gotFoodData($http) {
    var locationByOptions = function (loc, term, sort) {
      return $http.get('/api/locations?loc=' + loc + '&term=' + term + '&sort=' + sort);
    };
    return {
      locationByOptions: locationByOptions
    };
  }

})();
