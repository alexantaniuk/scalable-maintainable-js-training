var APP = APP || {};

APP.Quiz = (function(APP, $, undefined) {
    
    return function(element, options) {

        var points = 0,
            currentQuestion = 0,
            questions = options.questions;

        var next = function() {
            var item = questions[currentQuestion++];
            if (item) {
                var answersHtml = '',
                    answers = item.answers;
                for (var i = answers.length; i-- > 0;) {
                    answersHtml += '<li data-index="' + i + '">' + answers[i] + '</li>'
                }

                var html = $('<div>').attr({
                    'class': 'quiz-items'
                }).html('<h3>' + item.question + '</h3><ul>' + answersHtml + '</ul>');
                element.html(html).one('click', 'li', $.proxy(function(e) {
                    points += item.points[e.currentTarget.getAttribute('data-index')];
                    next.apply(this, arguments);
                }, this));
            } else {
                element.empty();
                APP.EventBus.trigger('finished', element, points);
            }
        };

        this.start = function() {
            $.getJSON(options.questions, $.proxy(function(loadedQuestions) {
                questions = loadedQuestions;
                next.apply(this, arguments);
            }, this));
        };

    };

}(APP, jQuery));
