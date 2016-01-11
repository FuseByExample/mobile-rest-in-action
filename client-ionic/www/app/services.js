'use strict';

var blog = angular.module('blog.services', ['ngResource']);


blog.service('fhcloud', function ($q) {

    return function (cloudEndpoint, data, operation) {
        var defer = $q.defer();

        var params = {
            path: cloudEndpoint,
            method: operation,
            contentType: "application/json",
            data: data,
            timeout: 15000
        };

        $fh.cloud(params, defer.resolve, defer.reject);

        return defer.promise;
    };
});

blog.service('articleService', function() {

    this.articleList = [];

    this.addArticle = function(article) {
        this.articleList.push(article);
    };
    
    this.cleanArticles = function() {
        this.articleList = [];
    }

    this.getArticles = function(){
        return this.articleList;
    };

    this.getArticleById = function(index) {
        for (var i=0, iLen=this.articleList.length; i<iLen; i++) {
            if (this.articleList[i].id == index) return this.articleList[i];
        }
    };

    this.replaceArticles = function(articles) {
        this.articleList = articles;
    };

});