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
      vm.ocupacionSelected = null;
      vm.markerSelected = null;
      vm.municipios = null;
      vm.ocupaciones = null;
      vm.markers = new Object();
      vm.mapOcupaciones = new Object();

      catalogService.getProvincias().then(function (response) {
        vm.provincias = response.data;
      });
      vm.findMunicipios = function()
      {
        if (vm.provinciaSelected.IdProvincia > 0){
          catalogService.getMunicipiosByProvincias(vm.provinciaSelected.IdProvincia).then(function(response) {
            vm.municipios = response.data;
            vm.municipios.push({
              IdMunicipio:-1,
              Nombre:'Todos'
            })
          });
        }
      }
      vm.findOcupacionesMarker = function()
      {
        if (vm.municipioSelected.IdMunicipio > 0){
          ocupationService.getOcupacionesDescDetailsByMunicipio(vm.municipioSelected.IdMunicipio).then(function (response) {
              vm.ocupaciones = response.data;
              vm.map = { center: { latitude: vm.ocupaciones[0].Latitud, longitude: vm.ocupaciones[0].Longitud }, zoom: 13 };
              vm.generateOcupacionesMarker();
          });
        }
        else {
            ocupationService.getOcupacionesDescDetailsByProvincia(vm.provinciaSelected.IdProvincia).then(function (response) {
              vm.ocupaciones = response.data;
              vm.map = vm.mapDefault;
              vm.generateOcupacionesMarker();
            });
        }
      }
      vm.generateOcupacionesMarker = function(){
        // console.log(JSON.stringify(response.data));
        vm.icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        vm.markers = new Object();
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
            vm.markers[element.IdOcupacion] =
                    { id: element.IdOcupacion,
                      coords: {
                        latitude: element.Latitud,
                        longitude: element.Longitud
                      },
                      options: {
                        icon: vm.icon,
                        draggable: true,
                        title:element.Descripcion
                      }
                    };
        });
      }
      vm.updateOcupacion = function(){
        vm.markerSelected = vm.markers[vm.ocupacionSelected.IdOcupacion];
        vm.ocupacionSelected.Latitud = vm.markerSelected.coords.latitude;
        vm.ocupacionSelected.Longitud = vm.markerSelected.coords.longitude;
        ocupationService.updateOcupacion(vm.ocupacionSelected).then(function (response) {
           vm.findOcupacionMarkerById(vm.ocupacionSelected.IdOcupacion).Descripcion = vm.ocupacionSelected.Descripcion;
        });
      }
      vm.findOcupacionById = function(idOcupacion){
        ocupationService.getOcupacionById(idOcupacion).then(function(response) {
          vm.ocupacionSelected = response.data;
        });
      }
      vm.findOcupacionMarkerById = function(idOcupacion){
          return vm.mapOcupaciones[idOcupacion];
      }
      uiGmapGoogleMapApi.then(function(maps) {
      });
  }]);
