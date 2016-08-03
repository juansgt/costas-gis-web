'use strict';

/**
 * @ngdoc function
 * @name costasGiswebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the costasGiswebApp
 */
angular.module('costasGiswebApp')
  .controller('MainCtrl', ['CatalogService', 'uiGmapGoogleMapApi', function (catalogService, uiGmapGoogleMapApi) {
      var vm = this;
      vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
      vm.provincias = null;
      catalogService.getProvincias().then(function (response) {
        vm.provincias = response.data;
      });
      uiGmapGoogleMapApi.then(function(maps) {
    });
  }]);
