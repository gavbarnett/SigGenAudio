function OFDM(amp, phase) {
    console.clear();
    // Fill the buffer with 9k6;
    //just random values between -1.0 and 1.0
    // This gives us the actual array that contains the data
    var nowBuffering = [];
    var t = 0;
    var p = 1 / (audioCtx.sampleRate * oversamplerate);
    var data = "Data:- ";
    var Freq = [];
    var fmax = (((audioCtx.sampleRate) / 5) - 3000) / 100;
    for (var f = 0; f < fmax; f++) {
        Freq[f] = [];
        Freq[f].freq = 3000 + f * 100;
        Freq[f].phase = Math.round(Math.random() * (Math.pow(phase, 2))) / (Math.pow(phase, 2)) * 2 * Math.PI;
        Freq[f].amp = Math.round(Math.random() * (Math.pow(phase, 2))) / (Math.pow(phase, 2));
        //  console.log(Freq[f].amp + " / " + Freq[f].phase);
    }
    var maxBuff = 0;
    for (var i = 0; i < frameCount; i++) {
        nowBuffering[i] = 0;
        for (var f = 0; f < Freq.length; f++) {
            nowBuffering[i] += Freq[f].amp * Math.sin(2 * Math.PI * Freq[f].freq * t + Freq[f].phase);
            if (Math.abs(nowBuffering[i]) > maxBuff) {
                maxBuff = Math.abs(nowBuffering[i])
            }
        }
        t += p;
    }
    //console.log(data);
    playbuffer(OFDMnorm(nowBuffering, maxBuff));
}

function OFDM2(amp, phase) {
    console.clear();
    // Fill the buffer with 9k6;
    //just random values between -1.0 and 1.0
    // This gives us the actual array that contains the data
    var nowBuffering = [];
    var t = 0;
    var p = 1 / (audioCtx.sampleRate * oversamplerate);
    var data = "Data:- ";
    var Freq = [];
    var fmax = (((audioCtx.sampleRate) / 4) - 3000) / 100;
    for (var f = 0; f < fmax; f++) {
        Freq[f] = [];
        Freq[f].freq = 3000 + f * 100;
        Freq[f].phase = Math.round(Math.random() * (Math.pow(phase, 2))) / (Math.pow(phase, 2)) * 2 * Math.PI;
        Freq[f].amp = Math.round(Math.random() * (Math.pow(phase, 2))) / (Math.pow(phase, 2));
        //  console.log(Freq[f].amp + " / " + Freq[f].phase);
    }
    var maxBuff = 0;
    for (var i = 0; i < frameCount; i++) {
        nowBuffering[i] = 0;
        for (var f = 0; f < Math.min((Freq.length / Math.pow(frameCount, 2) * Math.pow(i, 2.2) + 1), Freq.length); f++) {
            nowBuffering[i] += Freq[f].amp * Math.sin(2 * Math.PI * Freq[f].freq * t + Freq[f].phase);
            if (Math.abs(nowBuffering[i]) > maxBuff) {
                maxBuff = Math.abs(nowBuffering[i])
            }
        }
        t += p;
    }
    //console.log(data);
    playbuffer(OFDMnorm(nowBuffering, maxBuff));
}

function OFDMnorm(nowBuffering, maxBuff) {
    for (var i = 0; i < frameCount; i++) {
        nowBuffering[i] /= maxBuff;
        //console.log(nowBuffering[i]);
    }
    return nowBuffering;
}
