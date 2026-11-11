import { sitePath } from "../lib/site-path";
import { ArrowUpRight, Check, HeartHandshake, Scale, ShieldCheck, Stethoscope, UsersRound } from "lucide-react";

const services = [
  ["01", "Surrogate matching", "Careful matching based on compatibility, values, health status, and personal preferences."],
  ["02", "Surrogate screening", "Rigorous medical, psychological, lifestyle, and background screening."],
  ["03", "Appointment coordination", "Fertility clinic appointments, medical tests, embryo transfers, and check-ups."],
  ["04", "Prenatal support", "Dedicated coordination, regular check-ins, healthcare access, and emotional support."],
  ["05", "Delivery coordination", "Expert coordination and presence at delivery for a smooth, supported experience."],
  ["06", "Six-week post-natal care", "Support for the surrogate’s recovery and the intended parent’s transition into parenthood."],
];

const values = [
  ["Compassion", "Every family’s journey is met with empathy, warmth, and genuine care."],
  ["Integrity", "Full transparency, with no hidden steps, hidden costs, or surprises."],
  ["Ethics", "The highest ethical standards in every match and process."],
  ["Wellbeing", "The health and safety of both surrogate and intended parents is paramount."],
  ["Communication", "Regular, honest updates throughout—you are never left wondering."],
  ["Empowerment", "Fully informed choices for surrogates and intended parents alike."],
];

const stages = ["Initial consultation", "Surrogate matching", "Medical & legal coordination", "Pregnancy support", "Delivery coordination", "Six weeks post-natal"];

function BrandMark() {
  return <a href={sitePath("/")} className="brand-mark"><img className="brand-mark__image" src={sitePath("/images/elysian-family-mark_30135d16.png")} alt="" /><span className="brand-mark__words"><strong>ELYSIAN</strong><em>SURROGACY</em></span></a>;
}

