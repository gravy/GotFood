angular.module('gotFoodApp', []);

var gotFoodData = function ($http) {
  return $http.get('/api/locations');
};

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
  return function (distance) {
    var numDistance, unit;
    if (distance && _isNumeric(distance)) {
      if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = ' miles';
      } else {
        numDistance = parseInt(distance * 1000,10);
        unit = ' yards';
      }
      return numDistance + unit;
    } else {
      return "?";
    }
  };
};

var ratingStars = function () {
  return {
    scope: {
      thisRating: '=rating'
    },
    templateUrl : '/rating-stars.html'
  };
};

var locationListCtrl = function($scope, gotFoodData) {
  $scope.message = 'Searching for places';
  gotFoodData
    .success(function(data) {
      $scope.message = data.length > 0 ? "" : "No locations found";
      $scope.data = { locations: data };
    })
    .error(function(e) {
      $scope.message = "Sorry, something's gone wrong ";
    })
};

angular.module('gotFoodApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('gotFoodData', gotFoodData);
