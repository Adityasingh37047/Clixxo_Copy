import React, { useState } from 'react';
import { FAX_MODE_OPTIONS, FAX_FORM_INITIAL } from '../constants/FaxFaxConstants';

const containerStyle = {
  background: '#fff',
  minHeight: '100vh',
  padding: 0,
  margin: 0,
};

const panelStyle = {
  maxWidth: 1400,
  margin: '32px auto 0 auto',
  background: 'transparent',
  border: 'none',
  borderRadius: 16,
  boxShadow: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const blueBarStyle = {
  width: '100%',
  maxWidth: 1400,
  background: 'linear-gradient(to bottom, #7cc0f1, #3d92d0)',
  color: '#222',
  fontWeight: 600,
  fontSize: 22,
  textAlign: 'center',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderBottom: '2px solid #d3d3d3',
  padding: '12px 0 8px 0',
  letterSpacing: 0.2,
  marginBottom: 0,
};

const formBoxStyle = {
  border: '2px solid #222',
  borderTop: 'none',
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  background: '#fff',
  width: '100%',
  maxWidth: 1400,
  minHeight: 180,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  margin: '32px 0 24px 0',
  gap: 0,
};

const labelStyle = {
  fontSize: 22,
  color: '#222',
  fontWeight: 600,
  minWidth: 220,
  textAlign: 'right',
  marginRight: 32,
};

const selectStyle = {
  fontSize: 22,
  padding: '8px 24px',
  borderRadius: 6,
  border: '2px solid #888',
  background: '#fff',
  minWidth: 220,
  maxWidth: 260,
  fontWeight: 600,
};

const buttonRowStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 48,
  margin: '32px 0 32px 0',
};

const buttonStyle = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontSize: 22,
  padding: '10px 48px',
  border: 'none',
  borderRadius: 8,
  boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
  cursor: 'pointer',
  minWidth: 160,
  transition: 'background 0.2s, box-shadow 0.2s',
  fontWeight: 700,
};

const buttonGrayStyle = {
  ...buttonStyle,
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
};

const FaxFaxPage = () => {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('fax_params');
    return saved ? JSON.parse(saved) : FAX_FORM_INITIAL;
  });

  const handleChange = (e) => {
    setForm({ ...form, faxMode: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('fax_params', JSON.stringify(form));
    alert('Fax parameters saved!');
  };

  const handleReset = () => {
    setForm(FAX_FORM_INITIAL);
    localStorage.setItem('fax_params', JSON.stringify(FAX_FORM_INITIAL));
  };

  return (
    <div style={containerStyle}>
      <div style={panelStyle}>
        <div style={blueBarStyle}>Fax Parameters</div>
        <div style={formBoxStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 32, marginBottom: 32 }}>
            <label style={{ fontWeight: 500, fontSize: 18, marginRight: 100 }}>Fax Mode</label>
            <select
              style={{ fontSize: 16, padding: '4px 16px', borderRadius: 6, border: '1.5px solid #b0b0b0', minWidth: 320, width: 320 }}
              value={form.faxMode}
              onChange={e => setForm({ ...form, faxMode: e.target.value })}
            >
              {FAX_MODE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Buttons outside the black border */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '32px 0 24px 0' }}>
          <button
            style={{ background: 'linear-gradient(to bottom, #7cc0f1, #3d92d0)', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, padding: '8px 36px', fontSize: 16, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            onClick={handleSave}
          >
            Save
          </button>
          <button
            style={{ background: 'linear-gradient(to bottom, #7cc0f1, #3d92d0)', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, padding: '8px 36px', fontSize: 16, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaxFaxPage;
