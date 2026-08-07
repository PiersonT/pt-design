import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ─── Reusable card shell ─────────────────────────────── */
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: '#1A1A2E',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      padding: '32px',
      transition: 'border-color 0.25s, transform 0.25s',
      ...style,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      {children}
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };
    el.addEventListener('mousemove', handler);
    return () => el.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '90px',
      }}
    >
      {/* Background keyboard image — always faintly visible */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.04,
        zIndex: 0,
      }} />

      {/* Mouse-tracking reveal layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.18,
        zIndex: 1,
        WebkitMaskImage: `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
        maskImage: `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
      }} />

      {/* Mouse-tracking glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle 350px at ${mousePos.x}% ${mousePos.y}%, rgba(124,58,237,0.22) 0%, rgba(59,130,246,0.10) 50%, transparent 100%)`,
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Ambient center glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-20%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, rgba(59,130,246,0.06) 50%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 2,
        animation: 'pulse 8s ease-in-out infinite',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div style={{ maxWidth: '760px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '32px',
          }}>
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#7C3AED',
              boxShadow: '0 0 8px #7C3AED',
              animation: 'blink 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '13px', fontWeight: 500, color: '#A78BFA',
              letterSpacing: '0.04em',
            }}>
              Professional Web Design for Local Businesses
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#E2E8F0',
            marginBottom: '24px',
          }}>
            Your business deserves a{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              website that works.
            </span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#94A3B8',
            lineHeight: 1.75,
            marginBottom: '40px',
            maxWidth: '580px',
          }}>
            PT Design builds clean, fast websites for trades, service businesses, and local shops —
            so customers can find you, trust you, and call you.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact">
              <button className="btn-primary">
                Get a Free Quote →
              </button>
            </Link>
            <button
              className="btn-outline"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Work
            </button>
          </div>

          <div style={{
            display: 'flex', gap: '32px', flexWrap: 'wrap',
            marginTop: '64px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            {[
              { value: 'Fast', label: 'Turnaround' },
              { value: 'Mobile', label: 'Friendly' },
              { value: 'SEO', label: 'Optimized' },
              { value: 'Google', label: 'Maps Ready' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '22px', fontWeight: 700,
                  background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {value}
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: translate(-20%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-20%, -50%) scale(1.08); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}

/* ─── Services ────────────────────────────────────────── */
function Services() {
  const services = [
    {
      icon: '🖥️',
      title: 'Custom Website Design',
      desc: 'Clean, mobile-friendly websites built from scratch — no templates, no cookie-cutter layouts. Designed to match your business and impress your customers.',
    },
    {
      icon: '📍',
      title: 'Google Maps & Search Visibility',
      desc: 'Get your business showing up when local customers search. We handle Google Business Profile setup and on-page SEO so you get found.',
    },
    {
      icon: '📅',
      title: 'Appointment & Contact Forms',
      desc: "Let customers reach you or book directly through your site. No more missed calls — capture leads 24/7 even when you're on the job.",
    },
    {
      icon: '🚀',
      title: 'Hosting & Launch',
      desc: 'We handle everything from domain setup to going live. Your site will be fast, secure, and running on professional hosting.',
    },
    {
      icon: '🔧',
      title: 'Ongoing Maintenance',
      desc: "Stay on retainer and we'll handle updates, edits, and keeping your site fresh — so you never have to worry about it.",
    },
    {
      icon: '📸',
      title: 'Photo Galleries & Portfolios',
      desc: "Show off your best work with a clean before/after gallery or project portfolio. Let your results speak for themselves.",
    },
  ];

  return (
    <section id="services" style={{ padding: '96px 0', background: '#0A0A12' }}>
      <div className="container">
        <span className="section-label">What We Do</span>
        <h2 className="section-title">Everything your site needs</h2>
        <p className="section-sub" style={{ marginBottom: '56px' }}>
          From design to launch to Google — we cover it all so you can focus on running your business.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {services.map((s) => (
            <Card key={s.title}>
              <div style={{
                width: '48px', height: '48px',
                background: 'rgba(124,58,237,0.12)',
                border: '1px solid rgba(124,58,237,0.2)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', marginBottom: '20px',
              }}>
                {s.icon}
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 600, color: '#E2E8F0', marginBottom: '12px' }}>
                {s.title}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.7' }}>{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Portfolio ───────────────────────────────────────── */
function Portfolio() {
  const projects = [
    {
      name: 'TLC Tree Care',
      category: 'Tree Service',
      desc: 'Full site for a local tree service — service showcase, free estimate form, before/after gallery, and Google Maps integration for their Missouri service area.',
      tags: ['Service Showcase', 'Contact Form', 'Gallery', 'SEO'],
      color: '#16A34A',
      colorBg: 'rgba(22,163,74,0.1)',
      initial: 'TLC',
      url: 'https://tlc-tree-care-j2zi.vercel.app',
    },
    {
      name: 'Whitetail Dimension',
      category: 'Land Prep & Rental',
      desc: 'Hunting land prep and rental business — land rental listings, service pages, trophy photo gallery, and inquiry forms for Missouri and beyond.',
      tags: ['Land Rental', 'Gallery', 'Multi-page', 'Contact'],
      color: '#B45309',
      colorBg: 'rgba(180,83,9,0.1)',
      initial: 'WD',
      url: 'https://whitetail-dimension-kizv.vercel.app',
    },
  ];

  return (
    <section id="portfolio" style={{ padding: '96px 0' }}>
      <div className="container">
        <span className="section-label">Our Work</span>
        <h2 className="section-title">Sites we've built</h2>
        <p className="section-sub" style={{ marginBottom: '56px' }}>
          Real businesses, real results. Every site is built custom for that client's needs.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {projects.map((p) => (
            <div key={p.name} style={{
              background: '#1A1A2E',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'border-color 0.25s, transform 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                height: '180px',
                background: `linear-gradient(135deg, ${p.colorBg}, rgba(13,13,20,0.8))`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
              }}>
                <div style={{
                  width: '72px', height: '72px',
                  background: p.colorBg,
                  border: `2px solid ${p.color}40`,
                  borderRadius: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700, fontSize: '20px', color: p.color,
                }}>
                  {p.initial}
                </div>
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: p.colorBg,
                  border: `1px solid ${p.color}30`,
                  borderRadius: '100px',
                  padding: '4px 12px',
                  fontSize: '12px', fontWeight: 500, color: p.color,
                  fontFamily: 'Space Grotesk, sans-serif',
                }}>
                  {p.category}
                </div>
              </div>
              <div style={{ padding: '28px' }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 600, color: '#E2E8F0', marginBottom: '10px' }}>
                  {p.name}
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{
                      background: 'rgba(124,58,237,0.1)',
                      border: '1px solid rgba(124,58,237,0.2)',
                      borderRadius: '6px', padding: '4px 10px',
                      fontSize: '12px', fontWeight: 500, color: '#A78BFA',
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}>{tag}</span>
                  ))}
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: '#7C3AED', fontSize: '14px', fontWeight: 600,
                  fontFamily: 'Space Grotesk, sans-serif', textDecoration: 'none',
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >
                  View Live Site →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─────────────────────────────────────────── */
