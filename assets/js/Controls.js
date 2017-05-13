//<input type="text" value="75" class="Horz_dial">
//<input type="text" value="75" class="TimeBase_dial">

//Horizontal Knob
var HorzTime = 0;
$(function() {
    $(".Horz_dial").knob({
        'change': function(v) {
            HorzTime = frameCount / 100 * v;
            HorzTime = Math.round(Math.round(HorzTime / TimeBase) * TimeBase)
            myScope.run();
        }
    });
    $('.Horz_dial').trigger(
        'configure', {
            "min": 0,
            "max": 100,
            "stopper": false
        }
    );
});

//TimeBase Knob
var TimeBase = 1;
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
