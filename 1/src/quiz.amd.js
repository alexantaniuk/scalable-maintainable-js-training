define(['handlebars'], function() {
	
	return function Quiz(element, options) {

        var points = 0,
            currentQuestion = 0,
            questions = options.questions;

        /* ==== Handlebars compiled template ==== */
        var quizItemTemplate = Handlebars.compile($('#quizItem').html());

        var next = function() {
            var item = questions[currentQuestion++];
            if (item) {
                var quizItemHtml = quizItemTemplate({
                    question: item.question,
                    answers: item.answers
                });
                element.html(quizItemHtml).one('click', 'li', $.proxy(function(e) {
                    points += item.points[e.currentTarget.getAttribute('data-index')];
                    next.apply(this, arguments);
                }, this));
            } else {
                element.empty();
                require(['event_bus.amd'], function(EventBus) {
                    EventBus.trigger('finished', element, points);
                });
            }
        };

        this.start = function() {
            $.getJSON(options.questions, $.proxy(function(loadedQuestions) {
                questions = loadedQuestions;
                next.apply(this, arguments);
            }, this));
        };

    };

});