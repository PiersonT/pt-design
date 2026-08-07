
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const logoFilter = 'brightness(0) saturate(100%) invert(32%) sepia(80%) saturate(4000%) hue-rotate(255deg) brightness(90%)';

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: '0 32px',
      height: '90px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'background 0.3s ease, border-bottom 0.3s ease',
      background: scrolled ? 'rgba(13,13,20,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
    }}>

      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img
          src="/logo.png"
          alt="PT Design"
          style={{
            height: '168px',
            width: 'auto',
            objectFit: 'contain',
            filter: logoFilter,
            marginTop: '12px',
          }}
        />
      </Link>

      {/* Desktop Nav */}
      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
        {!isHome ? (
          <Link to="/" style={{
            color: '#94A3B8', fontFamily: 'Inter, sans-serif',
            fontSize: '15px', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: '6px',
            transition: 'color 0.2s', textDecoration: 'none',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#E2E8F0'}
          onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
          >
            ← Back to Home
          </Link>
        ) : (
          <>
            {[
              { label: 'Services', id: 'services' },
              { label: 'Portfolio', id: 'portfolio' },
              { label: 'Pricing', id: 'pricing' },
              { label: 'Process', id: 'process' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none', border: 'none', color: '#94A3B8',
                  fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500,
                  cursor: 'pointer', transition: 'color 0.2s', padding: '4px 0',
                }}
                onMouseEnter={e => e.target.style.color = '#E2E8F0'}
                onMouseLeave={e => e.target.style.color = '#94A3B8'}
              >
                {label}
              </button>
            ))}
          </>
        )}

        {isHome && (
          <Link to="/contact">
            <button style={{
              background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
              color: '#fff', border: 'none', padding: '10px 22px',
              borderRadius: '8px', fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Get a Quote
            </button>
          </Link>
        )}
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer',
          padding: '6px', flexDirection: 'column', gap: '5px',
        }}
        className="hamburger"
        aria-label="Menu"
      >
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: '22px', height: '2px',
            background: '#E2E8F0', borderRadius: '2px',
          }} />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '90px', left: 0, right: 0,
          background: 'rgba(13,13,20,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '24px',
          display: 'flex', flexDirection: 'column', gap: '20px',
        }}>
          {!isHome ? (
            <Link to="/" style={{
              color: '#E2E8F0', fontFamily: 'Inter, sans-serif',
              fontSize: '17px', fontWeight: 500, textDecoration: 'none', padding: '8px 0',
            }}>
              ← Back to Home
            </Link>
          ) : (
            <>
              {[
                { label: 'Services', id: 'services' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'Pricing', id: 'pricing' },
                { label: 'Process', id: 'process' },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    background: 'none', border: 'none', color: '#E2E8F0',
                    fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: 500,
                    cursor: 'pointer', textAlign: 'left', padding: '8px 0',
                  }}
                >
                  {label}
                </button>
              ))}
              <Link to="/contact" style={{ width: '100%' }}>
                <button style={{
                  width: '100%', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                  color: '#fff', border: 'none', padding: '14px',
                  borderRadius: '8px', fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600, fontSize: '16px', cursor: 'pointer',
                }}>
                  Get a Quote
                </button>
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}