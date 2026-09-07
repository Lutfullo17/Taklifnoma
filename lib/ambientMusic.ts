/**
 * Romantik instrumental fon musiqasi.
 *
 * Ustuvorlik:
 *  1. Agar `/music/wedding.mp3` fayli mavjud boʻlsa — oʻsha ijro etiladi.
 *  2. Aks holda Web Audio API orqali yumshoq pianino uslubidagi
 *     arpeggio + pad real vaqtda sintez qilinadi (hech qanday fayl kerak emas).
 *
 * MUHIM: brauzerlar ovozni faqat foydalanuvchi harakati ichida ochadi va bu
 * "ruxsat oynasi" birinchi `await` da yopiladi. Shuning uchun `startMusicSync()`
 * butunlay SINXRON ishlaydi — AudioContext yoki Audio elementi hodisa
 * ishlovchisi ichida darhol yaratiladi. MP3 bor-yoʻqligi esa oldindan,
 * `prepareMusic()` orqali tekshirib qoʻyiladi.
 */

const TRACK_URL = "/music/wedding.mp3";

/** D-major: I – V – vi – IV */
const PROGRESSION: { bass: number; notes: number[] }[] = [
  { bass: 73.42, notes: [293.66, 369.99, 440.0, 587.33, 440.0, 369.99] }, // D
  { bass: 110.0, notes: [277.18, 329.63, 440.0, 554.37, 440.0, 329.63] }, // A/C#
  { bass: 61.74, notes: [246.94, 293.66, 369.99, 493.88, 369.99, 293.66] }, // Bm
  { bass: 98.0, notes: [293.66, 392.0, 493.88, 587.33, 493.88, 392.0] }, // G
];

const NOTE_LEN = 0.62; // sekund
const NOTES_PER_CHORD = 6;

export type Engine = {
  stop: () => void;
  /** Ovoz haqiqatan chalina boshladimi — brauzer bloklagan boʻlsa `false` */
  ready: Promise<boolean>;
};

/* ------------------------------------------------------------------ */
/*  MP3 mavjudligini oldindan tekshirish (natija keshlanadi)           */
/* ------------------------------------------------------------------ */

let trackAvailable = false;
let prepared: Promise<void> | null = null;

export function prepareMusic(): Promise<void> {
  if (!prepared) {
    prepared = (async () => {
      try {
        const res = await fetch(TRACK_URL, { method: "HEAD" });
        const type = res.headers.get("content-type") ?? "";
        trackAvailable = res.ok && !type.includes("text/html");
      } catch {
        trackAvailable = false;
      }
    })();
  }
  return prepared;
}

/* ------------------------------------------------------------------ */
/*  Web Audio sintezi                                                  */
/* ------------------------------------------------------------------ */

function createReverb(ctx: AudioContext): ConvolverNode {
  const seconds = 2.6;
  const rate = ctx.sampleRate;
  const length = Math.floor(rate * seconds);
  const impulse = ctx.createBuffer(2, length, rate);

  for (let ch = 0; ch < 2; ch += 1) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i += 1) {
      // Eksponensial soʻnuvchi shovqin — yumshoq zal effekti
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.6);
    }
  }

  const convolver = ctx.createConvolver();
  convolver.buffer = impulse;
  return convolver;
}

