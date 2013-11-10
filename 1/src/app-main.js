require.config({
	paths: {
		jquery: '../bower_components/jquery/jquery'
	}
});
define(function() {

	var listenToQuizFinished = function(EventBus) {
		EventBus.bind('finished', function(element, points) {
			require(['results.amd'], function(Results) {
				showResults(Results, element, points);
			});
		}, this);
	};

	var showResults = function(Results, element, points) {
		var results = new Results(element, {
			points: points
		});
		results.show();
	};

	var initializeQuizes = function($, Quiz) {
		var $quiz1 = $('.quiz-1'),
			$quiz2 = $('.quiz-2');
		var quiz1 = new Quiz($quiz1, {
			questions: 'questions.json'
		});
		quiz1.start();

		var quiz2 = new Quiz($quiz2, {
			questions: 'questions.json'
		});
		quiz2.start();
	};

	Modernizr.load({
		test: Modernizr.json,
		nope: '1/src/json2.js',
		complete: function() {
			require(['event_bus.amd'], listenToQuizFinished);
			require(['jquery', 'quiz.amd'], initializeQuizes);
		}
	});
	
});