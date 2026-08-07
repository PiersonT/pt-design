import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const logoFilter = 'brightness(0) saturate(100%) invert(32%) sepia(80%) saturate(4000%) hue-rotate(255deg) brightness(90%)';

  return (
    <footer style={{
      background: '#0A0A12',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '64px 24px 32px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '56px',
        }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '16px' }}>
              <img
                src="/logo.png"
                alt="PT Design"
                style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: logoFilter }}
              />
            </Link>
            <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.7', maxWidth: '240px' }}>
              Professional websites built for local businesses that want to be found and trusted online.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
              fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#475569', marginBottom: '20px',
            }}>Navigation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                    fontFamily: 'Inter, sans-serif', fontSize: '14px',
                    cursor: 'pointer', textAlign: 'left', padding: 0,
                    transition: 'color 0.2s', width: 'fit-content',
                  }}
                  onMouseEnter={e => e.target.style.color = '#7C3AED'}
                  onMouseLeave={e => e.target.style.color = '#94A3B8'}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
              fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#475569', marginBottom: '20px',
            }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/contact" style={{
                color: '#94A3B8', fontSize: '14px', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#7C3AED'}
              onMouseLeave={e => e.target.style.color = '#94A3B8'}
              >
                Get a Free Quote
              </Link>
              <a href="mailto:ptichenor03@gmail.com" style={{
                color: '#94A3B8', fontSize: '14px', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#7C3AED'}
              onMouseLeave={e => e.target.style.color = '#94A3B8'}
              >
                ptichenor03@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: '#475569', fontSize: '13px' }}>
            © {new Date().getFullYear()} PT Design. All rights reserved.
          </p>
          <p style={{ color: '#334155', fontSize: '13px' }}>
            Built & designed by PT Design
          </p>
        </div>

      </div>
    </footer>
  );
}
