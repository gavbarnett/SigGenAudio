//Horizontal Knob
var HorzTime = 0;
var HorzTime_mini = 0;
$(function() {
    $(".Horz_dial").knob({
        'change': function(v) {
            HorzTime = frameCount / 100 * v;
            myScope.run();
        }
    });
    $('.Horz_dial').trigger(
        'configure', {
            "min": 0,
            "max": 100
        }
    );
});
$(function() {
    $(".Horz_dial_mini").knob({
        'change': function(v) {
            HorzTime_mini = (HorzTime / 10) / 100 * v;
            myScope.run();
        }
    });
    $('.Horz_dial_mini').trigger(
        'configure', {
            "min": 0,
            "max": 100
        }
    );
});

//TimeBase Knob
var TimeBase = 22;
$(function() {
    $(".TimeBase_dial").knob({
        'change': function(v) {
            var w = Math.pow(v, 2);
            TimeBase = Math.round(frameCount / (1000 * 10000) * w + 1);
            myScope.run();
        }
    });
    $('.TimeBase_dial').trigger(
        'configure', {
            "min": 1,
            "max": 100
        }
    );
});
