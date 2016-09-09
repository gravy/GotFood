(function () {

  angular.module('gotFoodApp')
    .filter('formatDistance', formatDistance);

  var _isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  function formatDistance () {
    return function (distance) {
      var numDistance, unit;
      if (distance && _isNumeric(distance)) {
        numDistance = parseFloat(distance).toFixed(1);
        if (distance > 1) {
          unit = ' miles';
        } else {
          unit = ' mile';
        }
        return numDistance + unit;
      } else {
        return "?";
      }
    };
  }

})();
