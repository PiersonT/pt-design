
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', business: '', phone: '', email: '',
    service: '', budget: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('https://formspree.io/f/mzepbjbd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: '#13131F',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: '10px',
    padding: '14px 16px',
    color: '#E2E8F0',
    fontSize: '15px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '13px',
    fontWeight: 600,
    color: '#94A3B8',
    marginBottom: '8px',
    letterSpacing: '0.03em',
  };

  return (
    <main style={{ paddingTop: '68px', minHeight: '100vh', background: '#0D0D14' }}>
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '96px', maxWidth: '860px' }}>

        <span className="section-label">Free Quote</span>
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700, color: '#E2E8F0',
          marginBottom: '16px',
        }}>
          Tell us about your project
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '17px', marginBottom: '24px', lineHeight: 1.7 }}>
          Fill out the form below and we'll reach out within 24 hours to talk through your site. No pressure, no commitment.
        </p>

        {/* Free preview banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.08))',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: '12px',
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '48px',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '22px' }}>🎨</span>
          <p style={{ color: '#CBD5E1', fontSize: '15px', lineHeight: 1.6, flex: 1 }}>
            <span style={{
              background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', fontWeight: 700,
            }}>
              We'll build you a free preview
            </span>
            {' '}before you make any decision. You get to see exactly what your site will look like before spending a dime.
          </p>
        </div>

        {submitted ? (
          <div style={{
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '16px',
            padding: '64px 40px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '28px', fontWeight: 700,
              color: '#E2E8F0', marginBottom: '12px',
            }}>
              Got it — we'll be in touch!
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '16px', lineHeight: 1.7 }}>
              Expect a response within 24 hours. We're looking forward to hearing about your business and building your free preview.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            {/* Name + Business */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row">
              <div>
                <label style={labelStyle}>Your Name *</label>
                <input
                  required name="name" value={form.name} onChange={handle}
                  placeholder="John Smith"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Business Name</label>
                <input
                  name="business" value={form.business} onChange={handle}
                  placeholder="Smith's Plumbing"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                />
              </div>
            </div>

            {/* Phone + Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row">
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  required name="phone" value={form.phone} onChange={handle}
                  placeholder="(660) 555-0000" type="tel"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  name="email" value={form.email} onChange={handle}
                  placeholder="john@example.com" type="email"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                />
              </div>
            </div>

            {/* Type of business */}
            <div>
              <label style={labelStyle}>Type of Business *</label>
              <select
                required name="service" value={form.service} onChange={handle}
                style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
              >
                <option value="" disabled>Select your industry...</option>
                <option>Tree Service / Landscaping</option>
                <option>Plumbing / HVAC / Electrical</option>
                <option>Barbershop / Salon</option>
                <option>Construction / Roofing</option>
                <option>Hunting / Outdoor / Recreation</option>
                <option>Auto / Mechanic</option>
                <option>Restaurant / Food</option>
                <option>Retail / Shop</option>
                <option>Other</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label style={labelStyle}>Rough Budget</label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Under $750', '$750 – $1,000', '$1,000 – $1,500', 'Not sure yet'].map(b => (
                  <button
                    key={b} type="button"
                    onClick={() => setForm(prev => ({ ...prev, budget: b }))}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '8px',
                      border: form.budget === b ? '1px solid rgba(124,58,237,0.7)' : '1px solid rgba(255,255,255,0.09)',
                      background: form.budget === b ? 'rgba(124,58,237,0.15)' : 'transparent',
                      color: form.budget === b ? '#A78BFA' : '#94A3B8',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '14px', fontWeight: 500,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>Tell us about your business</label>
              <textarea
                name="message" value={form.message} onChange={handle}
                placeholder="What does your business do? What do you need on the site? Any specific goals?"
                rows={5}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
                onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '10px',
                padding: '14px 18px',
                color: '#FCA5A5',
                fontSize: '14px',
              }}>
                Something went wrong sending your message. Please try again or reach out directly.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ alignSelf: 'flex-start', fontSize: '16px', padding: '16px 36px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Sending...' : 'Send My Quote Request →'}
            </button>

          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
 
