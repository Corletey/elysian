import { sitePath } from "../lib/site-path";
import { Home, RefreshCw, Sparkles } from "lucide-react";
import { Component, ReactNode } from "react";
interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props){ super(props); this.state={hasError:false,error:null}; }
  static getDerivedStateFromError(error: Error): State { return {hasError:true,error}; }
  render(){ if(this.state.hasError){ return <div className="runtime-error"><div className="runtime-error-card"><div className="runtime-error-mark"><Sparkles size={21}/></div><p className="eyebrow"><span/> A SMALL PAUSE</p><h1>We’re tending<br /><i>to something.</i></h1><p className="runtime-error-copy">Something unexpected interrupted this page. You can refresh, return home, or reach the Elysian team if you need help.</p><div className="runtime-error-actions"><button className="button button--gold" onClick={()=>window.location.reload()}><RefreshCw size={15}/> Refresh page</button><a className="button button--outline" href={sitePath("/")}><Home size={15}/> Return home</a></div></div></div>; } return this.props.children; }
}
export default ErrorBoundary;
      
