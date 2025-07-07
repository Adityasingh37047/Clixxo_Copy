import React, { useState } from 'react';
import { DEVICE_LOCK_OPTIONS, DEVICE_LOCK_LABELS } from '../constants/DeviceLockConstants';
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
const labelTdStyle = {
  textAlign: 'left',
  fontSize: 16,
  color: '#444',
  padding: '12px 18px 8px 180px',
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

const DeviceLock = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleReset = () => {
    setSelectedOptions({});
    setPassword('');
    setConfirmPassword('');
  };

  const handleLock = (e) => {
    e.preventDefault();
    // Add lock logic here
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
      <div style={formContainerStyle}>
        <div style={blueBarStyle}>{DEVICE_LOCK_LABELS.title}</div>
        <form style={{ width: '100%' }} onSubmit={handleLock}>
          <div style={{ width: '100%', padding: '32px 0 0 0' }}>
            <div style={{ textAlign: 'left', fontSize: 15, color: '#444', padding: '0 0 24px 32px', fontWeight: 400 }}>
              {DEVICE_LOCK_LABELS.instruction}
            </div>
            {/* Checkbox Row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 80, marginBottom: 40 }}>
              {DEVICE_LOCK_OPTIONS.map((opt) => (
                <label key={opt.value} style={{ display: 'flex', alignItems: 'center', fontSize: 16, color: '#444', fontWeight: 400 }}>
                  <input
                    type="checkbox"
                    checked={!!selectedOptions[opt.value]}
                    onChange={() => handleOptionChange(opt.value)}
                    style={{ marginRight: 8, width: 18, height: 18 }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {/* Password Fields */}
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 24px', margin: 0, padding: 0 }}>
              <tbody>
                <tr>
                  <td style={labelTdStyle}>{DEVICE_LOCK_LABELS.password}</td>
                  <td style={inputTdStyle}>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={inputStyle}
                      autoComplete="off"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={labelTdStyle}>{DEVICE_LOCK_LABELS.confirmPassword}</td>
                  <td style={inputTdStyle}>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={inputStyle}
                      autoComplete="off"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
      {/* Buttons */}
      <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 32 }}>
        <Button sx={buttonSx} onClick={handleLock}>{DEVICE_LOCK_LABELS.lock}</Button>
        <Button sx={buttonSx} onClick={handleReset}>{DEVICE_LOCK_LABELS.reset}</Button>
      </div>
    </div>
  );
};

export default DeviceLock; 