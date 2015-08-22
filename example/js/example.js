$(document).ready(function() {

  var App = {
    run: function() {
      new View();
    }
  };

  var Utils = {

    /**
     * Trims the string and removes consecutive white spaces and replaces them
     * with a single space
     *
     * @param {String} space-separated string with the CSS classes
     * @return {String} sanitized classes
     */
    sanitizeClasses: function(classes) {
      return (!classes)?'':classes.trim().replace(/\s+/, ' ');
    },

    /**
     * Sanitizes the classes and splits them to return them as an Array
     *
     * @param {String} space-separated string with the CSS classes
     * @return {Array} with the classes; otherwise an empty Array
     */
    getClassesArray: function(classes) {
      // Sanitize the target's classes
      classes = this.sanitizeClasses(classes);
      return (!classes)?[]:classes.split(' ');
    },

    /**
     * Checks if the event was triggered with the Enter key pressed
     *
     * @param {Event} the event that was triggered
     * @return {boolean} true if the Enter was pressed; otherwise false
     */
    isEnterKeyPressed: function(event) {
      return !!event && event.which === 13;
    }
  };

  var View = function() {
    // "Add class" form
    this.inputNewClasses = $('#js-input-new');
    this.inputNewClasses.on('keyup', $.proxy(function(event) {

        if (Utils.isEnterKeyPressed(event)) {
          this.addNewClasses();
        }
      }, this));
    $('#js-btn-add').on('click', $.proxy(this.addNewClasses, this));
    // Div target
    this.divTarget = $('#target');
    this.divOutput = $('#js-output');
    this.listClasses = $('#js-list-classes');
    // "Remove class" form
    this.inputRemoveClasses = $('#js-input-partial');
    this.inputRemoveClasses.on('keyup', $.proxy(function(event) {

        if (Utils.isEnterKeyPressed(event)) {
          this.removeClasses();
        }
      }, this));
    $('#js-btn-partial').on('click', $.proxy(this.removeClasses, this));
    this.positionOptions = $('.js-option');

    // Show the default div target's CSS classes
    this.updateUI();
  };

  /**
   * Updates the UI to show changes in the divTarget's CSS classes
   */
  View.prototype.updateUI = function() {
    var divClasses = Utils.getClassesArray(this.divTarget.attr('class')),
      classesLength = divClasses.length;

    this.listClasses.empty();

    if (classesLength > 0) {

      for (var i=0; i<classesLength; ++i) {
        this.listClasses.append('<li><code>' + divClasses[i] + '</code></li>');
      }

      this.divOutput.html('my classes are:');

    } else {
      this.divOutput.html('I have no CSS classes');
    }

  };

  /**
   * Adds the "New classes" input's value as a CSS class in the divTarget
   */
  View.prototype.addNewClasses = function() {
    this.divTarget.addClass(this.inputNewClasses.val());
    this.updateUI();
    this.inputNewClasses.val('').focus();
  };

  /**
   * Gets the "Remove classes" input's value and removes all the space-separated
   * values using removePartialClass
   */
  View.prototype.removeClasses = function() {
    var classesToRemove = Utils.getClassesArray(this.inputRemoveClasses.val()),
      classesLength = classesToRemove.length,
      position = this.positionOptions.filter(':checked').val();

    if (classesLength > 0) {

      for (var i=0; i<classesLength; ++i) {
        this.divTarget.removePartialClass(classesToRemove[i], position);
      }
    }

    this.updateUI();
    this.inputRemoveClasses.val('').focus();
  };

  App.run();

});
