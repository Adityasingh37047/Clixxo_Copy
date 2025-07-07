import React, { useState, useEffect } from 'react';
import { SIP_MEDIA_FIELDS, SIP_MEDIA_CODEC_FIELD, SIP_MEDIA_INITIAL_FORM } from '../constants/SipMediaconstants';

const blueBarStyle = {
  width: '100%',
  height: 36,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  marginBottom: 0,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 20,
  color: '#2266aa',
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
  borderBottom: '2px solid #888',
};
const panelStyle = {
  background: '#fff',
  border: '2px solid #888',
  borderRadius: 8,
  maxWidth: 1100,
  margin: '32px auto 0 auto',
  boxSizing: 'border-box',
  padding: 0,
  position: 'relative',
};
const formBodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '36px 40px 24px 40px',
  background: '#fff',
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
};
const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 18,
  minHeight: 38,
  gap: 280,
};
const labelStyle = {
  width: 340,
  fontSize: 16,
  color: '#222',
  textAlign: 'left',
  marginRight: 0,
  paddingLeft: 150,
  whiteSpace: 'nowrap',
  fontWeight: 400,
};
const inputStyle = {
  fontSize: 16,
  padding: '8px 12px',
  borderRadius: 4,
  border: '1px solid #bbb',
  background: '#fff',
  boxSizing: 'border-box',
  width: 220,
};
const codecRowStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: 32,
  marginBottom: 0,
};
const codecLabelStyle = {
  ...labelStyle,
  fontWeight: 400,
  color: '#444',
  textAlign: 'left',
  width: 340,
};
const buttonRowStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 48,
  padding: '36px 0 36px 0',
};
const buttonStyle = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontSize: 18,
  padding: '7px 38px',
  border: 'none',
  borderRadius: 6,
  boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
  cursor: 'pointer',
  minWidth: 120,
  transition: 'background 0.2s, box-shadow 0.2s',
};
const buttonGrayStyle = {
  ...buttonStyle,
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
};

const SipMediaPage = () => {
  const [formData, setFormData] = useState(SIP_MEDIA_INITIAL_FORM);
  const [savedData, setSavedData] = useState(SIP_MEDIA_INITIAL_FORM);

  // On mount, load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('sipMediaParams');
    if (saved) {
      setFormData(JSON.parse(saved));
      setSavedData(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSavedData(formData);
    localStorage.setItem('sipMediaParams', JSON.stringify(formData));
    alert('Your details are saved');
  };

  const handleReset = () => {
    setFormData(SIP_MEDIA_INITIAL_FORM);
    setSavedData(SIP_MEDIA_INITIAL_FORM);
    localStorage.setItem('sipMediaParams', JSON.stringify(SIP_MEDIA_INITIAL_FORM));
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 0 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: 32 }}>
        <div style={{ ...panelStyle, padding: 0 }}>
          <div style={blueBarStyle}>Media Parameters</div>
          <div style={formBodyStyle}>
            {SIP_MEDIA_FIELDS.map((field) => (
              <div key={field.name} style={rowStyle}>
                <label style={labelStyle}>{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    style={inputStyle}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                )}
              </div>
            ))}
            <div style={rowStyle}>
              <label style={labelStyle}>CODEC Setting</label>
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Gateway Negotiation Coding Sequence</label>
              <select
                name={SIP_MEDIA_CODEC_FIELD.name}
                value={formData[SIP_MEDIA_CODEC_FIELD.name]}
                onChange={handleInputChange}
                style={{ ...inputStyle, width: 300 }}
              >
                {SIP_MEDIA_CODEC_FIELD.options.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div style={buttonRowStyle}>
          <button type="button" style={buttonStyle} onClick={handleSave}>Save</button>
          <button type="button" style={buttonGrayStyle} onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default SipMediaPage;
