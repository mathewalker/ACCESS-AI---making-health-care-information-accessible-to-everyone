import { useState } from 'react';
import { Activity, ArrowRight, AudioLines, Check, CircleHelp, FileText, Heart, ShieldCheck, Sparkles, Upload, Volume2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function explainDocument(event) {
    event.preventDefault();
    if (!text.trim()) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const response = await fetch(`${API_URL}/api/explain`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not process this information.');
      setResult(data);
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'Could not reach AccessAI. Check that the backend is running.' : err.message);
    } finally { setLoading(false); }
  }

  function speakResult() {
    if (!result || !('speechSynthesis' in window)) return;
    const speech = new SpeechSynthesisUtterance(`${result.summary}. Next steps: ${result.next_steps.join('. ')}. Questions for your care team: ${result.questions.join('. ')}`);
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(speech);
  }

  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#top" aria-label="AccessAI home"><span className="brand-mark"><Heart size={19} fill="currentColor" /></span><span>Access<span className="brand-ai">AI</span></span></a><nav><a href="#how-it-works">How it works</a><a href="#about">About</a></nav><a className="top-cta" href="#try-it">Try AccessAI <ArrowRight size={15}/></a></header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="pulse-dot"/> HEALTH INFORMATION, MADE CLEAR</div><h1>Understand your<br/><span>health information.</span></h1><p className="hero-lead">Medical documents can feel overwhelming. AccessAI helps turn complex language into clear next steps you can discuss with your care team.</p><a className="primary-button" href="#try-it">Make it easier to understand <ArrowRight size={17}/></a><div className="trust-note"><ShieldCheck size={17}/> Built to support understanding, not diagnosis</div></div><div className="hero-art" aria-label="Illustration of a health document being made easier to understand"><div className="orb orb-one"/><div className="orb orb-two"/><div className="paper-card"><div className="paper-top"><span className="paper-icon"><FileText size={19}/></span><span className="tiny-label">YOUR DOCUMENT</span><span className="paper-dot">•••</span></div><div className="paper-lines"><i/><i/><i className="short"/><i/><i className="mid"/></div><div className="transform-arrow"><Sparkles size={17}/></div><div className="clear-card"><div className="clear-title"><span className="check-circle"><Check size={13}/></span> In simple terms</div><p>Take one tablet in the morning with food.</p><div className="clear-tag"><ShieldCheck size={13}/> Ask your pharmacist if unsure</div></div></div><div className="float-chip chip-a"><span className="chip-icon green"><Check size={15}/></span><span><b>Clear next steps</b><small>One step at a time</small></span></div><div className="float-chip chip-b"><span className="chip-icon lavender"><AudioLines size={15}/></span><span><b>Made accessible</b><small>Listen as you read</small></span></div><span className="sparkle s1">✳</span><span className="sparkle s2">✦</span></div></section>
      <section className="proof-strip"><div><span className="proof-icon"><FileText size={18}/></span><span><b>Plain language</b><small>Less medical jargon</small></span></div><div><span className="proof-icon"><Activity size={18}/></span><span><b>Useful details</b><small>Dates, doses, and more</small></span></div><div><span className="proof-icon"><Volume2 size={18}/></span><span><b>Accessible by design</b><small>Read or listen</small></span></div></section>
      <section className="workspace" id="try-it"><div className="section-heading"><div><div className="eyebrow muted">YOUR PERSONAL EXPLAINER</div><h2>A clearer way to read<br/>the details.</h2></div><p>Paste text from a medical document to see an easy-to-read explanation. You can remove names and identifying details first.</p></div><div className="tool-card"><div className="tool-card-head"><div className="tool-title-icon"><FileText size={19}/></div><div><h3>Understand a document</h3><p>Start with text from a prescription, report, or care instructions.</p></div><span className="private-pill"><ShieldCheck size={14}/> Not saved</span></div><form onSubmit={explainDocument}><label htmlFor="document-text">Document text</label><textarea id="document-text" value={text} onChange={e=>setText(e.target.value)} placeholder="Paste the text you'd like help understanding…" rows="6"/><div className="input-footer"><span><CircleHelp size={14}/> Remove personal details before pasting.</span><span>{text.length} characters</span></div><button className="submit-button" type="submit" disabled={loading || !text.trim()}>{loading ? 'Preparing your explanation…' : 'Explain this information'} {!loading && <ArrowRight size={16}/>}</button></form>{error && <div className="error-box" role="alert">{error}</div>}{result && <div className="result-panel" aria-live="polite"><div className="result-head"><div><span className="result-label"><Sparkles size={14}/> YOUR PLAIN-LANGUAGE GUIDE</span><h3>Here’s what it says</h3></div><button className="listen-button" onClick={speakResult}><Volume2 size={16}/> Listen</button></div><p className="result-summary">{result.summary}</p><div className="result-columns"><div><h4>What to do next</h4><ul>{result.next_steps.map((s,i)=><li key={i}><span className="list-check"><Check size={12}/></span>{s}</li>)}</ul></div><div><h4>Ask your care team</h4><ul>{result.questions.map((s,i)=><li key={i}><span className="list-question">?</span>{s}</li>)}</ul></div></div>{result.safety_note && <div className="safety-note"><ShieldCheck size={16}/><span>{result.safety_note}</span></div>}</div>}</div></section>
      <section className="steps-section" id="how-it-works"><div className="eyebrow muted">SIMPLE, SUPPORTIVE, CLEAR</div><h2>Clarity in three steps.</h2><div className="steps-grid"><article><span className="step-number">01</span><div className="step-icon"><Upload size={20}/></div><h3>Share the information</h3><p>Paste document text into the explainer. Remove personal details first.</p></article><article><span className="step-number">02</span><div className="step-icon"><Sparkles size={20}/></div><h3>Get a clearer explanation</h3><p>Key details are rewritten into simpler language and organized for you.</p></article><article><span className="step-number">03</span><div className="step-icon"><Heart size={20}/></div><h3>Prepare for next steps</h3><p>Review reminders and questions to bring to your healthcare provider.</p></article></div></section>
      <section className="disclaimer" id="about"><span className="disclaimer-icon"><ShieldCheck size={19}/></span><div><b>A helpful guide, alongside your care team.</b><p>AccessAI is an information accessibility tool. It does not diagnose conditions or replace advice from a doctor or pharmacist. Always confirm medical decisions with a qualified healthcare professional.</p></div></section>
    </main>
    <footer><a className="brand" href="#top"><span className="brand-mark"><Heart size={17} fill="currentColor"/></span><span>Access<span className="brand-ai">AI</span></span></a><span>Making healthcare information accessible to everyone.</span><span>Team Spartans · CodeGyaan’26</span></footer>
  </div>;
}
