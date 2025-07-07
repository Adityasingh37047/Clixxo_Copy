import React from 'react';
import Button from '@mui/material/Button';
import { WARNING_LOG_TITLE, WARNING_LOGS, WARNING_NOTE } from '../constants/WarningInfoConstants';
// import * as XLSX from 'xlsx'; // Uncomment if SheetJS is installed

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
const pageStyle = {
  width: '100%',
  minHeight: 'calc(100vh - 80px)',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '32px 0',
  boxSizing: 'border-box',
};
const contentStyle = {
  width: '100%',
  maxWidth: 900,
  margin: '0 auto',
  padding: 0,
  boxSizing: 'border-box',
};
const textareaStyle = {
  width: '100%',
  minHeight: 220,
  height: 220,
  resize: 'vertical',
  fontSize: 16,
  border: '1px solid #bbb',
  borderTop: 'none',
  background: '#fff',
  padding: 12,
  boxSizing: 'border-box',
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  outline: 'none',
  marginBottom: 0,
};
const buttonRowStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: 32,
  marginBottom: 0,
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
const noteStyle = {
  color: '#e53935',
  textAlign: 'center',
  fontSize: 16,
  marginTop: 32,
  marginBottom: 0,
};

const WarningInfo = () => {
  const handleDownload = () => {
    const csv = 'Warning Log\n' + WARNING_LOGS.map(log => `"${log}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'warning_log.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <div style={blueBarStyle}>{WARNING_LOG_TITLE}</div>
        <textarea
          value={WARNING_LOGS.join('\n')}
          readOnly
          style={textareaStyle}
        />
        <div style={buttonRowStyle}>
          <Button sx={buttonSx} onClick={handleDownload}>Download</Button>
        </div>
        <div style={noteStyle}>{WARNING_NOTE}</div>
      </div>
    </div>
  );
};

export default WarningInfo;