//Horizontal Knob
var HorzTime = 0;
var old_Horz = 0;
$(function() {
  $(".Horz_dial").knob({
    'change': function(v) {
      if (old_Horz < v) {
        HorzTime += TimeBase;
      }
      if (old_Horz > v) {
        HorzTime -= TimeBase;
      }
      if (HorzTime < 0) {
        HorzTime = 0;
      }
      old_Horz = v;
      myScope.run();
    }
  });
  $('.Horz_dial').trigger(
    'configure', {
      "min": 0,
      "max": 100,
      "displayInput": false
    }
  );
});

//TimeBase Knob
var TimeBase = 22;
var old_TimeBase = 0;
$(function() {
  $(".TimeBase_dial").knob({
    'change': function(v) {
      myScope.run();
      if (old_TimeBase < v) {
        TimeBase += 1;
      }
      if (old_TimeBase > v) {
        TimeBase -= 1;
      }
      if (TimeBase < 1) {
        TimeBase = 1;
      }
      old_TimeBase = v;
      myScope.run();
    }
  });
  $('.TimeBase_dial').trigger(
    'configure', {
      "min": 0,
      "max": 100,
      "displayInput": false
    }
  );
});
