# Development of the project

## Create Ionic project on openshift.feedhenry.com

* Log to *openshift.feedhenry.com* web site and click on the button to create a new project

* Select from the template list the `IONIC HELLO WORLD PROJECT` and click on the button `choose`
 
* Add your project name `demo-mobile` like also the name of the `client` and `application`
 
* Click on the button `create`

![Create Ionic Mobile Application](https://raw.githubusercontent.com/FuseByExample/mobile-rest-in-action/master/images/mobile-create.png)

* Select the `Cloud App` of the `demo-mobile` project on the openshift.feedhenry.com web site and click on the `cloud` icon to start the deployment process of the nodejs application

![Create Ionic Mobile Application](https://raw.githubusercontent.com/FuseByExample/mobile-rest-in-action/master/images/mobile-deploy.png)

* On your machine, open a terminal and create a folder with the name of your project `demo-mobile`
   
* When the project has been created on openshift.feedhenry.com, copy/paste the git urls

![Git repositories](https://raw.githubusercontent.com/FuseByExample/mobile-rest-in-action/master/images/mobile-gits.png)

* And clone the mobile client and the backend application using the `git clone` command as such

```
git clone git@git.openshift.feedhenry.com:fuse/demo-mobile-client.git client
git clone git@git.openshift.feedhenry.com:fuse/demo-mobile-app.git application
``` 

* Move to the folder `client` and deploy the node packages

```
npm install
```

* Open another terminal and move to the `application` folder
* Deploy too the node packages and grunt 

```
npm install
npm install grunt
``` 
 
* If the `Cloud Application` has been deployed successfully and is started, 

![Cloud Server started](https://raw.githubusercontent.com/FuseByExample/mobile-rest-in-action/master/images/mobile-cloud-server-started.png)

* You can start locally on your machine the mobile application using the `grunt:serve` task that you will execute within the `client` project

```
grunt:serve
```

* Your browser will be called and this address will appear `http://localhost:9002/#`

* Add your name within the field and click on the button `Say hello from the cloud`

* You will receive a response from the nodejs server running in the cloud

![Local Mobile Server](https://raw.githubusercontent.com/FuseByExample/mobile-rest-in-action/master/images/mobile-local-say-hello.png)
 
* You can also make a test using your local backend server which is a nodejs application

* Within the client terminal, stop the grunt task and relaunch using using the local parameter
 
```
grunt serve:local
``` 

* The url displayed into the browser is different as it contains the hostname of the local backend server to call

```
http://localhost:9002/?url=http://localhost:8001#/
```

* Within the project `application` of the second terminal, launch the backend server using this grunt task

```
grunt serve
```

* Say hello using now your local backend server

![Local Mobile Server](https://raw.githubusercontent.com/FuseByExample/mobile-rest-in-action/master/images/mobile-say-local-backend.png)

* Everything is in place to use now Cordova/Ionic tools to play with the iPhone/Android/Browser emulator

## Use Ionic Mobile framework

* To use the ionic client & the mobile framework developed by [http://ionicframework.com/]Ionic, we must install
  the node `ionic` package globally as such :

```
npm install -g ionic
```

* The Cordova Hooks represent special scripts which could be added by application and plugin developers or even by your own build system to customize cordova commands. They must be installed within the project of the client.
* So run these commands

```
ionic hooks add
chmod +x hooks/
```

* Create the config.xml file needed by cordova and add it within the client folder. The two most important parameters are the id and the name

```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<widget id="org.fuse.ionic.js" android-versionCode="23" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
  <name>Fuse Ionic JS App</name>
  <description>This is simple Feedhenry Ionic JS App</description>
  <content src="index.html"/>
  <access origin="*"/>
  <preference name="permissions" value="none"/>
  <preference name="fullscreen" value="true"/>
  <preference name="webviewbounce" value="true"/>
  <preference name="SplashScreen" value="screen"/>
  <preference name="SplashScreenDelay" value="3000"/>
</widget>
```

* In order to add the cordova files required to use the HTML5 Mobile hybrid application running on IoS, Android, a Browser, we will add the required platforms using these commands

```
ionic platform add browser
ionic platform add ios
ionic platform add android
```

* We can now build the project (for a further deployment)

```
ionic build ios
ionic build android
ionic build browser
```

* To emulate the application running into a mobile browser, run this command within the `client` project

```
ionic run browser
```

![Local Mobile Server](https://raw.githubusercontent.com/FuseByExample/mobile-rest-in-action/master/images/mobile-ionic-say-hello.png)

* To run the iOS emulator, use this command

```
ionic run ios
```

* To emulate Android

For the reason explained within the ionic documentation, we have installed `genymotion` and create a VM machine in Virtualbox to emulate `Google Nexus 10`

```
We launch the Samsung Galaxy VM Box
VBoxManage list vms
VBoxManage startvm gui {38ec0571-d491-4a68-aea6-a67749e89ff1}

or launch genymotion client manually and next the Samsung VB

ionic run android
```

*******************



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
