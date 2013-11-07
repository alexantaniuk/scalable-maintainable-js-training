var APP = APP || {};

APP.init = function() {
	var pathToQuestions = 'questions.json';

	var $quiz1 = $('.quiz-1'),
		$quiz2 = $('.quiz-2');
	$quiz1.quiz({
		questions: pathToQuestions,
		finished: function(points) {
			$quiz1.results({
				points: points
			}).results('show');
		}
	}).quiz('start');

	$quiz2.quiz({
		questions: pathToQuestions,
		finished: function(points) {
			$quiz2.results({
				points: points
			}).results('show');
		}
	}).quiz('start');

	var $quiz3 = $('.quiz-3'),
		$quiz4 = $('.quiz-4'),
		quizFactrory = new APP.QuizFactory();

	APP.EventBus.bind('finished', function(element, points) {
		var results = new APP.Results(element, {
			points: points
		});
		results.show();
	}, this);

	var quiz3 = quizFactrory.createQuiz($quiz3, {
		questions: pathToQuestions
	});
	quiz3.start();

	var quiz4 = quizFactrory.createQuiz($quiz4, {
		questions: pathToQuestions
	});
	quiz4.start();

	var modules = quizFactrory.modules();
	for (id in modules) {
		console.log(modules[id]);
	}
};