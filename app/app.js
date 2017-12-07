'use strict';

angular.module('ethExplorer', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      }).
      when('/block/:blockId', {
        templateUrl: 'views/blockInfos.html',
        controller: 'blockInfosCtrl'
      }).
      when('/transaction/:transactionId', {
        templateUrl: 'views/transactionInfos.html',
        controller: 'transactionInfosCtrl'
      }).
      when('/address/:addressId', {
        templateUrl: 'views/addressInfo.html',
        controller: 'addressInfoCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }])
  .run(function onRun($rootScope) {
    var web3 = new Web3();
    var ethNodeUrl = ['http:', '//', window.location.hostname, ':8545'].join('');
    web3.setProvider(new web3.providers.HttpProvider(ethNodeUrl));
      $rootScope.web3 = web3;
      function sleepFor( sleepDuration ){
        var now = new Date().getTime();
        while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
      }
      var connected = web3.isConnected();
      if (!connected) {
        var $connectwarning = $('#connectwarning');
        $connectwarning.modal({keyboard:false,backdrop:'static'});
        $connectwarning.modal('show');
      }
  });
