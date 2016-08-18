'use strict';

/**
 * @ngdoc service
 * @name costasGiswebApp.OcupationService
 * @description
 * # OcupationService
 * Service in the costasGiswebApp.
 */
angular.module('costasGiswebApp')
  .service('OcupationService', ['$http', function ($http) {
    this.getOcupacionById = function(idOcupacion){
        return $http.get('http://costasgis.shopinshock.com/ocupations/' + idOcupacion);
    }
    this.getOcupacionesByMunicipio = function(idMunicipio){
        return $http.get('http://costasgis.shopinshock.com/ocupations/municipio/' + idMunicipio);
    }
    this.getOcupacionesByProvincia = function(idProvincia){
        return $http.get('http://costasgis.shopinshock.com/ocupations/provincia/' + idProvincia);
    }
    this.getOcupacionesDescDetailsByMunicipio = function(idMunicipio){
        return $http.get('http://costasgis.shopinshock.com/ocupations/descriptiondetails/municipio/' + idMunicipio);
    }
    this.getOcupacionesDescDetailsByProvincia = function(idProvincia){
        return $http.get('http://costasgis.shopinshock.com/ocupations/descriptiondetails/provincia/' + idProvincia);
    }
    this.
    this.EstadoOcupacion = {
        SIN_INICIAR: "Sin Iniciar",
        EN_TRAMITE: "En trámite",
        SIN_DATOS: "",
        CADUCADA_DENEGADA: "Extinguido",
        OTORGADA: "En vigor",
        INDETERMINADO: "Indeterminado"
    }
    this.Ocupacion = function(Descripcio)
    this.getOcupationState = function(ocupacion){
      if (!ocupacion.Situacion && !ocupacion.Titulo)
      {
          return this.EstadoOcupacion.SIN_DATOS;
      }
      else if (ocupacion.Titulo == "Extinguido")
      {
          return this.EstadoOcupacion.CADUCADA_DENEGADA;
      }
      else if (ocupacion.Situacion == "Sin Iniciar")
      {
          return this.EstadoOcupacion.SIN_INICIAR;
      }
      else if (ocupacion.Situacion == "En trámite")
      {
          return this.EstadoOcupacion.EN_TRAMITE;
      }
      else if (ocupacion.Titulo == "En vigor")
      {
          return this.EstadoOcupacion.OTORGADA;
      }
      return this.EstadoOcupacion.INDETERMINADO;
    }
  }]);
