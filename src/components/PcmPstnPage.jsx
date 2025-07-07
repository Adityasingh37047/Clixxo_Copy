import React, { useState } from 'react'
import { PCM_PSTN_FIELDS } from '../constants/PcmPstnConstants'

const initialFormState = PCM_PSTN_FIELDS.reduce((acc, field) => {
  if (field.type === 'checkbox') acc[field.key] = false;
  else if (field.type === 'select') acc[field.key] = field.options[0];
  else acc[field.key] = '';
  return acc;
}, {});

const blueBarStyle = {
  width: 900,
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
};

const inputBlockStyle = {
  width: '260px',
  padding: '7px 8px',
  fontSize: 16,
  border: '1px solid #888',
  borderRadius: 3,
  background: '#fff',
  marginTop: 2,
  marginBottom: 2,
  boxSizing: 'border-box',
};

const checkboxBlockStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: 2,
  marginBottom: 2,
  height: 32,
};

const labelColStyle = {
  flex: 1,
  fontSize: 15,
  textAlign: 'left',
  paddingRight: 32,
  minWidth: 260,
};

const inputColStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  minWidth: 260,
};

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
};

const PcmPstnPage = () => {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (key, value, type) => {
    setForm(prev => ({
      ...prev,
      [key]: type === 'checkbox' ? !prev[key] : value
    }));
  };

  const handleReset = () => setForm(initialFormState);
  const handleSave = () => alert('Saved! (not implemented)');

  return (
    <div style={{ maxWidth: 1100, width: 1100, minHeight: '100vh', margin: '0 auto', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      <div style={{ ...blueBarStyle, borderRadius: '12px 12px 0 0', width: 1100 }}>PSTN Configuration</div>
      <div style={{ width: 1100, background: '#fff', border: '2px solid #888', borderTop: 'none', borderRadius: '0 0 12px 12px', boxShadow: '0 2px 8px #0001', padding: 0 }}>
        <form onSubmit={e => e.preventDefault()} style={{ padding: 32, background: '#fff', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {PCM_PSTN_FIELDS.map(field => (
              <div key={field.key} style={rowStyle}>
                <div style={labelColStyle}>{field.label}</div>
                <div style={inputColStyle}>
                  {field.type === 'select' && (
                    <select value={form[field.key]} onChange={e => handleChange(field.key, e.target.value, field.type)} style={inputBlockStyle}>
                      {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  )}
                  {field.type === 'checkbox' && (
                    <div style={checkboxBlockStyle}>
                      <input type="checkbox" checked={form[field.key]} onChange={() => handleChange(field.key, null, field.type)} style={{ marginRight: 8 }} />
                      <span style={{ fontSize: 15 }}>Enable</span>
                    </div>
                  )}
                  {field.type === 'text' && (
                    <input type="text" value={form[field.key]} onChange={e => handleChange(field.key, e.target.value, field.type)} style={inputBlockStyle} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
          <button type="button" onClick={handleSave} style={{ background: '#3bb6f5', color: '#fff', fontSize: 17, padding: '8px 38px', border: 'none', borderRadius: 4, cursor: 'pointer', boxShadow: '0 2px 4px #3bb6f599' }}>Save</button>
          <button type="button" onClick={handleReset} style={{ background: '#3bb6f5', color: '#fff', fontSize: 17, padding: '8px 38px', border: 'none', borderRadius: 4, cursor: 'pointer', boxShadow: '0 2px 4px #3bb6f599' }}>Reset</button>
        </div>
        <div style={{ color: 'red', textAlign: 'center', marginTop: 18, fontSize: 15, paddingBottom: 16, maxWidth: 900 }}>
          Note 1: In the feature of E1 Outgoing Call Monthly Time Limit, "*" represents all PCMs; once there exist multiple PCMs, they are separated by ",", such as: 1, 2, 3, 4.<br/>
          Note 2: In the feature of E1 Outgoing Call Monthly Time Limit, you can set only one time limit (min) to apply to all the PCMs. If multiple time limits are set, be sure they are as many as corresponding PCMs and separate them by "," too, such as: 1, 3, 4, 6.
        </div>
      </div>
    </div>
  )
}

export default PcmPstnPage 