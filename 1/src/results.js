var APP = APP || {};
 
APP.Results = (function (APP, $, undefined) {
 
    return function(element, options) {

        this.show = function() {
            element.html('<h2>Your result is ' + options.points + '</h2>');
        };

    };

})(APP, jQuery);
