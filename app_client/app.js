(function () {

  angular.module('gotFoodApp', ['ngRoute']);

  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'

      })
      .otherwise({redirectTo: '/'});
  }
  angular.module('gotFoodApp')
    .config(['$routeProvider', config]);

})();
