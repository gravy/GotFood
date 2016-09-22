(function () {

  angular.module('gotFoodApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'gotFoodData', 'geolocation'];
  function homeCtrl($scope, gotFoodData, geolocation) {
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
      gotFoodData.locationByOptions(loc, term, sort, vm.lat, vm.lng)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found";
          vm.data = { locations: data };
          vm.contentReady = true;
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
    };

    vm.getLocations = function(loc, type, sort) {
      if (type !== undefined) {
        var lowerType = type.toLowerCase();
      }
      if (!vm.lat) {
        setTimeout(function(){
          vm.getData({loc: loc, term: lowerType, sort: sort});
        }, 3000);
      } else {
        vm.getData({loc: loc, term: lowerType, sort: sort});
      }
    };

    vm.setSortPref = function(sortValue) {
      vm.sortPref = 'none';
      if (sortValue === '1') {vm.sortPref = 'distance';}
      if (sortValue === '2') {vm.sortPref = '-rating';}
    };

    vm.getCurrentPosition = function(position) {
      vm.lat = position.coords.latitude;
      vm.lng = position.coords.longitude;
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function() {
        vm.message = "Geolocation is not supported by this browser.";
      });
    };

    geolocation.getPosition(vm.getCurrentPosition,vm.showError,vm.noGeo);

  }

})();



