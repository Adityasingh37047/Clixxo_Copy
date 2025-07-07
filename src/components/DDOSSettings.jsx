import React, { useState } from 'react';
import { DDOS_FIELDS, DDOS_INITIAL_FORM, DDOS_INFO_LOG } from '../constants/DDOSSettingsConstants';
import { Button, Checkbox, TextField, Select, MenuItem } from '@mui/material';

const blueBarStyle = {
  width: '100%',
  maxWidth: 1100,
  height: 32,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 60%, #3b8fd6 100%)',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  margin: '20px',
  marginBottom: 0,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 20,
  color: '#222',
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};
const formContainerStyle = {
  background: '#fff',
  border: '2px solid #222',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',
  padding: '0 0 32px 0',
  minHeight: 220,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderTop: 'none',
};
const buttonSx = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontSize: 18,
  px: 6,
  py: 1.5,
  borderRadius: 2,
  minWidth: 120,
  boxShadow: '0 2px 8px #b3e0ff',
  fontWeight: 500,
  mr: 2,
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
  },
};

const DDOSSettings = () => {
  const [form, setForm] = useState(DDOS_INITIAL_FORM);
  const [log, setLog] = useState(DDOS_INFO_LOG);

  const handleChange = (key, value, type) => {
    setForm((prev) => ({ ...prev, [key]: type === 'checkbox' ? !prev[key] : value }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    alert('DDOS Settings saved!');
  };
  const handleReset = () => {
    setForm(DDOS_INITIAL_FORM);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-2 md:p-6 flex flex-col items-center">
      <div style={blueBarStyle}>DDOS Settings</div>
      <div style={{...formContainerStyle, minHeight: 600}} className="flex flex-col items-center w-full">
        <form className="w-full flex flex-col items-center" onSubmit={handleSave}>
          <div className="w-full max-w-2xl grid grid-cols-2 gap-x-8 gap-y-4 mt-8 mb-2">
            {DDOS_FIELDS.map((field) => (
              <React.Fragment key={field.key}>
                <div className="flex items-center pr-2 min-h-[38px] text-left">
                  <span className="text-base font-medium text-gray-700">
                    {field.label}
                  </span>
                </div>
                <div className="flex items-center min-h-[38px]">
                  {field.type === 'checkbox' && (
                    <>
                      <Checkbox
                        checked={!!form[field.key]}
                        onChange={() => handleChange(field.key, !form[field.key], 'checkbox')}
                        size="small"
                      />
                      <span className="text-base text-gray-800 ml-1">Enable</span>
                    </>
                  )}
                  {field.type === 'number' && (
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={form[field.key]}
                      onChange={e => handleChange(field.key, Number(e.target.value), 'number')}
                      className="bg-white"
                      sx={{ minWidth: 120, maxWidth: 180 }}
                    />
                  )}
                  {field.type === 'select' && (
                    <Select
                      value={form[field.key]}
                      onChange={e => handleChange(field.key, e.target.value, 'select')}
                      size="small"
                      variant="outlined"
                      className="bg-white"
                      sx={{ minWidth: 160, maxWidth: 220 }}
                    >
                      {field.options.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                      ))}
                    </Select>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-row justify-center gap-8 mt-6 mb-2">
            <Button type="submit" variant="contained" sx={buttonSx}>Save</Button>
            <Button type="button" variant="contained" sx={buttonSx} onClick={handleReset}>Reset</Button>
          </div>
        </form>
        <div className="w-full flex flex-col items-center" style={{ marginTop: 32 }}>
          <div className="text-base font-medium text-gray-700 mb-1 w-full" style={{ maxWidth: 700, textAlign: 'left' }}>Info</div>
          <div style={{ border: '1.5px solid #000', borderRadius: 0, boxShadow: 'none', background: '#fff', padding: 0, width: 700, maxWidth: '90%', display: 'flex', justifyContent: 'center' }}>
            <textarea
              className="bg-white border-none outline-none resize-none"
              style={{ minHeight: 220, maxHeight: 300, width: '100%', fontFamily: 'monospace', fontSize: 15, background: 'white', color: '#222', border: 'none', borderRadius: 0, boxShadow: 'none', padding: 12, whiteSpace: 'pre', overflowY: 'auto' }}
              value={log}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DDOSSettings; 