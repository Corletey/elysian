import { useEffect } from "react";
import { Route, Router as RouterContext, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Home, { NotFound } from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Process from "./pages/Process";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import IntendedParents from "./pages/IntendedParents";
import Surrogates from "./pages/Surrogates";
import FAQs from "./pages/FAQs";
const seo:Record<string,{title:string;description:string}>={
  "/":{title:"Elysian Surrogacy | Ethical Surrogacy Support in Nigeria",description:"Safe, ethical, and compassionate support for the journey to parenthood in Nigeria."},
  "/about":{title:"About Elysian Surrogacy | Building Families in Nigeria",description:"Learn about Elysian Surrogacy’s mission, vision, values, and compassionate family-building support."},
  "/services":{title:"Surrogacy & Gamete Shipping Services | Elysian",description:"Explore Elysian’s surrogacy coordination, post-natal support, and hand-carried gamete and embryo shipping services."},
  "/process":{title:"Our Surrogacy Process | Elysian Surrogacy",description:"Understand each step from consultation and matching through delivery and six weeks of post-natal support."},
  "/partners":{title:"Clinical Partners | Elysian Surrogacy",description:"Connected clinical coordination for fertility, obstetric, paediatric, and post-natal care."},
  "/intended-parents":{title:"For Intended Parents | Elysian Surrogacy",description:"A calm, experienced guide through matching, medical coordination, pregnancy, delivery, and parenthood."},
  "/surrogates":{title:"For Surrogates | Elysian Surrogacy",description:"Respectful screening, dedicated support, and professional care for surrogates in Nigeria."},
  "/faqs":{title:"Surrogacy FAQs | Elysian Surrogacy",description:"Clear answers about surrogacy, surrogate support, timing, medical coordination, and gamete shipping."},
  "/contact":{title:"Contact Elysian Surrogacy | Start a Conversation",description:"Contact Elysian Surrogacy to explore family-building support or specialist gamete and embryo shipping."}
};
function SeoManager(){useEffect(()=>{const base=import.meta.env.BASE_URL;const pathname=window.location.pathname.startsWith(base)?`/${window.location.pathname.slice(base.length)}`.replace(/^\/$/,"/"):window.location.pathname;const current=seo[pathname]||seo["/"];document.title=current.title;let meta=document.querySelector('meta[name="description"]');if(meta)meta.setAttribute("content",current.description);},[]);return null;}
function Router(){const base=import.meta.env.BASE_URL==="/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/,"");return <RouterContext base={base}><Switch><Route path="/" component={Home}/><Route path="/about" component={About}/><Route path="/services" component={Services}/><Route path="/process" component={Process}/><Route path="/partners" component={Partners}/><Route path="/intended-parents" component={IntendedParents}/><Route path="/surrogates" component={Surrogates}/><Route path="/faqs" component={FAQs}/><Route path="/contact" component={Contact}/><Route path="/404" component={NotFound}/><Route component={NotFound}/></Switch></RouterContext>}
export default function App(){return <ErrorBoundary><SeoManager/><Router/></ErrorBoundary>}
      
