'use strict';

/**
 * @ngdoc function
 * @name costasGiswebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the costasGiswebApp
 */
angular.module('costasGiswebApp')
  .controller('MainCtrl', ['CatalogService', 'OcupationService', 'uiGmapGoogleMapApi', function (catalogService, ocupationService, uiGmapGoogleMapApi) {
      var vm = this;
      vm.map = { center: { latitude: 42.8, longitude: -7.5 }, zoom: 8 };
      vm.provincias = null;
      vm.idProvinciaSelected = 0;
      vm.idMunicipioSelected = 0;
      vm.municipios = null;
      vm.ocupaciones = null;
      vm.markers = [];

      catalogService.getProvincias().then(function (response) {
        vm.provincias = response.data;
      });
      vm.findMunicipios = function()
      {
        if (vm.idProvinciaSelected > 0){
            catalogService.getMunicipiosByProvincias(vm.idProvinciaSelected).then(function (response) {
            vm.municipios = response.data;
          });
        }
      }
      vm.findOcupaciones = function()
      {
        if (vm.idMunicipioSelected > 0){
          ocupationService.getOcupacionesByMunicipio(vm.idMunicipioSelected).then(function (response) {
            // console.log(JSON.stringify(response.data));
            vm.ocupaciones = response.data;
            vm.map = { center: { latitude: vm.ocupaciones[0].Latitud, longitude: vm.ocupaciones[0].Longitud }, zoom: 13 };
            vm.icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            vm.ocupaciones.forEach(function(element, index, array){
              if (ocupationService.getOcupationState(element) == ocupationService.EstadoOcupacion.CADUCADA_DENEGADA)
                {
                     vm.icon = 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png';
                }
                else if (ocupationService.getOcupationState(element) == ocupationService.EstadoOcupacion.SIN_DATOS)
                {
                    vm.icon = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
                }
                else if (ocupationService.getOcupationState(element) == ocupationService.EstadoOcupacion.EN_TRAMITE)
                {
                    vm.icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                }
                else if (ocupationService.getOcupationState(element) == ocupationService.EstadoOcupacion.OTORGADA)
                {
                    vm.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                }
                else if (ocupationService.getOcupationState(element) == ocupationService.EstadoOcupacion.SIN_INICIAR)
                {
                    vm.icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                }
                else if (ocupationService.getOcupationState(element) == ocupationService.EstadoOcupacion.INDETERMINADO)
                {
                    vm.icon = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
                }
              vm.markers.push(
              { id: element.IdOcupacion,
                coords: {
                  latitude: element.Latitud,
                  longitude: element.Longitud
                },
                options: {
                  icon: vm.icon
                },
              });
            });
          });
        }
      }
      uiGmapGoogleMapApi.then(function(maps) {
    });
  }]);
