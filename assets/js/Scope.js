var canvassize = [];
var myScope = {
    canvas: document.createElement("canvas"),
    start: function() {
        canvassize.x = window.innerWidth * 0.8;
        canvassize.y = window.innerHeight * 0.3;
        this.canvas.width = canvassize.x;
        this.canvas.height = canvassize.y;
        this.canvas.x = window.innerWidth * 0.2;
        this.canvas.y = window.innerWidth * 0.35;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //updateGameArea();
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
        for (var i = HorzTime; i < Math.min((MaxX + HorzTime), frameCount); i += TimeBase) {
            scope.x = (canvassize.x / MaxX * (i - HorzTime));
            scope.y = (-1 * data[i] * canvassize.y / 2 * 1) + (canvassize.y / 2);
            ctx.lineTo(scope.x, scope.y);
            //ctx.arc(scope.x, scope.y, 1, 0, 2 * Math.PI);
        }
        ctx.strokeStyle = '#20c20e';
        ctx.lineWidth = 1;
        ctx.shadowColor = '#dddddd';
        ctx.shadowBlur = 3;
        ctx.stroke();
    }
}