function Pricing() {
  return (
    <section id="pricing" style={{ padding: '96px 0', background: '#0A0A12' }}>
      <div className="container">
        <span className="section-label">Pricing</span>
        <h2 className="section-title">Priced for your project</h2>
        <p className="section-sub" style={{ marginBottom: '56px' }}>
          Every business is different, so every quote is too. We talk through what you need and build a price around that — no packages, no guessing.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>

          {/* Base site card */}
          <div style={{
            background: 'linear-gradient(145deg, #1E1040, #1A1A2E)',
            border: '1px solid rgba(124,58,237,0.4)',
            borderRadius: '16px',
            padding: '36px 32px',
            transition: 'transform 0.25s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '48px', height: '48px',
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', marginBottom: '20px',
            }}>🖥️</div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 600, color: '#E2E8F0', marginBottom: '8px' }}>
              Custom Website
            </h3>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '36px', fontWeight: 700, color: '#E2E8F0', marginBottom: '4px', lineHeight: 1 }}>
              $750 <span style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 400 }}>– $1,500</span>
            </div>
            <p style={{ color: '#64748B', fontSize: '13px', marginBottom: '24px' }}>Based on scope — determined at consultation</p>
            <div style={{ height: '1px', background: 'rgba(124,58,237,0.15)', marginBottom: '24px' }} />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {[
                'Custom design built for your brand',
                'Mobile friendly on all devices',
                'Contact & booking forms',
                'Google Maps & Business Profile',
                'SEO setup so you get found',
                'Photo gallery support',
                'Domain & hosting launch',
              ].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{
                    width: '18px', height: '18px', flexShrink: 0,
                    background: 'rgba(124,58,237,0.2)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', color: '#A78BFA', marginTop: '1px',
                  }}>✓</span>
                  <span style={{ color: '#CBD5E1', fontSize: '14px' }}>{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact">
              <button style={{
                width: '100%', padding: '13px', borderRadius: '8px', border: 'none',
                background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                color: '#fff', fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600, fontSize: '15px', cursor: 'pointer', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Get a Free Quote
              </button>
            </Link>
          </div>

          {/* Add-ons column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Database */}
            <div style={{
              background: '#1A1A2E',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '28px 32px',
              transition: 'border-color 0.25s, transform 0.25s', flex: 1,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ fontSize: '22px' }}>🗄️</div>
                <span style={{
                  background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                  borderRadius: '100px', padding: '3px 12px',
                  fontSize: '12px', fontWeight: 600, color: '#60A5FA',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}>ADD-ON</span>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 600, color: '#E2E8F0', marginBottom: '8px' }}>
                Database Integration
              </h3>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, color: '#E2E8F0', marginBottom: '10px', lineHeight: 1 }}>
                +$500
              </div>
              <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.7' }}>
                Need to store customer info, manage bookings, or track orders? We'll build a database into your site so everything is organized and accessible.
              </p>
            </div>

            {/* Retainer */}
            <div style={{
              background: '#1A1A2E',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '28px 32px',
              transition: 'border-color 0.25s, transform 0.25s', flex: 1,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ fontSize: '22px' }}>🔧</div>
                <span style={{
                  background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)',
                  borderRadius: '100px', padding: '3px 12px',
                  fontSize: '12px', fontWeight: 600, color: '#A78BFA',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}>OPTIONAL</span>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 600, color: '#E2E8F0', marginBottom: '8px' }}>
                Monthly Maintenance
              </h3>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, color: '#E2E8F0', marginBottom: '10px', lineHeight: 1 }}>
                $200<span style={{ fontSize: '14px', color: '#64748B', fontWeight: 400 }}>/mo</span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.7' }}>
                Stay on retainer and we handle updates, edits, and keeping your site running smooth — so you never have to think about it.
              </p>
            </div>

          </div>
        </div>

        {/* Consultation callout */}
        <div style={{
          background: 'rgba(59,130,246,0.06)',
          border: '1px solid rgba(59,130,246,0.18)',
          borderRadius: '12px', padding: '20px 28px',
          display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '20px' }}>💬</span>
          <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: 1.6, flex: 1 }}>
            <span style={{ color: '#60A5FA', fontWeight: 600 }}>Not sure what you need?</span> That's what the free consultation is for. We'll figure out the right scope together and give you a clear quote before anything starts.
          </p>
          <Link to="/contact">
            <button style={{
              background: 'transparent', border: '1px solid rgba(59,130,246,0.3)',
              borderRadius: '8px', padding: '10px 20px', color: '#60A5FA',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '14px',
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Book a Free Call →
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ─── Process ─────────────────────────────────────────── */
function Process() {
  const steps = [
    { num: '01', title: 'Free Consultation', desc: 'We talk about your business, your goals, and what you need. No pressure, no commitment — just a conversation to figure out the best plan.' },
    { num: '02', title: 'Design & Build', desc: "We design and build your site from scratch. You'll see progress along the way and can give feedback before anything goes live." },
    { num: '03', title: 'Review & Refine', desc: "You review the finished site and request any changes. We make sure everything looks and works exactly the way you want." },
    { num: '04', title: 'Launch & Get Found', desc: "We launch your site, set up Google Maps and Search, and make sure customers can find you when they're looking for what you offer." },
  ];

  return (
    <section id="process" style={{ padding: '96px 0' }}>
      <div className="container">
        <span className="section-label">How It Works</span>
        <h2 className="section-title">From idea to live site</h2>
        <p className="section-sub" style={{ marginBottom: '64px' }}>
          A straightforward process — no tech jargon, no surprises.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {steps.map((s) => (
            <Card key={s.num}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fontWeight: 700, color: '#7C3AED', letterSpacing: '0.08em', marginBottom: '16px' }}>
                {s.num}
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 600, color: '#E2E8F0', marginBottom: '12px' }}>
                {s.title}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.7' }}>{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─────────────────────────────────────────────── */
function CTA() {
  return (
    <section style={{ padding: '80px 0', background: '#0A0A12' }}>
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1))',
          border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: '24px',
          padding: 'clamp(40px, 6vw, 72px)',
          textAlign: 'center',
        }}>
          <span className="section-label">Ready to Get Started?</span>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#E2E8F0', marginBottom: '16px' }}>
            Let's build something great.
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '17px', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Fill out a quick form and we'll be in touch within 24 hours to talk about your project.
          </p>
          <Link to="/contact">
            <button className="btn-primary" style={{ fontSize: '16px', padding: '16px 36px' }}>
              Get Your Free Quote →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Page Assembly ───────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Pricing />
      <Process />
      <CTA />
    </>
  );
}
