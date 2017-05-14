var canvassize = [];
var myScope = {
  start: function() {
    this.canvas = document.getElementById('ScopeDisplay');
    //these next two lines fix css blurring canvas
    //http://stackoverflow.com/questions/3991113/html5-canvas-stroke-thick-and-fuzzy
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    canvassize.x = this.canvas.width;
    canvassize.y = this.canvas.height;
    this.context = this.canvas.getContext("2d");
    this.olddata = [0];
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  run: function(data) {
    if (!data) {
      data = this.olddata;
    } else {
      this.olddata = data;
    }
    this.clear();
    var ctx = this.context;
    var scope = [];
    var MaxX = Math.round(1000 * TimeBase);
    //grid
    ctx.strokeStyle = '#777777'; //dark-red
    ctx.lineWidth = 2;
    ctx.shadowBlur = 0;
    //horizontal lines
    h_lines = 6;
    for (var i = 0; i < h_lines; i++) {
      ctx.beginPath();
      ctx.moveTo(0, canvassize.y / h_lines * i);
      ctx.lineTo(canvassize.x, canvassize.y / h_lines * i);
      ctx.stroke();
      //ctx.arc(scope.x, scope.y, 1, 0, 2 * Math.PI);
    }
    //vertical lines
    v_lines = 50;
    for (var i = HorzTime; i < Math.min((MaxX + HorzTime), frameCount); i += TimeBase * v_lines) {
      ctx.beginPath();
      scope.x = (canvassize.x / MaxX * (i - HorzTime));
      scope.y = (-1 * data[i] * canvassize.y / 2 * 1) + (canvassize.y / 2);
      ctx.moveTo(scope.x, 0);
      ctx.lineTo(scope.x, canvassize.y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(0, canvassize.y / 2);
    for (var i = HorzTime; i < Math.min((MaxX + HorzTime), frameCount); i += TimeBase) {
      scope.x = (canvassize.x / MaxX * (i - HorzTime));
      scope.y = (-1 * data[i] * canvassize.y / 2 * 1) + (canvassize.y / 2);
      ctx.lineTo(scope.x, scope.y);
      //ctx.arc(scope.x, scope.y, 1, 0, 2 * Math.PI);
    }
    ctx.strokeStyle = '#20c20e'; //hacker green
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    //ctx.shadowColor = '#dddddd';
    //  ctx.shadowBlur = 3;
    ctx.stroke();
  }
}
