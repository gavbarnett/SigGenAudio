var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var button = document.querySelector('button');
var pre = document.querySelector('pre');
var myScript = document.querySelector('script');



// Stereo
var channels = 1;
// Create an empty mono stereo buffer at the
// sample rate of the AudioContext
var frameCount = audioCtx.sampleRate * 2; //48kHz
console.log(audioCtx.sampleRate);
var myArrayBuffer = audioCtx.createBuffer(channels, frameCount, audioCtx.sampleRate);

function whitenoise() {
    // Fill the buffer with white noise;
    //just random values between -1.0 and 1.0
    for (var channel = 0; channel < channels; channel++) {
        // This gives us the actual array that contains the data
        var nowBuffering = myArrayBuffer.getChannelData(channel);
        for (var i = 0; i < frameCount; i++) {
            nowBuffering[i] = Math.random() * 2 - 1;
        }
    }
    playbuffer(nowBuffering);
}

function FSK(Freq, Loops) {
    console.clear();
    // Fill the buffer with 9k6;
    //just random values between -1.0 and 1.0
    for (var channel = 0; channel < channels; channel++) {
        // This gives us the actual array that contains the data
        var nowBuffering = myArrayBuffer.getChannelData(channel);
        var t = 0;
        var p = 1 / audioCtx.sampleRate;
        var sel = 0;
        var data = "Data:- ";
        var f = Freq[sel];
        for (var i = 0; i < frameCount; i++) {
            if (t >= (Loops / f)) {
                sel = Math.round(Math.random());
                data = data + sel;
                f = Freq[sel];
                t = p;
            }
            nowBuffering[i] = Math.sin(2 * Math.PI * f * t);
            //  console.log(nowBuffering[i]);
            t += p;
        }
    }
    console.log(data);
    playbuffer(nowBuffering);
}

function playbuffer(nowBuffering) {
    for (var i = 0; i < frameCount; i++) {
        nowBuffering[i] = nowBuffering[i] * 0.01;
    }
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioCtx.createBufferSource();
    // set the buffer in the AudioBufferSourceNode
    source.buffer = myArrayBuffer;
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(audioCtx.destination);
    // start the source playing
    source.start();
}
