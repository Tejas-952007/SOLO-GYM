"use client";

class SystemSFXEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // 1. Micro-chirp for hovering buttons & interactive badges
  public playHover() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1900, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // Graceful fallback
    }
  }

  public playChirp() {
    this.playHover();
  }

  // 2. Sci-fi click for selecting tabs, cards, or quests
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // Graceful fallback
    }
  }

  // 3. Sub-bass cinematic boom (808 drop) for System Notice, Awakening & Critical Hits
  public playSubBassBoom() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.75);
    } catch {
      // Fallback
    }
  }

  // 4. Sharp Anime Blade Sheathe / Dagger Slice Swoosh
  public playBladeSheathe() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.12);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1800, ctx.currentTime);
      filter.Q.setValueAtTime(4, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // Fallback
    }
  }

  public playBladeSlash() {
    this.playBladeSheathe();
  }

  // 5. Stat Point Allocation Level-up Chime
  public playStatPointAlloc() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C Major arpeggio
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.03);

        gain.gain.setValueAtTime(0.035, ctx.currentTime + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.03 + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.03);
        osc.stop(ctx.currentTime + i * 0.03 + 0.16);
      });
    } catch {
      // Fallback
    }
  }

  // 6. Dungeon Emergency Warning Siren
  public playDungeonAlarm() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.15);
      osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.32);
    } catch {
      // Fallback
    }
  }

  // 7. Ascending harmonic chords for Rank Up or Awakening
  public playRankAscent() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const frequencies = [440, 554.37, 659.25, 880];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.025, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.05 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.32);
      });
    } catch {
      // Fallback
    }
  }

  public playRankUp() {
    this.playRankAscent();
  }

  // 8. Menacing Cartenon God Statue Roar / Deep Subharmonic Resonance
  public playDemonRoar() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + 0.8);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.85);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch {
      // Fallback
    }
  }

  private droneGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneLFO: OscillatorNode | null = null;

  // 9. Synthesized Dark Anime Dungeon Pulse & Bass Drone (42Hz / 55Hz sub-harmonics with rhythmic LFO filter)
  public startAmbientDrone() {
    if (this.isMuted || this.droneGain) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      const lfoGain = ctx.createGain();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(43.65, ctx.currentTime); // F1 sub-bass

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(65.41, ctx.currentTime); // C2 fifth harmony

      // LFO for hypnotic 120 BPM dark anime combat pulse
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(2.0, ctx.currentTime); // 2 Hz = 120 BPM pulse

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(160, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);

      lfoGain.gain.setValueAtTime(60, ctx.currentTime); // Modulate filter cutoff ±60Hz
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 1.5);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      lfo.start();

      this.droneOsc1 = osc1;
      this.droneOsc2 = osc2;
      this.droneLFO = lfo;
      this.droneGain = gain;
    } catch {
      // Fallback
    }
  }

  public stopAmbientDrone() {
    if (!this.droneGain || !this.ctx) return;
    try {
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneLFO?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.droneLFO?.disconnect();
          this.droneGain?.disconnect();
        } catch {
          // ignore
        }
        this.droneOsc1 = null;
        this.droneOsc2 = null;
        this.droneLFO = null;
        this.droneGain = null;
      }, 800);
    } catch {
      this.droneGain = null;
    }
  }
}

export const sfx = new SystemSFXEngine();
