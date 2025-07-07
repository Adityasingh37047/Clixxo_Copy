import React, { useState } from 'react';
import { ROUTE_SETTINGS_OPTIONS, ROUTE_SETTINGS_DEFAULTS } from '../constants/RouteRoutingParameterPageConstants';

const RouteRoutingParameterPage = () => {
  const [settings, setSettings] = useState({ ...ROUTE_SETTINGS_DEFAULTS });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // Here you would typically save to backend or localStorage
    alert('Settings saved!');
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 0 }}>
      <div style={{
        background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
        color: '#3a4a5a',
        fontWeight: 400,
        fontSize: 22,
        padding: '6px 0',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: 1100,
        margin: '32px auto 0 auto',
        boxSizing: 'border-box',
        textAlign: 'center',
        boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
      }}>
        Route Settings
      </div>
      <div style={{
        maxWidth: 1100,
        width: 1100,
        margin: '0 auto',
        background: '#fff',
        border: '2px solid #bbb',
        borderTop: 'none',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        boxShadow: '0 2px 8px #0001',
        padding: '48px 0 48px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ width: 600, display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: 18, color: '#444', minWidth: 180 }}>IP Incoming</label>
            <select
              name="ipIncoming"
              value={settings.ipIncoming}
              onChange={handleChange}
              style={{ fontSize: 16, padding: '8px 16px', borderRadius: 6, border: '1px solid #b0c4d9', minWidth: 320 }}
            >
              {ROUTE_SETTINGS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: 18, color: '#444', minWidth: 180 }}>PSTN Incoming</label>
            <select
              name="pstnIncoming"
              value={settings.pstnIncoming}
              onChange={handleChange}
              style={{ fontSize: 16, padding: '8px 16px', borderRadius: 6, border: '1px solid #b0c4d9', minWidth: 320 }}
            >
              {ROUTE_SETTINGS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 24, margin: '32px auto 0 auto', justifyContent: 'center' }}>
        <button
          onClick={handleSave}
          style={{
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            color: '#fff',
            fontSize: 18,
            padding: '7px 38px',
            border: 'none',
            borderRadius: 6,
            boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
            cursor: 'pointer',
            minWidth: 120,
            fontWeight: 600,
            margin: '0 32px',
          }}
        >
          Save
        </button>
        <button
          onClick={() => { setSettings({ ...ROUTE_SETTINGS_DEFAULTS }); setSaved(false); }}
          style={{
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            color: '#fff',
            fontSize: 18,
            padding: '7px 38px',
            border: 'none',
            borderRadius: 6,
            boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
            cursor: 'pointer',
            minWidth: 120,
            fontWeight: 600,
            margin: '0 32px',
          }}
        >
          Reset
        </button>
      </div>
  </div>
  );
};

export default RouteRoutingParameterPage;


