/*
 * Quiz plugin 1.0.0
 * 

 * Copyright (c) Alex Antaniuk 2013 
 * Licensed under the MIT license.
 */
;(function($, window, document, undefined) {
  
  var defaults = {},
      points = 0,
      currentQuestion = 0,
      pluginName = "quiz";

  function Quiz(element, options) {
    this.element = element;   
    this._defaults = defaults;
    this._name = pluginName;
    this.options = $.extend({}, defaults, options);
  }

  Quiz.prototype.start = function() {
    $.getJSON(this.options.questions, $.proxy(function(loadedQuestions) {
      this._questions = loadedQuestions;
      this._next();
    }, this));
  };

  Quiz.prototype._next = function() {
    var item = this._questions[currentQuestion++];
    if (item) {
      var answersHtml = '',
          answers = item.answers;
      for (var i = answers.length; i-- > 0;) {
        answersHtml += '<li data-index="' + i + '">' + answers[i] + '</li>'
      }

      var html = $('<div>').attr({
        'class': 'quiz-items'
      }).html('<h3>' + item.question + '</h3><ul>' + answersHtml + '</ul>');
      this.element.html(html).one('click', 'li', $.proxy(function(e) {
        points += item.points[e.currentTarget.getAttribute('data-index')];
        this._next();
      }, this));
    } else if (this.options.finished) {
      this.element.empty();
      this.options.finished(points);
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      var plugin = $.data(this, "plugin_" + pluginName);
      if (!plugin) {
        $.data(this, "plugin_" + pluginName, new Quiz($(this), options));
      } else if (typeof options === 'string') {
        if (Quiz.prototype.hasOwnProperty(options)) {
          plugin[options]();
        }
      }
    });
  };
})(jQuery, window, document);
