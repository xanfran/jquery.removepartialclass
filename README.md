# jQuery.removePartialClass

jQuery plugin to remove CSS classes that partially match a given string.


# Documentation

```
.removePartialClass(subString[, position])
```

**Description:** Removes a CSS class which name partially matches the given string.

`subString` {String} the partial class name to remove

`position` {String} position the position of the given subString in the class name. There are four different values:
* `end`: the class name ends with the given subString.
* `present`: the class name contains the given subString in any position.
* `middle`: the class name has the given subString but it is not at the beginning or at the end.
* `beginning`: the class name starts with the given subString. This is the default value and any other not-supported value will behave as this one.


## Usage

```js
// Partial class: 'color', position: 'beginning'
$('<div class="color-0 test-class color-1 other-color-3 color2 new-color"></div>').removePartialClass('color');

>> Object { 0: <div.test-class.other-color-3.new-color>, length: 1 }

// Partial class: 'color', position: 'middle'
$('<div class="color-0 test-class color-1 other-color-3 color2 new-color"></div>').removePartialClass('color', 'middle');

>> Object { 0: <div.color-0.test-class.color-1.color2.new-color>, length: 1 }

// Partial class: 'color', position: 'end'
$('<div class="color-0 test-class color-1 other-color-3 color2 new-color"></div>').removePartialClass('color', 'end');

>> Object { 0: <div.color-0.test-class.color-1.other-color-3.color2>, length: 1 }

// Partial class: 'color', position: 'present'
$('<div class="color-0 test-class color-1 other-color-3 color2 new-color"></div>').removePartialClass('color', 'present');

>> Object { 0: <div.test-class>, length: 1 }

```


# Credit

This plugin was inspired by the following answer in StackOverflow: http://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard#answer-5182103
