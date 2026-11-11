import { sitePath } from "../lib/site-path";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function BrandMark() {
  return <a href={sitePath("/")} className="brand-mark" aria-label="Elysian Surrogacy home"><img className="brand-mark__image" src={sitePath("/images/elysian-family-mark_30135d16.png")} alt="" /><span className="brand-mark__words"><strong>ELYSIAN</strong><em>SURROGACY</em></span></a>;
}

export function SiteHeader({ dark = true }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
  const close = () => setOpen(false);
  return <header className={`${dark ? "site-header site-header--plum" : "site-header site-header--light"}${scrolled ? " is-scrolled" : ""}`}><a className="skip-link" href="#main-content">Skip to main content</a><div className="container header-inner"><BrandMark /><nav id="site-navigation" className={open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation"><a href={sitePath("/about")} onClick={close}>About</a><a href={sitePath("/services")} onClick={close}>Services</a><a href={sitePath("/process")} onClick={close}>Our process</a><a href={sitePath("/partners")} onClick={close}>Partners</a><a href={sitePath("/faqs")} onClick={close}>FAQs</a><a href={sitePath("/services#shipping")} onClick={close}>Gamete shipping</a><a className="nav-cta" href={sitePath("/contact")} onClick={close}>Start a conversation <ArrowUpRight size={15} /></a></nav><button ref={menuToggleRef} className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="site-navigation" aria-expanded={open}>{open ? <X size={22} /> : <Menu size={22} />}</button></div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-inner"><BrandMark /><p>Building families. Changing lives.</p><span>© 2026 Elysian Surrogacy Limited · Port Harcourt, Nigeria</span></div><div className="container footer-links"><a href={sitePath("/about")}>About</a><a href={sitePath("/services")}>Services</a><a href={sitePath("/process")}>Process</a><a href={sitePath("/partners")}>Partners</a><a href={sitePath("/contact")}>Contact</a></div></footer>;
}

export function PageIntro({ eyebrow, title, accent, description, image, imageAlt }: { eyebrow: string; title: string; accent: string; description: string; image?: string; imageAlt?: string }) {
  return <section className="page-intro"><div className="container page-intro-grid"><div><p className="hero-kicker"><span className="kicker-dot" /> {eyebrow}</p><h1>{title}<br /><i>{accent}</i></h1><p>{description}</p></div>{image && <img className="page-intro-photo" src={sitePath(image)} alt={imageAlt || "Elysian Surrogacy"} />}</div></section>;
}
      
