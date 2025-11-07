import React from 'react';
import { Link } from 'react-router-dom';

const FooterCustom = () => {
  return (
    <footer style={{ background: '#0f272a', color: '#dfeff0', padding: '36px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '0 20px' }}>
        <div style={{ maxWidth: 520 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 64, height: 40, background: '#c43b3b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, borderRadius: 4 }}>WF</div>
            <div>
              <h3 style={{ margin: 0, color: '#fff' }}>WorkshopFlow</h3>
              <p style={{ margin: 0, color: '#cfe8e8' }}>Hands-on workshops and short courses built by students for learners — practical, project-driven, and easy to follow.</p>
            </div>
          </div>

          <p style={{ marginTop: 18, color: '#bcd' }}>
            WorkshopFlow is a student project that demonstrates frontend engineering using React, Vite and modern patterns. Our goal is to create approachable workshops that help learners build real projects quickly.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href="#" style={{ width: 40, height: 40, background: '#e74c3c', color: '#fff', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>♪</a>
            <a href="#" style={{ width: 40, height: 40, background: '#e74c3c', color: '#fff', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>◎</a>
            <a href="#" style={{ width: 40, height: 40, background: '#e74c3c', color: '#fff', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>f</a>
            <a href="#" style={{ width: 40, height: 40, background: '#e74c3c', color: '#fff', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>in</a>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link to="/about" style={{ padding: '10px 14px', background: '#6a1b9a', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>About Us</Link>
            <a href="/" style={{ color: '#cfe8e8', textDecoration: 'underline' }}>Site Notice</a>
            <a href="#" style={{ color: '#cfe8e8', textDecoration: 'underline' }}>Privacy policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCustom;