export default function Surrogacy() {
  return <div className="surrogacy-page">
    <header className="site-header site-header--plum"><div className="container header-inner"><BrandMark /><nav className="main-nav"><a href={sitePath("/")}>Gamete shipping</a><a href="#services">Services</a><a href="#journey">Our process</a><a href="#values">Our values</a><a className="nav-cta" href={sitePath("/#start")}>Start a conversation <ArrowUpRight size={15} /></a></nav><a className="mobile-back" href={sitePath("/")}>Back to home</a></div></header>
    <main>
      <section className="surro-hero"><div className="container surro-hero-grid"><div><p className="hero-kicker"><span className="kicker-dot" /> ELYSIAN SURROGACY LIMITED</p><h1>Building families.<br /><i>Changing lives.</i></h1><p>Safe, ethical, and compassionate surrogacy support from first conversation through six weeks after delivery.</p><a className="button button--gold" href={sitePath("/#start")}>Begin your journey <ArrowUpRight size={16} /></a></div><div className="surro-hero-image"><img src={sitePath("/images/elysian-hero-family_d8e25080.jpg")} alt="Intended parents and surrogate sharing a family-building moment" /><span className="image-caption">A trusted surrogacy agency<br />in Port Harcourt, Nigeria</span></div></div></section>
      <section className="surro-intro section-pad"><div className="container surro-intro-grid"><div><p className="eyebrow"><span /> ABOUT ELYSIAN</p><h2>A guide for the<br /><i>whole journey.</i></h2></div><div><p>Elysian Surrogacy Limited is a professional surrogacy agency headquartered in Port Harcourt, Rivers State, Nigeria. We help individuals and couples who dream of parenthood build their families through safe, ethical, and compassionate surrogacy arrangements.</p><p>From the very first conversation to the joyful moment of delivery—and six weeks beyond—Elysian walks every step of the journey with you.</p><div className="surro-stats"><span><b>100%</b> Ethical practice</span><span><b>12+</b> Steps of support</span><span><b>6 wks</b> Post-natal care</span></div></div></div></section>
      <section className="values-section section-pad" id="values"><div className="container values-grid"><div className="values-copy"><p className="eyebrow"><span /> MISSION, VISION & VALUES</p><h2>Care with<br /><i>conviction.</i></h2><p>Our vision is to be Nigeria’s most trusted and compassionate surrogacy agency—a beacon of hope built on transparency, integrity, and unwavering support.</p></div><div className="values-list">{values.map(([title, body]) => <div key={title}><span className="value-icon"><Check size={15} /></span><span><b>{title}</b><small>{body}</small></span></div>)}</div></div></section>
      <section className="services-section section-pad" id="services"><div className="container"><div className="services-heading"><div><p className="eyebrow"><span /> FULL-SPECTRUM SUPPORT</p><h2>Everything you need,<br /><i>held with care.</i></h2></div><p>One dedicated team across matching, medical coordination, emotional support, delivery, and the weeks that follow.</p></div><div className="services-grid">{services.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="screening-section section-pad"><div className="container screening-grid"><div className="screening-image"><img src={sitePath("/images/elysian-clinical-care_cd7c08b3.jpg")} alt="A care coordinator speaking with a prospective surrogate" /><div className="image-badge"><ShieldCheck size={20} /><span>VETTED WITH<br /><b>RIGOUR</b></span></div></div><div><p className="eyebrow"><span /> SURROGATE SCREENING</p><h2>The right match<br /><i>begins with trust.</i></h2><p className="screening-lede">We do not rush matches. Every prospective surrogate is carefully assessed before being presented to intended parents.</p><div className="screening-points"><div><UsersRound size={19} /><span><b>Medical</b><small>Health history and clinical assessment.</small></span></div><div><HeartHandshake size={19} /><span><b>Psychological</b><small>Emotional readiness and support needs.</small></span></div><div><Scale size={19} /><span><b>Legal & lifestyle</b><small>Background, values, and informed consent.</small></span></div><div><Stethoscope size={19} /><span><b>Ongoing care</b><small>Support continues throughout pregnancy and beyond.</small></span></div></div></div></div></section>
      <section className="journey-section section-pad" id="journey"><div className="container"><div className="journey-heading"><p className="eyebrow"><span /> OUR PROCESS</p><h2>A structured journey,<br /><i>never a lonely one.</i></h2><p>Every family is assigned a dedicated Elysian coordinator and a clear path from first hello to six weeks after delivery.</p></div><div className="journey-stages">{stages.map((stage, index) => <div key={stage}><span>{String(index + 1).padStart(2, "0")}</span><b>{stage}</b>{index < stages.length - 1 && <i>→</i>}</div>)}</div></div></section>
      <section className="care-section section-pad"><div className="container care-grid"><div className="care-image"><img src={sitePath("/images/elysian-hands_f3cdeffe.jpg")} alt="Two people holding hands in a gesture of support" /></div><div><p className="eyebrow"><span /> WHY CHOOSE ELYSIAN</p><h2>Deeply human.<br /><i>Professionally held.</i></h2><p>Surrogacy is one of the most significant journeys a family will ever take. Elysian is built to make that journey safe, supported, and deeply human.</p><ul><li><Check /> Local expertise in Port Harcourt and the Nigerian healthcare context</li><li><Check /> End-to-end support through six weeks post-natal</li><li><Check /> Clear milestones, regular updates, and honest answers</li><li><Check /> Dedicated coordinators, medical liaisons, and counselling professionals</li></ul><a className="button button--outline" href={sitePath("/#start")}>Talk to Elysian <ArrowUpRight size={16} /></a></div></div></section>
      <section className="surro-cta"><div className="container"><p className="eyebrow"><span /> BEGIN YOUR ELYSIAN JOURNEY</p><h2>There is a way<br /><i>forward.</i></h2><a className="button button--gold" href={sitePath("/#start")}>Start a conversation <ArrowUpRight size={16} /></a></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-inner"><BrandMark /><p>Building families. Changing lives.</p><span>© 2026 Elysian Surrogacy</span></div></footer>
  </div>;
}
      
