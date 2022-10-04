How it works -> [link](https://github.com/stimulsoft/DataAdapters.JS).  

If you need examples for other platforms, follow the links below:
* [NodeJs](https://github.com/stimulsoft/Samples-JS/tree/master/Node.js/Starting%20SQL%20adapters%20from%20the%20HTTP%20server)
* [ASP.NET](https://github.com/stimulsoft/Samples-JS/tree/master/ASP.NET/Connecting%20to%20Databases)
* [ASP.NET Core](https://github.com/stimulsoft/Samples-JS/tree/master/ASP.NET%20Core/Connecting%20to%20Databases)
* [PHP](https://github.com/stimulsoft/Samples-JS/tree/master/PHP/Connecting%20to%20Databases)
* [Java](https://github.com/stimulsoft/Samples-JS/tree/master/Java/Connecting%20to%20Databases)

### Installation and running
In order to start simply open the Visual Studio solution file in the IDE Visual Studio and run the required project. 
Then, in your code, you should specify the address to the DataAdaptersController.

index.html
```js
StiOptions.WebServer.url = "https://localhost:44355/DataAdapters";
```

In the DataAdaptersController.cs file, you can change all parameters passed from the JS client-side.
