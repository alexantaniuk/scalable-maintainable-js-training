/*
 * Results plugin 1.0.0
 * 

 * Copyright (c) Alex Antaniuk 2013 
 * Licensed under the MIT license.
 */
;(function($, window, document, undefined) {
  
  var defaults = {
        points: 0
      },
      pluginName = "results";

  function Results(element, options) {
    this.element = element;
    this._defaults = defaults;
    this._name = pluginName;
    this.options = $.extend({}, defaults, options);
  }

  Results.prototype.show = function() {
    this.element.html('<h2>Your result is ' + this.options.points + '</h2>');
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      var plugin = $.data(this, "plugin_" + pluginName);
      if (!plugin) {
        $.data(this, "plugin_" + pluginName, new Results($(this), options));
      } else if (typeof options === 'string') {
        if (Results.prototype.hasOwnProperty(options)) {
          plugin[options]();
        }
      }
    });
  };
})(jQuery, window, document);
