define(['handlebars'], function() {
	
	return function Results(element, options) {

		/* ==== Handlebars compiled template ==== */
		var resultTemplate = Handlebars.compile($('#result').html());

        this.show = function() {
        	var resultHtml = resultTemplate({
        		points: options.points
        	})
            element.html(resultHtml);
        };

    };

});