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

    vm.getData = function (options) {
      var loc = options.location,
          term = options.term;
      vm.message = "Searching for nearby places";
      gotFoodData.locationByLocation(loc, term)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { locations: data };
          console.log(vm.data);
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    vm.getData({loc: 'Phoenix', term: 'mexican'});
  }
})();



