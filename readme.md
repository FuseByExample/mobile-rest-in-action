# Feedhenry Mobile & JBoss Fuse Service

The purpose of this demo is to develop a Mobile Application using the Ionic, Feedhenry & Cordova Hybrid HTML5 Frameworks calling the backend REST services designed for the JBoss Fuse Blog application
developed [here](https://github.com/FuseByExample/rest-dsl-in-action). The application can run on an iOS/Android Mobile application.

| <img src="https://github.com/cmoulliard/feedhenry-camel/blob/master/images/mobile-camel-1.png" width="200"/>  | <img src="https://github.com/cmoulliard/feedhenry-camel/blob/master/images/mobile-camel-2.png" width="200"/>  | <img src="https://github.com/cmoulliard/feedhenry-camel/blob/master/images/mobile-camel-3.png" width="200"/>  | <img src="https://github.com/cmoulliard/feedhenry-camel/blob/master/images/mobile-camel-4.png" width="200"/>  |

Remark : The application can be started in emulation mode with IoS but not yet with Android

# Prerequisites

* [Nodejs - v0.10.30](https://nodejs.org/en/)
* [Ionic - 1.7.7](http://ionicframework.com/)
* [Cordova - 5.4.1](https://github.com/apache/cordova-cli)

# Installation of the project 

* To run this project, open a unix/windows terminal and git clone the [project](https://github.com/cmoulliard/feedhenry-camel) or download the [code](https://github.com/cmoulliard/feedhenry-camel/archive/master.zip)  
* Next move to the mentioned folders hereafter and follow the instructions in order to start the Mobile Client and the Backend server communicating with the Apache Camel REST Services.
* In order to use the nodejs javascript server, we have to install first the javascript packages required
* As the ionic client tool will be used to generate the HTML5 Hybrid code and emulate the iOS or Android Mobile application, then we will specify within the next section how to build and emulate the Mobile environment.

## Mobile client

* Move to the `client-ionic` directory and execute these commands to install
  the node javascript modules

```
    npm install
```

Remark : When we use the option local, feedhenry will access the backend server locally using the address passed as parameter to the url

## Backend server calling the Camel REST Services

* Move to the `backend-service` directory and execute these commands to install
  the node javascript modules and start the node js server

```
    npm install
    grunt serve
```

Remarks : 

* The backend system will access the mbaas service using the address of the server defined within the `FH_SERVICE_MAP` env var & using the guid key `0123456789ABCDEFGHIJKLMN`
* Don't forget to follow the [installation procedure](https://github.com/FuseByExample/rest-dsl-in-action#installation) of this demo in order to use the backend services.

# Trick and tips

## Use Cordova client

To use the Cordova technology in order to wrap our code to run a Hybrid Mobile solution that we can emaulate or run on IOS or Android, the following modifications
have been done to the project

* Add a config.xml file containing the info about the cordova project within directory client-cordova` & `client-ionic`

```
<?xml version='1.0' encoding='utf-8'?>
<widget id="%id%" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>%appname%</name>
    <description>
        This is simple JS App, built using Cordova
    </description>
    <content src="index.html" />
    <access origin="*" />
    <preference name="fullscreen" value="true" />
    <preference name="webviewbounce" value="true" />
</widget>
```

Replace %id% with a package name (e.g. : org.fuse.feedhenry.js) and %appname% with the name of the application (e.g. : Fuse Feedhenry JS App)

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
http://localhost:9002/browser/www/?url=http://localhost:8001
```
## Modifications done on the generated code of Feedhenry

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

```


## Use Ionic Mobile framework & Feedhenry

Feedhenry can be used with AngularJS & Ionic Mobile javascript frameworks. To use the ionic client & the mobile framework developed by [http://ionicframework.com/]Ionic, we must install
the nodejs client as such :

```
npm install -g ionic
```

The client-cordova project has been created from the feedhenry template `quickstart-ionic-app` where next, we have changed the code `hello.js` file, added cordova `config.xml` and copy/paste
the feedhenry.js file (version 2.10).

Next, we have added the required platforms, build the code & start a local server or the ios, android emulator.

```
ionic platform add ios
ionic platform add android
ionic platform add browser

ionic build ios
ionic build android
ionic build browser
```

* To emulate IoS or Android

For the reason explained within the ionic documentation, we have installed `genymotion` and create a VM machine in Virtualbox to emulate `Google Nexus 10`

```
We launch the Samsung Galaxy VM Box
VBoxManage list vms
VBoxManage startvm gui {38ec0571-d491-4a68-aea6-a67749e89ff1}

or launch genymotion client manually and next the Samsung VB

ionic run android
ionic run ios
```

Remark : 
- Check with ionic team how we could pass the parameter of the url to be used
- Test with Ios 6 as we have permissions issues on android Samsung
- To select the device to be used `os-sim showdevicetypes` and then `onic emulate ios --target="iPhone-6s-Plus"`. There is a problem as the cordova ios devices listed doesn't correspond to the list reported by os-sim ...
- Trick : Check within the run.js file, the supported device and run ionic emulate ios --target="iPhone-6-Plus"` 

```
var validTargets = ['iPhone-4s', 'iPhone-5', 'iPhone-5s', 'iPhone-6-Plus', 'iPhone-6',
                    'iPad-2', 'iPad-Retina', 'iPad-Air', 'Resizable-iPhone', 'Resizable-iPad'];
```

* Screen orientation

- Add cordova plugin

```
cordova plugin add cordova-plugin-screen-orientation
```

- Chane syntax within the controller to unlock screen rotation

```
blog.controller('ArticlesCtrl', function ($scope, fhcloud, $ionicModal, articleService) {

    ionic.Platform.ready(function () {
        console.log('platform ready');
        screen.unlockOrientation();
    })
```    

* To collect Android logs

```
adb connect 192.168.65.101:5555
adb logcat
```

* To use the browser platform

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
