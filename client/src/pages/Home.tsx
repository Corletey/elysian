import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MoveRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const galleryItems = [
  { image: "/images/gallery-team.jpg", alt: "An Elysian care coordinator in a calm office", title: "People behind the support", detail: "A dedicated team, here to listen." },
  { image: "/images/gallery-parents.jpg", alt: "Intended parents in a supportive consultation", title: "A conversation about your journey", detail: "Every family story starts somewhere." },
  { image: "/images/gallery-clinical-team.jpg", alt: "A clinical care team in a bright fertility clinic", title: "Care that stays connected", detail: "Coordination with trusted care teams." },
  { image: "/images/gallery-journey.jpg", alt: "A care coordinator and intended parent reviewing a journey plan", title: "Every milestone, made clearer", detail: "A thoughtful plan for each next step." },
];

function StoryGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [controls, setControls] = useState({ previous: false, next: true, current: 1 });

  const syncControls = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const firstSlide = gallery.querySelector<HTMLElement>(".story-gallery-card");
    const gap = Number.parseFloat(getComputedStyle(gallery).columnGap) || 0;
    const slideWidth = firstSlide?.getBoundingClientRect().width || gallery.clientWidth;
    const current = Math.min(galleryItems.length, Math.max(1, Math.round(gallery.scrollLeft / (slideWidth + gap)) + 1));
    const nextControls = {
      previous: gallery.scrollLeft > 1,
      next: gallery.scrollLeft + gallery.clientWidth < gallery.scrollWidth - 1,
      current,
    };

    setControls((currentControls) => (
      currentControls.previous === nextControls.previous &&
      currentControls.next === nextControls.next &&
      currentControls.current === nextControls.current
        ? currentControls
        : nextControls
    ));
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    syncControls();
    window.addEventListener("resize", syncControls);
    return () => window.removeEventListener("resize", syncControls);
  }, [syncControls]);

  const moveGallery = (direction: -1 | 1) => {
    const gallery = galleryRef.current;
    const firstSlide = gallery?.querySelector<HTMLElement>(".story-gallery-card");
    if (!gallery || !firstSlide) return;

    const gap = Number.parseFloat(getComputedStyle(gallery).columnGap) || 0;
    gallery.scrollBy({ left: direction * (firstSlide.getBoundingClientRect().width + gap), behavior: reduceMotion ? "auto" : "smooth" });
  };

  return <section className="story-gallery section-pad" aria-labelledby="story-gallery-title">
    <div className="container">
      <div className="section-heading story-gallery-heading">
        <div><p className="eyebrow"><span /> A CLOSER LOOK</p><h2 id="story-gallery-title">Care, in every<br /><i>detail.</i></h2></div>
        <div className="story-gallery-tools">
          <p>Meet the people, partnerships, and thoughtful steps behind every Elysian journey.</p>
          <div className="story-gallery-controls">
            <button type="button" className="gallery-control" onClick={() => moveGallery(-1)} disabled={!controls.previous} aria-controls="story-gallery-track" aria-label="Show previous photos"><ArrowLeft size={18} /></button>
            <button type="button" className="gallery-control" onClick={() => moveGallery(1)} disabled={!controls.next} aria-controls="story-gallery-track" aria-label="Show next photos"><ArrowRight size={18} /></button>
            <span className="gallery-status" aria-live="polite" aria-atomic="true">Photo {controls.current} of {galleryItems.length}</span>
          </div>
        </div>
      </div>
      <div
        className="story-gallery-track"
        id="story-gallery-track"
        ref={galleryRef}
        role="region"
        aria-label="Elysian photo gallery"
        aria-roledescription="carousel"
        tabIndex={0}
        onScroll={syncControls}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveGallery(-1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            moveGallery(1);
          }
        }}
      >
        {galleryItems.map((item, index) => <motion.article
          className="story-gallery-card"
          key={item.image}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${galleryItems.length}: ${item.title}`}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.07 }}
        >
          <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
          <div className="story-gallery-caption"><h3>{item.title}</h3><p>{item.detail}</p></div>
        </motion.article>)}
      </div>
      <p className="story-gallery-hint">Swipe or scroll to explore more photos.</p>
    </div>
  </section>;
}

export default function Home() {
  const photoRef = useRef<HTMLDivElement>(null);
  const imageY = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;
    const updatePosition = () => {
      frame = 0;
      const photo = photoRef.current;
      if (!photo) return;

      const { top, height } = photo.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight - top) / (window.innerHeight + height)));
      imageY.set((progress * 2 - 1) * 24);
    };
    const scheduleUpdate = () => {
      if (frame === 0) frame = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [imageY, reduceMotion]);

  return <div className="site-shell"><SiteHeader /><main id="main-content">
    <section className="home-hero"><div className="container home-hero-grid"><div><p className="hero-kicker"><span className="kicker-dot" /> ELYSIAN SURROGACY LIMITED</p><h1>Building families.<br /><i>Changing lives.</i></h1><p>Safe, ethical, and compassionate support for the journey to parenthood—from first conversation through six weeks after delivery.</p><div className="hero-actions"><a className="button button--gold" href="/about">Meet Elysian <ArrowUpRight size={16} /></a><a className="text-link" href="/contact">Start a conversation <MoveRight size={16} /></a></div></div><div className="home-hero-photo" ref={photoRef}><motion.img src="/images/elysian-hero-family_d8e25080.jpg" alt="An intended parent couple and surrogate sharing a family-building moment" style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : 1.12 }} /><span>Port Harcourt · Nigeria</span></div></div></section>
    <section className="home-intro section-pad"><div className="container home-intro-grid"><div><p className="eyebrow"><span /> OUR PROMISE</p><h2>A guide for the<br /><i>whole journey.</i></h2></div><div><p>Elysian is a professional surrogacy agency headquartered in Port Harcourt, Nigeria. We bridge the gap between intended parents who long for a child and surrogates willing to carry that life with love and care.</p><a className="text-link text-link--dark" href="/about">Who we are <ArrowUpRight size={15} /></a></div></div></section>
    <section className="home-cards section-pad"><div className="container"><div className="section-heading"><div><p className="eyebrow"><span /> EXPLORE ELYSIAN</p><h2>Everything you need,<br /><i>held with care.</i></h2></div><p>From surrogacy support to cross-border gamete logistics, one dedicated team helps keep your journey moving.</p></div><div className="home-card-grid"><a href="/services" className="home-card home-card--dark"><span>01</span><h3>Surrogacy<br /><i>support</i></h3><p>Matching, screening, medical coordination, prenatal support, delivery, and six weeks post-natal care.</p><b>Explore services <ArrowUpRight size={15} /></b></a><a href="/services#shipping" className="home-card home-card--image"><img src="/images/elysian-hands_f3cdeffe.jpg" alt="Hands held together in support" /><div><span>02</span><h3>Gamete & embryo<br /><i>shipping</i></h3><p>Hand-carried, never X-rayed transport between Nigeria, Ghana, and the world.</p><b>Explore shipping <ArrowUpRight size={15} /></b></div></a></div></div></section>
    <StoryGallery />
    <section className="home-values section-pad"><div className="container home-values-grid"><div><p className="eyebrow"><span /> THE ELYSIAN DIFFERENCE</p><h2>Built on<br /><i>trust.</i></h2><p>Compassion, integrity, ethics, wellbeing, communication, and empowerment guide everything we do.</p><a className="button button--outline" href="/about#values">Our values <ArrowUpRight size={16} /></a></div><div className="home-value-list"><div><Check /> Local expertise in Port Harcourt and the Nigerian healthcare context</div><div><Check /> Dedicated support from first consultation to six weeks post-natal</div><div><Check /> Clear milestones, regular updates, and honest answers</div><div><Check /> Professional coordinators, medical liaisons, and counselling support</div></div></div></section>
  <section className="choose-path section-pad"><div className="container"><div className="section-heading"><div><p className="eyebrow"><span /> FIND YOUR PATH</p><h2>Start where<br /><i>you are.</i></h2></div><p>Different journeys need different kinds of support. Choose the path that feels closest to yours.</p></div><div className="path-grid"><a href="/intended-parents"><span>01</span><h3>For intended parents <ArrowUpRight size={16}/></h3><p>Understand matching, coordination, and the path to parenthood.</p></a><a href="/surrogates"><span>02</span><h3>For surrogates <ArrowUpRight size={16}/></h3><p>Learn how Elysian protects your wellbeing and supports you.</p></a><a href="/faqs"><span>03</span><h3>Have questions? <ArrowUpRight size={16}/></h3><p>Find clear answers before you begin a conversation.</p></a></div></div></section></main><SiteFooter /></div>;
}

export function NotFound() { return <div className="not-found-editorial"><div className="not-found-orbit not-found-orbit--one"/><div className="not-found-orbit not-found-orbit--two"/><div className="not-found-inner"><a href="/" className="not-found-brand"><img src="/images/elysian-family-mark_30135d16.png" alt=""/><span>ELYSIAN<br/><em>SURROGACY</em></span></a><p className="eyebrow"><span/> A QUIET DETOUR</p><div className="not-found-number">404</div><h1>This page took<br /><i>a different path.</i></h1><p>Let’s get you back to a place that feels more familiar.</p><div className="not-found-actions"><a className="button button--gold" href="/">Return home <ArrowUpRight size={16}/></a><a className="text-link" href="/contact">Speak with Elysian <MoveRight size={16}/></a></div></div></div>; }
      
