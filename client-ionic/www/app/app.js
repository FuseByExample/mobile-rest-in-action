'use strict';

var blog = angular.module('blog', ['ionic',
    'blog.controllers',
    'blog.directives',
    'blog.services']);

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