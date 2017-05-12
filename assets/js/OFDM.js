function OFDM(amp, phase) {
    console.clear();
    // Fill the buffer with 9k6;
    //just random values between -1.0 and 1.0
    for (var channel = 0; channel < channels; channel++) {
        // This gives us the actual array that contains the data
        var nowBuffering = myArrayBuffer.getChannelData(channel);
        var t = 0;
        var p = 1 / audioCtx.sampleRate;
        var data = "Data:- ";
        var Freq = [];
        for (var f = 0; f < 10; f++) {
            Freq[f] = [];
            Freq[f].freq = 3000 + f * 100;
            Freq[f].phase = Math.round(Math.random() * (Math.pow(phase, 2))) / (Math.pow(phase, 2)) * 2 * Math.PI;
            Freq[f].amp = Math.round(Math.random() * (Math.pow(phase, 2))) / (Math.pow(phase, 2));
            //  console.log(Freq[f].amp + " / " + Freq[f].phase);
        }

        for (var i = 0; i < frameCount; i++) {
            nowBuffering[i] = 0;
            for (var f = 0; f < Freq.length; f++) {
                nowBuffering[i] += Freq[f].amp * Math.sin(2 * Math.PI * Freq[f].freq * t + Freq[f].phase);
            }
            t += p;
        }
    }
    //console.log(data);
    playbuffer(OFDMnorm(nowBuffering));
}

function OFDMnorm(nowBuffering) {
    var A = Math.max(...nowBuffering);
    var B = -1 * Math.min(...nowBuffering);
    A = Math.max(A, B);
    for (var i = 0; i < frameCount; i++) {
        nowBuffering[i] /= A;
    }
    return nowBuffering;
}
