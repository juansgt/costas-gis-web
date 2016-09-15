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
    this.getOcupacionesDescDetailsByMunicipioEstado = function(idMunicipio, estado){
        return $http.get('http://localhost:33569/ocupations/descriptiondetails/municipio/' + idMunicipio + '/estado/' + estado);
    }
    this.getOcupacionesDescDetailsByProvincia = function(idProvincia){
        return $http.get('http://costasgis.shopinshock.com/ocupations/descriptiondetails/provincia/' + idProvincia);
    }
    this.updateOcupacion = function(ocupacion){
        this.OcupacionDescriptionDetails = {
          IdOcupacion: ocupacion.IdOcupacion,
          Latitud: ocupacion.Latitud,
          Longitud: ocupacion.Longitud,
          Titulo: ocupacion.Titulo,
          Descripcion: ocupacion.Descripcion,
          DUNA: ocupacion.DUNA,
          SP: ocupacion.SP,
          Huso: ocupacion.Huso,
          Datum: ocupacion.Datum,
          Uso: ocupacion.Uso,
          Tipo: ocupacion.Tipo,
          Situacion: ocupacion.Situacion
        }
        var aux = JSON.stringify(this.OcupacionDescriptionDetails);
        return $http.put('http://localhost:33569/ocupationsLatLong/' + this.OcupacionDescriptionDetails.IdOcupacion,
            JSON.stringify(this.OcupacionDescriptionDetails));
    }
    // this.OcupacionDescriptionDetails = function(idOcupacion, latitud, longitud, titulo, descripcion){
    //   this.IdOcupacion = idOcupacion
    //   this.Latitud = latitud
    //   this.Longitud = longitud
    //   this.Titulo = titulo;
    //   this.Descripcion = descripcion;
    // }
    this.EstadoOcupacion = {
        SIN_INICIAR: "Sin Iniciar",
        EN_TRAMITE: "En trámite",
        SIN_DATOS: "Sin datos",
        CADUCADA_DENEGADA: "Extinguido",
        OTORGADA: "En vigor",
        INDETERMINADO: "Indeterminado"
    }
    this.findEstadosOcupacion = function(){
      return [this.EstadoOcupacion.SIN_INICIAR, this.EstadoOcupacion.EN_TRAMITE, this.EstadoOcupacion.SIN_DATOS,
          this.EstadoOcupacion.CADUCADA_DENEGADA, this.EstadoOcupacion.OTORGADA, this.EstadoOcupacion.INDETERMINADO];
    }
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