/** Sintezni ishga tushiradi. Hodisa ishlovchisi ichida sinxron chaqirilishi shart. */
function startSynthSync(volume: number): Engine | null {
  type Ctor = typeof AudioContext;
  const Ctx: Ctor | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext;

  if (!Ctx) return null;

  const ctx = new Ctx();
  // `await` qilmaymiz — foydalanuvchi harakatining ruxsat oynasi yopilmasligi kerak
  const resumed = ctx.resume().catch(() => {});

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, ctx.currentTime);
  master.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 2.2);
  master.connect(ctx.destination);

  const reverb = createReverb(ctx);
  const wet = ctx.createGain();
  wet.gain.value = 0.32;
  reverb.connect(wet);
  wet.connect(master);

  const dry = ctx.createGain();
  dry.gain.value = 0.7;
  dry.connect(master);

  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 2400;
  tone.Q.value = 0.4;
  tone.connect(dry);
  tone.connect(reverb);

  /** Bitta yumshoq nota */
  const pluck = (freq: number, at: number, gain: number) => {
    const osc = ctx.createOscillator();
    const sub = ctx.createOscillator();
    const env = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, at);
    sub.type = "sine";
    sub.frequency.setValueAtTime(freq / 2, at);

    env.gain.setValueAtTime(0.0001, at);
    env.gain.exponentialRampToValueAtTime(gain, at + 0.035);
    env.gain.exponentialRampToValueAtTime(0.0001, at + 2.3);

    osc.connect(env);
    sub.connect(env);
    env.connect(tone);

    osc.start(at);
    sub.start(at);
    osc.stop(at + 2.4);
    sub.stop(at + 2.4);
  };

  /** Pastki pad — chuqurlik beradi */
  const pad = (freq: number, at: number, dur: number) => {
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const env = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, at);
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 1.005, at);

    env.gain.setValueAtTime(0.0001, at);
    env.gain.exponentialRampToValueAtTime(0.09, at + 0.9);
    env.gain.exponentialRampToValueAtTime(0.0001, at + dur);

    osc.connect(env);
    osc2.connect(env);
    env.connect(tone);

    osc.start(at);
    osc2.start(at);
    osc.stop(at + dur + 0.1);
    osc2.stop(at + dur + 0.1);
  };

  let step = 0;
  let nextTime = ctx.currentTime + 0.15;

  const scheduler = window.setInterval(() => {
    // Kelgusi 0.6 sekundlik notalarni oldindan rejalashtiramiz
    while (nextTime < ctx.currentTime + 0.6) {
      const chord =
        PROGRESSION[Math.floor(step / NOTES_PER_CHORD) % PROGRESSION.length];
      const idx = step % NOTES_PER_CHORD;

      if (idx === 0) pad(chord.bass, nextTime, NOTE_LEN * NOTES_PER_CHORD);
      pluck(chord.notes[idx], nextTime, idx === 0 ? 0.13 : 0.085);

      // Yengil aks-sado (echo) hissi uchun oktava yuqorida nozik nota
      if (idx === 3) pluck(chord.notes[idx] * 2, nextTime + 0.28, 0.03);

      nextTime += NOTE_LEN;
      step += 1;
    }
  }, 120);

  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    window.clearInterval(scheduler);
    const t = ctx.currentTime;
    try {
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), t);
      master.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    } catch {
      /* ignore */
    }
    window.setTimeout(() => void ctx.close().catch(() => {}), 1400);
  };

  // Kontekst haqiqatan ochilganini bir necha marta tekshiramiz
  const ready = (async () => {
    await resumed;
    for (let i = 0; i < 6 && ctx.state !== "running"; i += 1) {
      await new Promise((r) => setTimeout(r, 60));
    }
    return ctx.state === "running";
  })();

  return { stop, ready };
}

/* ------------------------------------------------------------------ */
/*  MP3 ijrosi                                                         */
/* ------------------------------------------------------------------ */

function startTrackSync(volume: number): Engine {
  const audio = new Audio(TRACK_URL);
  audio.loop = true;
  audio.volume = 0;
  audio.preload = "auto";

  // `play()` ham sinxron chaqiriladi
  const playing = audio.play();

  let fade = 0;
  let stopped = false;

  const ready = playing
    .then(() => {
      if (stopped) return false;
      const target = Math.min(1, volume * 2.4);
      fade = window.setInterval(() => {
        audio.volume = Math.min(target, audio.volume + 0.02);
        if (audio.volume >= target - 0.001) window.clearInterval(fade);
      }, 90);
      return true;
    })
    .catch(() => false);

  const stop = () => {
    if (stopped) return;
    stopped = true;
    window.clearInterval(fade);
    const out = window.setInterval(() => {
      audio.volume = Math.max(0, audio.volume - 0.03);
      if (audio.volume <= 0.001) {
        window.clearInterval(out);
        audio.pause();
        audio.currentTime = 0;
      }
    }, 60);
  };

  return { stop, ready };
}

/* ------------------------------------------------------------------ */

/**
 * Musiqani yoqadi.
 *
 * Foydalanuvchi harakati (bosish/teginish) ishlovchisi ichida SINXRON
 * chaqirilishi shart — aks holda brauzer ovozni bloklaydi.
 * Qaytgan `engine.ready` ovoz haqiqatan chalina boshlaganini bildiradi.
 */
export function startMusicSync(volume = 0.22): Engine | null {
  if (trackAvailable) return startTrackSync(volume);
  return startSynthSync(volume);
}
