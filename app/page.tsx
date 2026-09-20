'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Download, Heart, Mail, Play, RotateCcw, Sparkles, X } from 'lucide-react';
import Ambience from './components/Ambience';
import MemoryFilm from './components/MemoryFilm';
import Fireworks from './components/Fireworks';
import { memories, letter } from './content';

export default function Home() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const [selected, setSelected] = useState(1);
  const [photo, setPhoto] = useState<number | null>(null);
  const [film, setFilm] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [wish, setWish] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const [postcardUrl, setPostcardUrl] = useState<string | null>(null);
  const postcardDialog = useRef<HTMLDialogElement>(null);
  const photoDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (photo !== null) photoDialog.current?.showModal(); else photoDialog.current?.close(); }, [photo]);
  useEffect(() => {
    if (photo === null && !film && !postcardUrl) return;
    const old = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = old; };
  }, [photo, film, postcardUrl]);
  useEffect(() => {
    if (postcardUrl) postcardDialog.current?.showModal();
    else postcardDialog.current?.close();
    return () => { if (postcardUrl) URL.revokeObjectURL(postcardUrl); };
  }, [postcardUrl]);
  const move = (step: number) => setSelected(i => (i + step + memories.length) % memories.length);
  async function savePostcard() {
    setDownloading(true); setDownloadError(false);
    try {
      const img = new Image(); img.src = '/images/sunset.webp'; await img.decode();
      const canvas = document.createElement('canvas'); canvas.width = 1600; canvas.height = 1100;
      const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Canvas unavailable');
      ctx.fillStyle = '#211526'; ctx.fillRect(0, 0, 1600, 1100); ctx.drawImage(img, 0, 0, 1600, 900);
      const gradient = ctx.createLinearGradient(0, 450, 0, 1000); gradient.addColorStop(0, '#21152600'); gradient.addColorStop(1, '#211526'); ctx.fillStyle = gradient; ctx.fillRect(0, 450, 1600, 650);
      ctx.textAlign = 'center'; ctx.fillStyle = '#fff5e9'; ctx.font = '64px Georgia'; ctx.fillText('Happy birthday, Pragya.', 800, 910);
      ctx.fillStyle = '#e9c690'; ctx.font = 'italic 36px Georgia'; ctx.fillText('Aaj. Kal. Har janam, tum.', 800, 980);
      ctx.font = '22px Arial'; ctx.fillText('22 September 2026', 800, 1040);
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', .94));
      if (!blob) throw new Error('Could not create postcard');
      setPostcardUrl(URL.createObjectURL(blob));
    } catch { setDownloadError(true); } finally { setDownloading(false); }
  }
  return <MotionConfig reducedMotion="user"><main>
    <a href="#story" className="skip-link">Skip to our story</a>
    <section className="opening" ref={heroRef} aria-label="For Pragya">
      <motion.img className="opening-photo" src="/images/sunset.webp" alt="A cinematic sunset portrait of Pragya and her husband" fetchPriority="high" style={reduced ? undefined : { y: heroY, scale: heroScale }}/>
      <img className="opening-mobile-photo" src="/images/together.webp" alt="Pragya and her husband together at sunset" fetchPriority="high"/>
      <div className="opening-shade"/>
      <header className="topbar"><a href="#" aria-label="Back to the beginning">P <Heart size={14}/> V</a><span>For you, always.</span><span>22 September 2026</span></header>
      <motion.div className="opening-copy" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: .15 }}>
        <p className="eyebrow"><span/> A little universe, just for you</p>
        <h1>Har janam,<br/><em>tum.</em></h1>
        <p className="dedication">Pragya, tumhare saath har pal<br/>meri favourite kahaani hai.</p>
        <div className="hero-actions"><a className="pill primary" href="#story">Chalo, shuru karein <ArrowUpRight size={18}/></a><button className="film-link" onClick={() => setFilm(true)}><span className="play-circle"><Play size={13} fill="currentColor"/></span>Hamari chhoti si film</button></div>
      </motion.div>
      <div className="hero-foot"><Ambience/><a href="#story" className="scroll-link">Thoda sa scroll, thoda sa pyaar <ArrowDown size={15}/></a><span>Made with all my love <Heart size={12}/></span></div>
    </section>

    <section id="story" className="story-section" aria-labelledby="story-title">
      <div className="story-atmosphere" aria-hidden="true"/>
      <div className="intro"><span className="little-star" aria-hidden="true">✧</span><p className="eyebrow">Us, in a few little moments</p><h2 id="story-title">Meri favourite<br/><em>constellation.</em></h2><p>Itne saare taaron ke beech,<br/>meri nazar hamesha tum par rukti hai.</p></div>
      <div className="gallery" aria-label="Our photo constellation">
        <svg className="constellation-lines" viewBox="0 0 1100 400" fill="none" aria-hidden="true"><path d="M90 230 290 140 540 265 800 100 1020 180" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9"/><path d="M120 100Q550 510 1040 65" stroke="currentColor" strokeWidth=".5"/>{[[90,230],[290,140],[540,265],[800,100],[1020,180]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="3" fill="currentColor"/>)}</svg>
        <motion.div className="photo-orbit" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.12} onDragEnd={(_, info) => { if (info.offset.x > 45) move(-1); else if (info.offset.x < -45) move(1); }}>
          {memories.map((memory, i) => {
            let offset = (i - selected + 3) % 3; if (offset === 2) offset = -1;
            return <motion.button key={memory.image} className={`memory-card ${offset === 0 ? 'is-active' : ''}`} animate={{ x: `${offset * 104}%`, rotateY: reduced ? 0 : offset * -16, rotateZ: reduced ? 0 : offset * 5, scale: offset === 0 ? 1 : .82, opacity: offset === 0 ? 1 : .65, zIndex: offset === 0 ? 3 : 1 }} transition={{ type: 'spring', stiffness: 100, damping: 22 }} onClick={() => offset === 0 ? setPhoto(i) : setSelected(i)} aria-label={offset === 0 ? `Open photo: ${memory.title}` : `Select photo: ${memory.title}`}>
              <div className="memory-image"><img src={memory.image} alt={memory.alt} loading="lazy" draggable={false} style={{ objectPosition: memory.position }}/><span className="photo-open"><ArrowUpRight size={20}/></span></div><div className="memory-caption"><span>{memory.subtitle}</span><Heart size={14}/></div>
            </motion.button>;
          })}
        </motion.div>
      </div>
      <div className="gallery-navigation"><button className="icon-button" onClick={() => move(-1)} aria-label="Previous memory"><ChevronLeft size={20}/></button><div className="gallery-dots">{memories.map((m,i)=><button key={m.image} className={selected === i ? 'active' : ''} onClick={() => setSelected(i)} aria-label={`Show memory ${i + 1}`} aria-pressed={selected === i}/>)}</div><button className="icon-button" onClick={() => move(1)} aria-label="Next memory"><ChevronRight size={20}/></button></div>
      <p className="gallery-hint">Ek tasveer chuno. Ek dil ki baat kholo.</p>
    </section>

    <section className="letter-section" aria-labelledby="letter-title">
      <div className="letter-intro"><p className="eyebrow">A little piece of my heart</p><h2 id="letter-title">Kuch baatein,<br/><em>sirf tumhare liye.</em></h2><p>Kabhi kabhi dil ki baat kehne ke liye<br/>ek poori duniya banani padti hai.</p><div className="author"><img src="/images/vaibhav.webp" loading="lazy" alt="Your husband"/><span>Tumhara, hamesha.<small>With all my love</small></span></div></div>
      <div className={`letter-paper ${letterOpen ? 'open' : ''}`}>
        <AnimatePresence mode="wait">{!letterOpen ? <motion.div key="sealed" className="sealed-letter" exit={{ opacity: 0, y: -12 }} transition={{ duration: .3 }}><span className="letter-date">22 September, 2026</span><span className="letter-to">To my Pragya,</span><p>Ek chhoti si chitthi.<br/>Bahut saara pyaar.</p><button className="seal-button" onClick={() => setLetterOpen(true)} aria-label="Open your letter"><Mail size={25}/></button><span className="seal-hint">Tap to open your letter</span></motion.div> : <motion.div key="open" className="opened-letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="letter-date">22 September, 2026</span><h3>Meri pyaari Pragya,</h3>{letter.map(p=><p key={p}>{p}</p>)}<span className="signature">Tumhara, hamesha. ♡</span><button className="text-button" onClick={() => setLetterOpen(false)}>Fold the letter</button></motion.div>}</AnimatePresence>
      </div>
    </section>

    <section id="wish" className={`wish-section ${wish ? 'wished' : ''}`} aria-labelledby="wish-title">
      <img className="night-photo" src="/images/moonlight.webp" alt="" loading="lazy"/><div className="night-shade"/>
      <Fireworks run={wish} reduced={!!reduced}/>
      <div className="wish-content"><p className="eyebrow">The universe is listening</p><AnimatePresence mode="wait"><motion.div key={wish ? 'celebrate' : 'wish'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .6 }}>
        {wish ? <><span className="birthday-star" aria-hidden="true">✧</span><h2 id="wish-title">Happy birthday,<br/><em>Pragya.</em></h2><p>Aaj ka aasmaan bhi tumhare naam.<br/>Tumhari har wish poori ho, meri jaan.</p><span className="forever-line">Aaj. Kal. Har janam, tum.</span></> : <><h2 id="wish-title">Aankhein band karo.<br/><em>Ek wish maango.</em></h2><p>Aaj saare taare tumhare liye hain.<br/>Dil se kuch maango… phir is taare ko chhoo lo.</p><motion.button className="wish-star" whileHover={reduced ? undefined : { scale: 1.1, rotate: 12 }} whileTap={{ scale: .94 }} onClick={() => setWish(n => n + 1)} aria-label="Make my birthday wish"><Sparkles size={44} strokeWidth={1}/></motion.button><span className="wish-instruction">Meri wish ready hai</span></>}
      </motion.div></AnimatePresence><div aria-live="polite" className="sr-only">{wish ? 'Happy birthday, Pragya! Your wish has lit up the sky.' : ''}</div>
      {wish > 0 && <div className="celebration-actions"><button className="pill" onClick={() => setWish(n => n + 1)}><RotateCcw size={16}/>Phir se celebrate karein</button><button className="text-button" onClick={savePostcard} disabled={downloading}><Download size={16}/>{downloading ? 'Saving…' : 'Save this little memory'}</button>{downloadError && <p role="status">Postcard save nahi hua. Please try again.</p>}</div>}
      </div>
      <div className="closing"><Heart size={19} strokeWidth={1}/><p>Ek website khatam ho sakti hai.<br/><em>Hamari kahaani nahi.</em></p><a href="#" className="text-button">Back to our beginning <ArrowUpRight size={14}/></a><span>For Pragya. With every bit of my heart.</span></div>
    </section>

    <dialog ref={photoDialog} className="photo-dialog" onCancel={() => setPhoto(null)} onClose={() => setPhoto(null)} aria-label="A photo and a little love note">
      {photo !== null && <><button autoFocus className="icon-button modal-close" onClick={() => setPhoto(null)} aria-label="Close photo"><X size={22}/></button><img src={memories[photo].image} alt={memories[photo].alt}/><div className="photo-note"><span className="little-star">✧</span><h3>{memories[photo].title}</h3><p>{memories[photo].note}</p><span className="signature">For you, always.</span></div></>}
    </dialog>
    <MemoryFilm open={film} onClose={() => setFilm(false)}/>
    <dialog ref={postcardDialog} className="postcard-dialog" onCancel={() => setPostcardUrl(null)} onClose={() => setPostcardUrl(null)} aria-label="Your birthday postcard">
      {postcardUrl && <><button autoFocus className="icon-button modal-close" onClick={() => setPostcardUrl(null)} aria-label="Close postcard"><X size={22}/></button><img src={postcardUrl} alt="Happy birthday, Pragya. Aaj. Kal. Har janam, tum. September 22, 2026."/><div className="postcard-actions"><a className="pill" href={postcardUrl} download="For-Pragya-with-love.jpg"><Download size={16}/>Download postcard</a><p>Phone par image ko hold karke bhi save kar sakti ho.</p></div></>}
    </dialog>
  </main></MotionConfig>;
}
