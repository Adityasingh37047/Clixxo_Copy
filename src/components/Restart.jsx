import React from 'react';
import Button from '@mui/material/Button';
import { RESTART_SECTIONS, RESTART_BUTTON_LABEL } from '../constants/RestartConstants';

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
const sectionContainerStyle = {
  width: '100%',
  maxWidth: 1400,
  background: '#fff',
  border: '1px solid #888',
  borderRadius: 8,
  margin: '32px auto',
  padding: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',
};
const contentRowStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '48px 48px',
  gap: 24,
};
const instructionStyle = {
  fontSize: 20,
  color: '#666',
  textAlign: 'center',
  flex: 1,
};
const buttonSx = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '18px',
  borderRadius: 2,
  minWidth: 140,
  minHeight: 48,
  px: 2,
  py: 0.5,
  boxShadow: '0 2px 8px #b3e0ff',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
    color: '#fff',
  },
};

const Restart = () => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
      {RESTART_SECTIONS.map((section) => (
        <div key={section.key} style={sectionContainerStyle}>
          <div style={blueBarStyle}>{section.title}</div>
          <div
            style={{
              ...contentRowStyle,
              flexDirection: window.innerWidth < 600 ? 'column' : 'row',
              padding: window.innerWidth < 600 ? '32px 8px' : '48px 48px',
            }}
          >
            <div style={instructionStyle}>{section.instruction}</div>
            <Button sx={buttonSx}>{RESTART_BUTTON_LABEL}</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Restart; 