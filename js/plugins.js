// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

jQuery(document).ready(function(){
    //custom message and class for validation of user
    jQuery.extend(jQuery.validator.messages, {
        user: "Invalid Username"
    });
    jQuery.extend(jQuery.validator.classRuleSettings, {
        user: { user:true }
    });
    jQuery.extend(jQuery.validator.methods, {
        user: function(value, element, param) {
           return this.optional(element) || value == "designer@gmail.com"
        }
    });

    //set focus to first invalid value
    $.validator.setDefaults({
        focusInvalid: false
    });
      $(".validateForm").each(function() {
        var form = $(this);

        var v = form.validate({
            errorElement: "span",
            highlight: function(element) {
                $(element).closest('.form-group').removeClass("has-success").addClass('has-warning');
                $(element).addClass('error');
            },
            unhighlight: function(element) {
                $(element).closest('.form-group').addClass("has-success").removeClass('has-warning');
                $(element).removeClass('error');
            },
            invalidHandler: function(form, validator) {
                $(".validateForm").each(function() {
                    $(this).addClass('invalidForm');
                });
            }
        });

        $(form).on("click", "button", function(event) {
            event.preventDefault();

            if($(form).valid()) {
               $('.form-group').each(function(){
                    $(this).not(".forget-password").addClass("has-success").removeClass('has-warning');
               })
            } else {
                if (!v.numberOfInvalids())
                    return;
            }
            return false;
        });
    });
})