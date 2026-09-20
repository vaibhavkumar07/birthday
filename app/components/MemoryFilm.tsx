'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Pause, Play, RotateCcw, X } from 'lucide-react';
import Fireworks from './Fireworks';

const scenes = [
  { image: '/images/sunset.webp', title: 'Kuch pal…', text: 'hamesha ke liye dil mein reh jaate hain.', pos: '65% 50%' },
  { image: '/images/together.webp', title: 'Aur kuch log…', text: 'hamari poori duniya ban jaate hain.', pos: '50% 50%' },
  { image: '/images/pragya.webp', title: 'Meri duniya, tum.', text: 'Pragya, yeh sab tumhare liye.', pos: '50% 56%' },
  { image: '/images/moonlight.webp', title: 'Happy birthday, Pragya.', text: 'Aaj. Kal. Har janam, tum.', pos: '50% 50%' },
];
export default function MemoryFilm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [seconds, setSeconds] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (open) { setSeconds(0); setPlaying(true); dialog.current?.showModal(); }
    else dialog.current?.close();
  }, [open]);
  useEffect(() => {
    if (!open || !playing || seconds >= 24) return;
    const timer = setInterval(() => { if (!document.hidden) setSeconds(s => Math.min(24, s + .1)); }, 100);
    return () => clearInterval(timer);
  }, [open, playing, seconds >= 24]);
  const index = Math.min(3, Math.floor(seconds / 6));
  const scene = scenes[index];
  return <dialog ref={dialog} className="film-dialog" onCancel={onClose} onClose={onClose} aria-label="A little film for Pragya">
    {open && <div className="film-shell">
      <button autoFocus className="icon-button film-close" onClick={onClose} aria-label="Close film"><X size={22}/></button>
      <div className="film-stage">
        <AnimatePresence mode="wait"><motion.div key={index} className="film-shot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .65 }}>
          <img src={scene.image} alt="" style={{ objectPosition: scene.pos, animationPlayState: playing ? 'running' : 'paused' }} className={index === 2 ? 'film-portrait' : ''}/><div className="film-shade"/><div className="film-caption"><p>For Pragya, with love</p><h2>{scene.title}</h2><span>{scene.text}</span></div>
        </motion.div></AnimatePresence>
        {index === 3 && playing && <Fireworks run={1} reduced={!!reduced}/>}
      </div>
      <div className="film-controls"><button className="icon-button" onClick={() => { if (seconds >= 24) setSeconds(0); setPlaying(seconds >= 24 ? true : !playing); }} aria-label={seconds >= 24 ? 'Replay film' : playing ? 'Pause film' : 'Play film'}>{seconds >= 24 ? <RotateCcw size={20}/> : playing ? <Pause size={20}/> : <Play size={20}/>}</button><div className="film-track" role="progressbar" aria-label="Film progress" aria-valuemin={0} aria-valuemax={24} aria-valuenow={Math.floor(seconds)}><div style={{ width: `${seconds / 24 * 100}%` }}/></div><span>{Math.floor(seconds).toString().padStart(2, '0')} / 24 sec</span></div>
    </div>}
  </dialog>;
}
