# HtmlGenerator

## Introduction
This library allows you to easily generate HTML elements in your web application at any time using JavaScript and jQuery.
Especially for Single-page applications, where you might have to update the content of your page dynamically - e.g. after an asynchronous request to the server - without having the page to reload, this can be pretty helpful. Using this library you won't have to include plain HTML code inside your JavaScript files anymore. And you also don't have to deal with the standard methods like "document.createElement()" any longer, where you would laboriously need to set every attribute for every single element you'd like to create by yourself. 

Every method takes a fix set of parameters like the ID of the element, a bunch of CSS class names or the parent element and will return a jQuery object of the new HTML element. You can specify further attributes by additionally passing in a JSON object.

## Usage
For usage, ECMAScript 6 is required as well as jQuery 3.1.1 or higher.
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

## Examples
The HtmlGenerator is able to generate more than just some simple DIV containers. 

1) In our first example we create an unordered list with an array of values. Each entry of array will be automatically converted into a new list item.
```
HtmlGenerator.generateUnorderedList($('body'), null, null, true, null, ['hello', 'world', 'cat', 'dog']);
```
2) In case you want to change the list to an ordered list, you only need to call another method with the same parameters
```
HtmlGenerator.generateOrderedList($('body'), null, null, true, null, ['hello', 'world', 'cat', 'dog']);
```

3) In our third and last example we create an entire table, including the table header and footer.
```
HtmlGenerator.generateComplexTable($('body'), 'table-id', 'table-clazz', true, null, {
                row1: null, row2: null, row3: null, row4: null
            }, {
                row1: ['3358401189', '1309088976', '45215948291'],
                row2: ['9904886932', '9829828243', '9423549128'],
                row3: ['0513617939', '0215560389', '0943336182'],
                row4: ['4565088253', '9904886932', '0215560389']
            }, {}, {});
```
The sixth parameter defines the number of rows the table should have, where special attributes for each row can be set. The next parameter is the set of data that will be displayed inside the table. The last two parameters are empty in this example. They define the attributes for the table header and footer. As soon as they are set, the first row will be converted into the table header, the last row will be interpreted as table footer. Otherwise header and footer won't be present inside the table.


For more information you can check out the Wiki where all methods are explained in detail.

## ToDo
- Ruby tags are not supported yet
- Detailed documentation in the Wiki will follow soon 
