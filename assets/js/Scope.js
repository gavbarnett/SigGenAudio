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
        ctx.beginPath();
        ctx.moveTo(0, canvassize.y / 2);
        var scope = [];
        var MaxX = Math.round(1000 * TimeBase);
        var HorzTime2 = Math.round(Math.round((HorzTime + HorzTime_mini) / TimeBase) * TimeBase);
        for (var i = HorzTime2; i < Math.min((MaxX + HorzTime2), frameCount); i += TimeBase) {
            scope.x = (canvassize.x / MaxX * (i - HorzTime2));
            scope.y = (-1 * data[i] * canvassize.y / 2 * 1) + (canvassize.y / 2);
            ctx.lineTo(scope.x, scope.y);
            //ctx.arc(scope.x, scope.y, 1, 0, 2 * Math.PI);
        }
        ctx.strokeStyle = '#20c20e';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#dddddd';
        ctx.shadowBlur = 3;
        ctx.stroke();
    }
}
