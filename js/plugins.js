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
      $(".validateForm").each(function() {
        var form = $(this);

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

        var v = form.validate({
            errorElement: "span",
            showErrors: function(errorMap, errorList) {
                if (errorList.length) {
                    var s = errorList.shift();
                    var n = [];
                    n.push(s);
                    this.errorList = n;
                }
                this.defaultShowErrors();
            },
            highlight: function(element) {
                $(element).closest('.form-group').addClass('has-warning');
                $(element).addClass('error');
            },
            unhighlight: function(element) {
                $(element).closest('.form-group').removeClass('has-warning').addClass("has-success");
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
            $(form).valid();
            if($(form).valid()) {
               
            } else {
                if (!v.numberOfInvalids())
                    return;

                v.errorList[0].element.focus();
                if($(v.errorList[0].element).offset().top < 0){
                    $(window).scrollTop( $(v.errorList[0].element).next().offset().top )
                } else {
                    $(window).scrollTop( $(v.errorList[0].element).offset().top )
                }
            }
            return false;
        });

    });
})