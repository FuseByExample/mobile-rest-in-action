# Faq

## Use Cordova client

* Next install globally cordova & grunt-cordovacli (opional)

```
npm install cordova@latest --save
npm install grunt-cordovacli --save-dev
```

* Add the different mobile platforms (browser, ios, android) that we would like to test using the cordova client.

```
cordova platform add browser
cordova platform add ios
cordova platform add android
```

* Some docs references concerning JBDS & Mobile, Ionic Angularjs mobile framework & Android SDK config issues

    * http://stackoverflow.com/questions/29396252/cordova-error-please-install-android-target-android-21
    * http://stackoverflow.com/questions/26355645/error-in-launching-avd
    * http://blog.arungupta.me/cordova-ios-android-tech-tip/
    * https://access.redhat.com/articles/1400613
    * http://stackoverflow.com/questions/28604648/ionic-requires-android-target-19-i-have-target-21-installed
    * http://forum.ionicframework.com/t/adding-ionic-css-js-components-to-an-existing-phonegap-angularjs-project/1285

* Build the project to generate the code

```
cordova build browser
cordova build ios
cordova build android
```

* Launch a local HTTP Server to serve the content

```
cordova serve 9002
```

or use the emulator

```
cordova serve 9002 &
cordova emulate ios
```

* Open the Browser and point to this address for Ios or the browser

```
http://localhost:9002/ios/www/?url=http://localhost:8001
http://localhost:9002/browser/www/?url=http://localhost:8001`
```


## Change cordova device
 
* To select the device to be used `os-sim showdevicetypes` and then `ionic emulate ios --target="iPhone-6s-Plus"`.
* There is a problem as the cordova ios devices listed doesn't correspond to the list reported by os-sim ...
* Check within the run.js file, the supported device and run ionic emulate ios --target="iPhone-6-Plus"` 

```
var validTargets = ['iPhone-4s', 'iPhone-5', 'iPhone-5s', 'iPhone-6-Plus', 'iPhone-6',
                    'iPad-2', 'iPad-Retina', 'iPad-Air', 'Resizable-iPhone', 'Resizable-iPad'];
```

## Screen orientation

* Add cordova plugin

```
cordova plugin add cordova-plugin-screen-orientation
```

* Change syntax within the controller to unlock screen rotation

```
blog.controller('ArticlesCtrl', function ($scope, fhcloud, $ionicModal, articleService) {

    ionic.Platform.ready(function () {
        console.log('platform ready');
        screen.unlockOrientation();
    })
```    

## To collect Android logs

```
adb connect 192.168.65.101:5555
adb logcat
```

## To use the browser platform when project run locally

```
ionic serve -t browser -p 9200
```

* Open a browser & access the web resources at this address when you use the browser platform

```
http://localhost:9200/?ionicplatform=browser&url=http://localhost:8001#/
```

## Doc/Questions

* Is there a grunt file available somewhere to launch grunt task for the cordova client & where we can pass as parameter the platform to be used (ios, browser, android) ?

* Doc about npm cordova, cordova generator & cordova client :
    * https://www.npmjs.com/package/generator-cordova
    * https://www.npmjs.com/package/cordova
    * https://www.npmjs.com/package/grunt-cordovacli


## To use MBaas

* Change the port number of the `mbaas-service/application.js` file to run on 8010 by editing the application.js file 

```
var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8010;
```

* Add within the `grunt.js` file of the backend-service the env var to setup the mapping between the service running by the mbaas server & the key

```
    env : {
      options : {},
      // environment variables - see https://github.com/jsoverson/grunt-env for more information
      local: {
        FH_USE_LOCAL_DB: true,
        FH_SERVICE_MAP: function() {
          var serviceMap = {
            '0123456789ABCDEFGHIJKLMN': 'http://127.0.0.1:8010',
``` 
* Include the missing required module within the `lib/hello.js` script of the backend-service

```         
var $fh = require('fh-mbaas-api');
``` 

* Replace the existing code with the `$fh.service` to call our `mbaas service`

```
hello.post('/', function (req, res) {
        console.log(new Date(), 'CLOUD called');
        console.log(new Date(), 'In hello route POST / req.body=', req.body);
        var world = req.body && req.body.hello ? req.body.hello : 'World';

        $fh.service({
            //guid: "PFi1ftKRBvlp-qSmgdcOeGe3",
            guid: "0123456789ABCDEFGHIJKLMN",
            path: "/hello",
            method: "POST",
            params: {
                "hello": "world"
            }
        }, function (err, data) {
            if (err) {
                // An error occurred during the call to the service. log some debugging information
                console.log('service call failed - err : ', err);

                // see http://expressjs.com/4x/api.html#res.json
                res.json({msg: JSON.stringify(body)});
            }
            console.log(data);

            // see http://expressjs.com/4x/api.html#res.json
            res.json({msg: JSON.stringify(data)});
        });
    });

``