'use strict';

/**
 * @ngdoc overview
 * @name costasGiswebApp
 * @description
 * # costasGiswebApp
 *
 * Main module of the application.
 */
angular
  .module('costasGiswebApp', ['uiGmapgoogle-maps']).config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA-6SI8h88MPF_bx3AT3Zd59TIrXw1sHrU',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
  });
