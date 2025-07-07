import React, { useState } from 'react';
import {
  CHANGE_PASSWORD_FIELDS,
  CHANGE_PASSWORD_INITIAL_FORM,
  CHANGE_PASSWORD_BUTTONS,
  CHANGE_PASSWORD_NOTE,
} from '../constants/ChangePasswordConstants';
import Button from '@mui/material/Button';

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
  fontSize: 22,
  color: '#444',
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};
const formContainerStyle = {
  width: '100%',
  maxWidth: 900,
  background: '#fff',
  border: '1px solid #ccc',
  borderRadius: 8,
  margin: '0 auto',
  marginTop: 24,
  marginBottom: 0,
  padding: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',
};
const formTableStyle = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 24px',
  margin: 0,
  padding: 0,
};
const labelTdStyle = {
  textAlign: 'left',
  fontSize: 16,
  color: '#444',
  padding: '12px 18px 8px 32px',
  width: 220,
  fontWeight: 400,
  whiteSpace: 'nowrap',
};
const inputTdStyle = {
  textAlign: 'center',
  padding: '8px 0px 8px 0',
  minWidth: 220,
};
const inputStyle = {
  width: 200,
  maxWidth: '100%',
  fontSize: 15,
  padding: '4px 6px',
  borderRadius: 4,
  border: '1px solid #bbb',
  background: '#fff',
  boxSizing: 'border-box',
};
const buttonSx = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '16px',
  borderRadius: 1.5,
  minWidth: 120,
  px: 2,
  py: 0.5,
  boxShadow: '0 2px 8px #b3e0ff',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
    color: '#fff',
  },
};

const ChangePassword = () => {
  const [form, setForm] = useState(CHANGE_PASSWORD_INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleReset = () => setForm(CHANGE_PASSWORD_INITIAL_FORM);
  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
      <div style={formContainerStyle}>
        <div style={blueBarStyle}>Change Password</div>
        <form style={{ width: '100%' }} onSubmit={handleSave}>
          <table style={formTableStyle}>
            <tbody>
              {CHANGE_PASSWORD_FIELDS.map((field) => (
                <tr key={field.name}>
                  <td style={labelTdStyle}>{field.label}</td>
                  <td style={inputTdStyle}>
                    <input
                      type={field.type === 'password' ? 'text' : field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      style={inputStyle}
                      disabled={field.disabled}
                      autoComplete="off"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      {/* Buttons */}
      <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 32 }}>
        <Button sx={buttonSx} onClick={handleSave}>{CHANGE_PASSWORD_BUTTONS.save}</Button>
        <Button sx={buttonSx} onClick={handleReset}>{CHANGE_PASSWORD_BUTTONS.reset}</Button>
      </div>
      {/* Red Note */}
      <div style={{ color: 'red', fontSize: 18, marginTop: 24, textAlign: 'center', fontWeight: 500 }}>
        {CHANGE_PASSWORD_NOTE}
      </div>
    </div>
  );
};

export default ChangePassword; 