'use strict';

/**
 * @ngdoc service
 * @name costasGiswebApp.CatalogService
 * @description
 * # CatalogService
 * Service in the costasGiswebApp.
 */
angular.module('costasGiswebApp')
  .service('CatalogService', ['$http', function ($http) {
    this.getProvincias = function(){
        return $http.get('http://costasgis.shopinshock.com/catalogs/provincias');
    }
    this.getMunicipiosByProvincias = function(idProvincia){
        return $http.get('http://costasgis.shopinshock.com/catalogs/municipios/provincia/' + idProvincia);
    }
  }]);
