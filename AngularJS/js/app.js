'use strict';

/**
 * @ngdoc overview
 * @name angularDemoApp
 * @description
 * # angularDemoApp
 *
 * Main module of the application.
 */
angular
  .module('angularDemoApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/viewer', {
        templateUrl: '../views/viewer.html',
        controller: 'ViewerCtrl',
        controllerAs: 'Viewer'
      })
      .when('/designer', {
        templateUrl: '../views/designer.html',
        controller: 'DesignerCtrl',
        controllerAs: 'Designer'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
