'use client';
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function Ambience() {
  const context = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [on, setOn] = useState(false);
  const [error, setError] = useState(false);
  function stop() {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    void context.current?.suspend();
    setOn(false);
  }
  async function toggle() {
    if (on) return stop();
    try {
      const audio = context.current ?? new AudioContext();
      context.current = audio;
      await audio.resume();
      if (audio.state !== 'running') throw new Error('Audio unavailable');
      let note = 0;
      const melody = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66];
      const play = () => {
        const now = audio.currentTime;
        [melody[note++ % melody.length], 130.81].forEach((frequency, i) => {
          const osc = audio.createOscillator();
          const gain = audio.createGain();
          osc.type = 'sine'; osc.frequency.value = frequency;
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(i ? .016 : .055, now + .12);
          gain.gain.exponentialRampToValueAtTime(.0001, now + 3.4);
          osc.connect(gain); gain.connect(audio.destination);
          osc.start(now); osc.stop(now + 3.5);
          osc.onended = () => { osc.disconnect(); gain.disconnect(); };
        });
      };
      play(); timer.current = setInterval(play, 1800);
      setOn(true); setError(false);
    } catch { setError(true); stop(); }
  }
  useEffect(() => {
    const hide = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', hide);
    return () => { document.removeEventListener('visibilitychange', hide); if (timer.current) clearInterval(timer.current); void context.current?.close(); };
  }, []);
  return <div className="sound-control"><button className="sound-button" onClick={toggle} aria-pressed={on} aria-label={on ? 'Turn ambient sound off' : 'Turn ambient sound on'}>{on ? <Volume2 size={16}/> : <VolumeX size={16}/>}<span>{on ? 'Sound on' : 'Sound off'}</span></button>{error && <span className="audio-error" role="status">Sound unavailable. Enjoy it silently.</span>}</div>;
}
