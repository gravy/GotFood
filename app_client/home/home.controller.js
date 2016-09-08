(function () {

  angular.module('gotFoodApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'gotFoodData'];
  function homeCtrl($scope, gotFoodData) {
    var vm = this;
    vm.pageHeader = {
      title: 'GotFood',
      strapline: 'Find good places to eat'
    };
    vm.sidebar = {
      content: "Just select the location and type of food your looking for and GotFood will list the possible choices."
    };

    vm.getData = function(options) {
      var loc = options.loc,
          term = options.term,
          sort = options.sort;
      vm.message = "Searching for places";
      gotFoodData.locationByOptions(loc, term, sort)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found";
          vm.data = { locations: data };
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
    };

    vm.getLocations = function(loc, type, sort) {
      if (type !== undefined) {
        var lowerType = type.toLowerCase();
      }
      vm.getData({loc: loc, term: lowerType, sort: sort});
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };
  }
})();



