var APP = APP || {};
 
APP.QuizFactory = (function (APP, $, undefined) {

    return function() {

    	var modules = {};

    	var generateId = function() {
    		var id;
    		do {
    			id = Math.random().toString(36).slice(2);
    		} while (modules[id]);

    		return id;
    	};

        this.createQuiz = function(element, options) {
        	var id = options.id || generateId(),
        		extendedOptions = $.extend({}, options, {id: id}),
        		quiz = new APP.Quiz(element, extendedOptions);
        	modules[id] = quiz;

        	return quiz;
        };

        this.modules = function() {
        	return $.extend(true, {}, modules);
        };

        this.module = function(id) {
        	return this.modules()[id];
        };

        // cache
		APP.QuizFactory.instance = this;

    };
 
})(APP, jQuery);
