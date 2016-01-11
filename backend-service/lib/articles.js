var articles = [];

var request = require('request')
//require('request-debug')(request);

exports.findAll = function (req, res, next) {
    console.log("Service Find All called");
    request('http://localhost:9200/blog/_search?pretty=true&q=*:*&size=50', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            var result = [];
            var hits = jsonData.hits.hits;
            for (var i = 0; i < hits.length; i++) {
                result.push(hits[i]._source);
            }
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
        }
    })
};

exports.findById = function (req, res, next) {
    console.log("Service FindById called");    
    var id = req.params.id;
    request('http://localhost:9191/blog/article/search/id/' + id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        }
    })
};

exports.findByUser = function(req, res, next) {
    console.log("Service FindByUser called");
    var user = req.params.user;
    request('http://localhost:9191/blog/article/search/user/' + user, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        }
    })
}

exports.newPost = function (req, res) {
    console.log("Service New Post called");
    var article = req.body;
    var articleCleaned = '{"id":"' + article.id + '","user":"' + article.user + '","title":"' + article.title + '","body":"' + article.body + '","postDate":"' + article.postDate + '"}';
    console.log(articleCleaned);
    request({method: "PUT",
             uri: 'http://localhost:9191/blog/article',
             json: true,
             body: articleCleaned}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Response received : " + body);
            res.send(body);
        } else {
            console.log("Error returned : " + error + ", " + body);
        }
    })
};
