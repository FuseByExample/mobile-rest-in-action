'use strict';

var blog = angular.module('blog', ['ionic',
    'blog.controllers',
    'blog.directives',
    'blog.services']);

/*
 blog.run(function($scope, $ionicPlatform) {

 $scope.httpd = null;
 $scope.createHttpd = function() {
 $scope.httpd = ( cordova && cordova.plugins && cordova.plugins.CorHttpd ) ? cordova.plugins.CorHttpd : null;
 };
 $scope.startLocalServer = function() {

 if($scope.httpd) {
 // before start, check whether its up or not
 $scope.httpd.getURL(function(url){
 if(url.length > 0) {
 $scope.serverURL=url;
 alert($scope.qwe);
 } else {
 $scope.httpd.startServer({
 'www_root' : '/',
 'port' : 8080,
 'localhost_only' : false
 }, function(url){
 $scope.serverURL=url;
 }, function( error ){
 });
 }

 });
 } else {
 }
 };

 $scope.stopServer = function() {
 if ( $scope.httpd) {
 $scope.httpd.stopServer(function(){
 },function( error ){
 });
 }
 };


 $ionicPlatform.ready(function() {

 // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
 // for form inputs)
 if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
 cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
 cordova.plugins.Keyboard.disableScroll(true);

 }
 if (window.StatusBar) {
 // org.apache.cordova.statusbar required
 StatusBar.styleLightContent();
 }

 $scope.createHttpd();
 $scope.startLocalServer();


 });
 })
 */


blog.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.scrolling.jsScrolling(false);

    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'views/menu.html',
            controller: 'ArticlesCtrl'
        })
        .state('app.about', {
            url: '/about',
            // Views is required as about is a nested view defined under app
            views: {
                'menuContent': {
                    templateUrl: 'views/about.html'
                }
            }
        })
        .state('app.articles', {
            url: '/articles',
            views: {
                'menuContent': {
                    templateUrl: 'views/articles.html',
                    controller: 'FindAllCtrl'
                }
            }
        })
        .state('app.searchid', {
            url: '/searchid',
            views: {
                'menuContent': {
                    templateUrl: 'views/searchbyid.html',
                    controller: 'SearchByIdCtrl'
                }
            }
        })
        .state('app.searchuser', {
            url: '/searchuser',
            views: {
                'menuContent': {
                    templateUrl: 'views/searchbyuser.html',
                    controller: 'SearchByUserCtrl'
                }
            }
        })
        .state('app.article', {
            url: '/article/:articleId',
            views: {
                'menuContent': {
                    templateUrl: 'views/article.html',
                    controller: 'ArticleCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/articles')

});