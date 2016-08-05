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
      vm.mapDefault = { center: { latitude: 42.8, longitude: -7.5 }, zoom: 8 };
      vm.map = vm.mapDefault;
      vm.provincias = null;
      vm.provinciaSelected = null;
      vm.municipioSelected = null;
      vm.municipios = null;
      vm.ocupaciones = null;
      vm.markers = [];
      vm.mapOcupaciones = new Object();

      catalogService.getProvincias().then(function (response) {
        vm.provincias = response.data;
      });
      vm.findMunicipios = function()
      {
        if (vm.provinciaSelected.IdProvincia > 0){
            catalogService.getMunicipiosByProvincias(vm.provinciaSelected.IdProvincia).then(function (response) {
            vm.municipios = response.data;
            vm.municipios.push({
              IdMunicipio:-1,
              Nombre:'Todos'
            })
          });
        }
      }
      vm.findOcupaciones = function()
      {
        if (vm.municipioSelected.IdMunicipio > 0){
          ocupationService.getOcupacionesByMunicipio(vm.municipioSelected.IdMunicipio).then(function (response) {
              vm.ocupaciones = response.data;
              vm.map = { center: { latitude: vm.ocupaciones[0].Latitud, longitude: vm.ocupaciones[0].Longitud }, zoom: 13 };
              vm.generateOcupaciones();
          });
        }
        else {
            ocupationService.getOcupacionesByProvincia(vm.provinciaSelected.IdProvincia).then(function (response) {
              vm.ocupaciones = response.data;
              vm.map = vm.mapDefault;
              vm.generateOcupaciones();
            });
        }
      }
      vm.generateOcupaciones = function(){
        // console.log(JSON.stringify(response.data));
        vm.icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        vm.markers = [];
        vm.mapOcupaciones = new Object();
        vm.ocupaciones.forEach(function(element, index, array){
          vm.mapOcupaciones[element.IdOcupacion] = element;
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
                icon: vm.icon,
                title:element.Descripcion
              }
            });
        });
      }
      this.findThisOcupacionById = function(idOcupacion){
          return vm.mapOcupaciones[idOcupacion];
      }
      uiGmapGoogleMapApi.then(function(maps) {
      });
  }]);
