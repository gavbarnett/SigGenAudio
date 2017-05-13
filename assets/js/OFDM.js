function OFDM(amp, phase, startone, spacing) {
    //console.clear();
    // Fill the buffer with 9k6;
    //just random values between -1.0 and 1.0
    // This gives us the actual array that contains the data
    var nowBuffering = [];
    var t = 0;
    var p = 1 / (audioCtx.sampleRate * oversamplerate);
    var data = "Data:- ";
    var Freq = [];
    var fmax = (((audioCtx.sampleRate) / 2) - startone) / spacing;
    var phasesel, ampsel;
    for (var f = 0; f < fmax; f++) {
        Freq[f] = [];
        Freq[f].freq = startone + f * spacing;
        phasesel = Math.round(Math.random() * (Math.pow(phase, 2) - 1));
        ampsel = Math.round(Math.random() * (Math.pow(amp, 2) - 1));
        data += ("00000000" + phasesel.toString(2)).slice(-1 * phase);
        data += ("00000000" + ampsel.toString(2)).slice(-1 * amp);
        Freq[f].phase = phasesel / (Math.pow(amp, 2) - 1) * 2 * Math.PI;
        Freq[f].amp = ampsel / (Math.pow(amp, 2) - 1);
    }
    var maxBuff = 0;
    var OFDMLength = ((1 / spacing) / (1 / (audioCtx.sampleRate * oversamplerate))) * 1.2;
    for (var i = 0; i < OFDMLength; i++) {
        nowBuffering[i] = 0;
        for (var f = 0; f < Freq.length; f++) {
            nowBuffering[i] += Freq[f].amp * Math.sin(2 * Math.PI * Freq[f].freq * t + Freq[f].phase);
            if (Math.abs(nowBuffering[i]) > maxBuff) {
                maxBuff = Math.abs(nowBuffering[i]);
            }
        }
        t += p;
    }
    console.log(data);
    var Normalised = [];
    Normalised = OFDMnorm(nowBuffering, maxBuff);
    return (Normalised);
}

function FullOFDM(amp, phase, startone, spacing) {
    console.clear();
    var Fullburst = [];
    var numberofbursts = 10;
    Fullburst = FullOFDMBurst(amp, phase, startone, spacing);
    do {
        Fullburst = Fullburst.concat(FullOFDMBurst(amp, phase, startone, spacing));
    }
    while (Fullburst.length < frameCount);
    Fullburst.slice(0, frameCount);
    playbuffer(Fullburst);
}

function FullOFDMBurst(amp, phase, startone, spacing) {
    var nowBuffering = [];
    var AGCTone = [];
    var PauseTone = [];
    var TimingTone = [];
    var cycles = 8;
    var ToneLength = ((1 / startone) / (1 / (audioCtx.sampleRate * oversamplerate))) * cycles;
    //AGCTone
    var t = 0;
    var p = 1 / (audioCtx.sampleRate * oversamplerate);
    for (var i = 0; i < ToneLength; i++) {
        AGCTone[i] = Math.sin(2 * Math.PI * startone * t);
        t += p;
    }
    //PauseTone
    for (var i = 0; i < ToneLength; i++) {
        PauseTone[i] = 0;
    }
    //TimingTone
    var xc = ToneLength / 2;
    var sigma = xc / 2.5;
    var k = 0.5 / Math.pow(sigma, 2);
    var x = 0;
    t = 0;
    var A = 0;
    for (var i = 0; i < ToneLength; i++) {
        A = Math.exp(-1 * Math.pow(x - xc, 2) * k);
        TimingTone[i] = A * Math.sin(2 * Math.PI * startone * t);
        x += 1;
        t += p;
    }
    var OFDMData = OFDM(amp, phase, startone, spacing);
    nowBuffering = AGCTone.concat(PauseTone, TimingTone, PauseTone, OFDMData, PauseTone);
    return (nowBuffering);
}

function OFDM1(amp, phase, startone, spacing) {
    var Fullburst = [];
    var numberofbursts = 10;
    Fullburst = OFDM(amp, phase, startone, spacing);
    do {
        Fullburst = Fullburst.concat(OFDM(amp, phase, startone, spacing));
    }
    while (Fullburst.length < frameCount);
    Fullburst.slice(0, frameCount);
    playbuffer(Fullburst);
    playbuffer(Fullburst);
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
        Freq[f].amp = Math.round(Math.random() * (Math.pow(amp, 2))) / (Math.pow(amp, 2));
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

function OFDMnorm(inputBuffer, maxBuff) {
    var ampbuff = [];
    for (var i = 0; i < inputBuffer.length; i++) {
        ampbuff[i] = inputBuffer[i] / maxBuff;
        //console.log(nowBuffering[i]);
    }
    return ampbuff;
}
