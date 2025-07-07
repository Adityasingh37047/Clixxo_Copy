import React, { useState } from 'react';
import { VPN_SERVER_SETTINGS_FIELDS, VPN_SERVER_SETTINGS_INITIAL_FORM } from '../constants/VpnServerSettingsConstants';

const blueBarStyle = {
  width: '100%',
  height: 38,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 60%, #3b8fd6 100%)',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  marginBottom: 0,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 18,
  color: '#111',
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};

const formContainerStyle = {
  background: '#fff',
  border: '1.5px solid #222',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  width: '90%',
  maxWidth: 1100,
  margin: '0 auto 0 auto',
  padding: '0 0 40px 0',
  minHeight: 320,
  display: 'flex',
  flexDirection: 'column',
};

const formRowStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '32px 0 0 0',
  width: '100%',
  justifyContent: 'center',
};

const labelColStyle = {
  width: 260,
  textAlign: 'left',
  fontSize: 18,
  color: '#222',
  fontWeight: 500,
  paddingRight: 70,
  lineHeight: 2.2,
};

const inputColStyle = {
  width: 320,
  textAlign: 'left',
  fontSize: 18,
  color: '#222',
  fontWeight: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
};

const inputStyle = {
  width: '100%',
  fontSize: 18,
  padding: '7px 10px',
  borderRadius: 4,
  border: '1px solid #bbb',
  background: '#fff',
};

const selectStyle = {
  ...inputStyle,
  minHeight: 38,
};

const checkboxStyle = {
  width: 22,
  height: 22,
  marginLeft: 0,
  marginRight: 8,
};

const buttonBarStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 40,
  marginTop: 32,
};

const buttonStyle = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontSize: 20,
  padding: '10px 48px',
  border: 'none',
  borderRadius: 8,
  boxShadow: '0 2px 8px #b3e0ff',
  cursor: 'pointer',
  fontWeight: 500,
  minWidth: 120,
};

const VpnServerSettings = () => {
  const [form, setForm] = useState(VPN_SERVER_SETTINGS_INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = () => {
    setForm(VPN_SERVER_SETTINGS_INITIAL_FORM);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved!');
  };

  return (
    <div style={{ background: '#fff', minHeight: 'calc(100vh - 128px)', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 1100, maxWidth: '100%', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ ...blueBarStyle, width: '100%' }}>VPN Server Settings</div>
        <form style={{ ...formContainerStyle, width: '100%', margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }} onSubmit={handleSave}>
          <div style={formRowStyle}>
            <div style={labelColStyle}>VPN Server:</div>
            <div style={inputColStyle}>
              <label style={{ display: 'flex', alignItems: 'center', fontWeight: 500, fontSize: 18 }}>
                <input
                  type="checkbox"
                  name="enabled"
                  checked={form.enabled}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
                Enable
              </label>
            </div>
          </div>
          <div style={formRowStyle}>
            <div style={labelColStyle}>VPN Type:</div>
            <div style={inputColStyle}>
              <select
                name="vpnType"
                value={form.vpnType}
                onChange={handleChange}
                style={selectStyle}
              >
                {VPN_SERVER_SETTINGS_FIELDS.find(f => f.name === 'vpnType').options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={formRowStyle}>
            <div style={labelColStyle}>Identity Verification Protocol:</div>
            <div style={inputColStyle}>
              <select
                name="identityProtocol"
                value={form.identityProtocol}
                onChange={handleChange}
                style={selectStyle}
              >
                {VPN_SERVER_SETTINGS_FIELDS.find(f => f.name === 'identityProtocol').options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={formRowStyle}>
            <div style={labelColStyle}>Client IP Range:</div>
            <div style={inputColStyle}>
              <input
                type="text"
                name="clientIpRange"
                value={form.clientIpRange}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={formRowStyle}>
            <div style={labelColStyle}>Preferred WINS Address (Optional):</div>
            <div style={inputColStyle}>
              <input
                type="text"
                name="preferredWINS"
                value={form.preferredWINS}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={formRowStyle}>
            <div style={labelColStyle}>Spare WINS Address (Optional):</div>
            <div style={inputColStyle}>
              <input
                type="text"
                name="spareWINS"
                value={form.spareWINS}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>
        </form>
        <div style={buttonBarStyle}>
          <button type="button" style={buttonStyle} onClick={handleSave}>Save</button>
          <button type="button" style={buttonStyle} onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default VpnServerSettings; 