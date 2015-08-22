/**
 * jQuery plugin to remove CSS classes that partially match a given string.
 * Inspire by http://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard#answer-5182103
 *
 * @author Copyright 2015 xanfran
 * @see http://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard#answer-5182103
 * @version 0.2
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function($) {

	/**
	 * Removes a CSS class which name partially matches the given string.
	 *
	 * @param {string} subString the partial class name to remove
	 * @param {string} position the position of the given subString in the class
	 * 		name. There are four different values:
	 *			- end: the class name ends with the given subString.
	 *			- middle: the class name has the given subString but it is not
	 * 				at the beginning or at the end.
	 *			- present: the class name contains the given subString in any
	 * 				position.
	 *			- beginning: the class name starts with the given subString.
	 * 				This is the default value and any other not-supported value
	 * 				will behave as this one.
	 */
	$.fn.removePartialClass = function(subString, position) {

		if (!subString) {
			return this;
		}

		var positionString = position || 'beginning',
			regExp;

		if (positionString === 'end') {
			regExp = new RegExp('\\S+' + subString + '($|\\s)', 'g');
		} else if (positionString === 'middle') {
			regExp = new RegExp('(^|\\s)\\S+' + subString + '\\S+($|\\s)', 'g');
		} else if (positionString === 'present') {
			regExp = new RegExp('[^(\\s)]*' + subString + '[^(\\s)]*', 'g');
		} else {
			regExp = new RegExp('(^|\\s)' + subString + '\\S+', 'g');
		}

		this.removeClass(function (index, css) {
			return (css.match(regExp) || []).join(' ');
		});

		return this;
	};

}));
