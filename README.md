# HtmlGenerator

## Introduction
Using this library you can easily generate HTML elements during the runtime of your web application. 
ECMAScript 6 is required as well as jQuery 3.1.1 or higher.

## Usage
Include jQuery and the minified version of the HtmlGenerator in your HTML file.

```
<script src="http://code.jquery.com/jquery-latest.min.js"  type="text/javascript"></script>
<script src="dist/HtmlGenerator.min.js" type="text/javascript"></script>
```

Afterwards you can invoke the methods for generating different HTML elements at any time. Either directly when the page has been loaded, or as a response on certain events that take place in your application, e.g. after click events or Ajax requests.

If you want to generate a new DIV element you can achieve this be calling the method *generateDiv()* 

```
$(document).ready(function () {
    HtmlGenerator.generateDiv($('body'), 'id', 'clazz', true, {text: 'Hello World'});
});
```    

The first parameter defines the parent element, to which the DIV will be attached. In this example the DIV will be added directly to the body element. The second parameter is the ID, the third one may contain a string of CSS classes. The fourth parameter defines, whether the element shall be appended (true) or prepended (false) to the parent element. Last but not least a JSON object can be passed to the method, allowing you to specify additional attributes or defining the text, that shall be displayed inside the element.

For more information you can check out the Wiki where all methods are explained in detail.

## ToDo
- Tables and Ruby tags are not supported yet
- Detailed documentation in the Wiki will follow soon 
