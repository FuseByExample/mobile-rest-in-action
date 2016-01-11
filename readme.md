# Installation of the project 

* To run this project, open a unix/windows terminal and git clone the [project](https://github.com/cmoulliard/feedhenry-camel) or download the [code](https://github.com/cmoulliard/feedhenry-camel/archive/master.zip)  
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
    grunt serve:local (don't work anymore within the browser due to invalid param)
    ionic run browser
    ionic run ios   
```

Remark : When we use the option local, feedhenry will access the backend server locally using the address passed as parameter to the url

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

Remark :  Don't forget to follow the [installation procedure](https://github.com/FuseByExample/rest-dsl-in-action#installation) of this demo in order to use the backend services.