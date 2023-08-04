# Node.js samples for Stimulsoft Reports.JS

#### This repository contains the source code of the examples of usage Stimulsoft Reports.JS reporting tool in the Node.js applications, using JavaScript report engine. The report generator and examples are fully compatible with Node.js 14 and higher.

## Overview
There is available a set of examples of using Stimulsoft Reports.JS in Node.js, for each example, there is a full set of necessary files (Roboto-Black.ttf to render the report, the test report file SimpleList.mrt etc.)
  
* [Adding a Font to the Resource](https://github.com/stimulsoft/Samples-Reports.JS-for-Node.js/tree/master/Adding%20a%20Font%20to%20the%20Resource)  
This example shows how to add a font to the report resources using code.
  
* [Exporting a Report to HTML](https://github.com/stimulsoft/Samples-Reports.JS-for-Node.js/tree/master/Exporting%20a%20Report%20to%20HTML)  
This example allows you to download the report, render it and export it to HTML-format.
  
* [Exporting a Report to PDF](https://github.com/stimulsoft/Samples-Reports.JS-for-Node.js/tree/master/Exporting%20a%20Report%20to%20PDF)  
This example contains code to render a report to a PDF-document.
  
* [Loading a Report and Rendering it with a JSON Data](https://github.com/stimulsoft/Samples-Reports.JS-for-Node.js/tree/master/Loading%20a%20Report%20and%20Rendering%20it%20with%20a%20JSON%20Data)  
This simple example shows the steps to download the report and json-data, its rendering and saving in mdc format.
  
* [Loading a Report and Saving a Rendered Report](https://github.com/stimulsoft/Samples-Reports.JS-for-Node.js/tree/master/Loading%20a%20Report%20and%20Saving%20a%20Rendered%20Report)  
This simple example shows the steps to download the report, its rendering and saving in mdc format.
  
* [Loading a Report from the Server-Side](https://github.com/stimulsoft/Samples-Reports.JS-for-Node.js/tree/master/Loading%20a%20Report%20from%20the%20Server-Side)  
This example shows how to use Node.js server side to work with a report.
  
* [Starting SQL Adapters from the HTTP Server](https://github.com/stimulsoft/Samples-Reports.JS-for-Node.js/tree/master/Starting%20SQL%20adapters%20from%20the%20HTTP%20server)  
This example demonstrates the implementation of connections to different databases (MySQL, Firebird, MSSQL and PostgreSQL). Adapters files are in a directory with an example.
  
* [Supply Custom Headers for Json Database](https://github.com/stimulsoft/Samples-Reports.JS-for-Node.js/tree/master/Supply%20Custom%20Headers%20for%20Json%20Database)  
This example illustrates loading of the report that uses JSON database from some web-server and accessible only by suppliing custom HTTP header.

## Running samples
To run the examples, open the required folder with the example and run the following commands in the console:
* use `npm install` to install requred modules;
* use `node index` to run sample.

## Connect to SQL databases
Since pure JavaScript does not have built-in methods for working with remote databases, this functionality is implemented using server-side code. Therefore, Stimulsoft Reports.JS product contains server data adapters implemented using PHP, Node.js, ASP.NET, Java, .NET Core technologies.
* [DataAdapters.JS](https://github.com/stimulsoft/DataAdapters.JS)

## Other JS reporting components
Many examples for other platforms and technologies are collected in separate repositories:
* [HTML / JS](https://github.com/stimulsoft/Samples-Reports.JS-for-HTML)
* [Angular / AngularJS](https://github.com/stimulsoft/Samples-Reports.JS-for-Angular)
* [Python](https://github.com/stimulsoft/Samples-Reports.JS-for-Python)
* [React](https://github.com/stimulsoft/Samples-Reports.JS-for-React)
* [Vue.js](https://github.com/stimulsoft/Samples-Reports.JS-for-Vue.js)

## About Stimulsoft Reports.JS
Stimulsoft Reports.JS offers a wide range of reporting components created in pure JavaScript. The report builder can be easily integrated into any JavaScript app, works in any modern browser – Chrome, Firefox, Safari, Edge, and supports Node.js. The product contains everything you need to create, edit, build, view and export reports of high complexity.

## Useful links
* [Live Demo](http://demo.stimulsoft.com/#Js)
* [Product Page](https://www.stimulsoft.com/en/products/reports-js)
* [Free Download](https://www.stimulsoft.com/en/downloads)
* [NPM](https://www.npmjs.com/package/stimulsoft-reports-js)
* [Documentation](https://www.stimulsoft.com/en/documentation/online/programming-manual/index.html?reports_js.htm)
* [License](LICENSE.md)
