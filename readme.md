# Feedhenry Mobile & JBoss Fuse Service

The purpose of this demo is to develop a Mobile Application using the Ionic, Feedhenry & Cordova Hybrid HTML5 Frameworks.

The project will be developed in 2 parts:

* The first part will explain how to setup the project using the `openshift.feedhenry.com` cloud portal and run it locally on your machine while 
* The second part will use the code part of this github repository to call the backend REST services designed for the JBoss Fuse Blog application
developed [here](https://github.com/FuseByExample/rest-dsl-in-action).

| <img src="https://github.com/cmoulliard/feedhenry-camel/blob/master/images/mobile-camel-1.png" width="200"/>  | <img src="https://github.com/cmoulliard/feedhenry-camel/blob/master/images/mobile-camel-2.png" width="200"/>  | <img src="https://github.com/cmoulliard/feedhenry-camel/blob/master/images/mobile-camel-3.png" width="200"/>  | <img src="https://github.com/cmoulliard/feedhenry-camel/blob/master/images/mobile-camel-4.png" width="200"/>  |

To run the project on Android, please use the code modified and pushed to the branch `Android`

# Prerequisites

* [Nodejs - v0.10.30](https://nodejs.org/en/) - `npm install -g npm@0.10.30`
* [Grunt](http://gruntjs.com/)
* [Ionic - 1.7.7](http://ionicframework.com/)
* [Cordova - 5.4.1](https://github.com/apache/cordova-cli)

# Create a Ionic Hello Mobile project - part I

## Setup the project on openshift.feedhenry.com

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

# Installation of the project - part II

* To run this project, open a unix/windows terminal and git clone the [project](https://github.com/FuseByExample/mobile-rest-in-action.git) or download the [code](https://github.com/FuseByExample/mobile-rest-in-action/archive/master.zip)  
* Next move to the mentioned folders hereafter and follow the instructions in order to start the Mobile Client and the Backend server communicating with the Apache Camel REST Services.
* In order to use the nodejs javascript server, we have to install first the javascript packages required
* As the ionic client tool will be used to generate the HTML5 Hybrid code and emulate the iOS or Android Mobile application, then we will specify within the next section how to build and emulate the Mobile environment.

## Mobile client

* Move to the `client-ionic` directory and execute these commands
* Add the Cordova platform specific config files
    
```   
    rm -rf resources/
    rm -rf plugins
    rm -rf platforms/
    ionic hooks add
    ionic platform add ios
    ionic platform add browser
```
    
* Build HTML5 Mobile hybrid code 
    
```    
    ionic build ios
    ionic build browser
```
    
* Run the nodejs server and emulate the browser or ios
     
```
    ionic run browser
    ionic run ios   
```

Remark : When we use the option local, feedhenry will access the backend server locally using the address passed as parameter to the url

* To run on Android

```
ionic emulate android
ionic emulate android --target=Samsung-Galaxy-S6
```

* In a separate terminal of the client-ionic

```
ionic run browser 

and within the browser of the android browser

http://10.0.2.2:8000?url=http://10.0.0.2:8001/#app/articles

```

## Backend server calling the Camel REST Services

* Move to the `backend-service` directory and execute these commands to install
  the node javascript modules and start the node js server

```
    npm install
    npm install grunt
```    
    
* Run the nodejs server and emulate the browser or ios
     
```       
    grunt serve
```

Remark :  Don't forget to follow the [installation procedure here](https://github.com/FuseByExample/rest-dsl-in-action#installation) of Rest DSL in Action in order to use the backend services.