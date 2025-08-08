import React, { useState } from 'react';
import { DDOS_FIELDS, DDOS_INITIAL_FORM, DDOS_INFO_LOG } from '../constants/DDOSSettingsConstants';
import { Button, Checkbox, TextField, Select, MenuItem } from '@mui/material';

const blueButtonSx = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: 16,
  borderRadius: 1.5,
  minWidth: 120,
  boxShadow: '0 2px 6px #0002',
  textTransform: 'none',
  px: 3,
  py: 1.5,
  padding: '6px 28px',
  border: '1px solid #0e8fd6',
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
    color: '#fff',
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
    <div className="bg-white min-h-[calc(100vh-80px)] p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* DDOS Settings Section */}
        <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] h-10 flex items-center justify-center font-semibold text-lg text-black shadow mb-0 border-t-2 border-x-2 border-gray-400 rounded-t-xl">
          DDOS Settings
        </div>
        
        <form onSubmit={handleSave} className="w-full bg-white border-x-2 border-b-2 border-gray-400 rounded-b-xl flex flex-col gap-0 px-2 md:px-8 py-6">
          <div className="w-full max-w-3xl mx-auto">
            
            {/* Form Fields Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 mt-4">
              {DDOS_FIELDS.map((field) => (
                <React.Fragment key={field.key}>
                  <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                    {field.label}
                  </div>
                  <div className="flex items-center min-h-[36px]">
                    {field.type === 'checkbox' && (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={!!form[field.key]}
                          onChange={() => handleChange(field.key, !form[field.key], 'checkbox')}
                          size="small"
                        />
                        <span className="text-base text-gray-800">Enable</span>
                      </div>
                    )}
                    {field.type === 'number' && (
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={form[field.key]}
                        onChange={e => handleChange(field.key, Number(e.target.value), 'number')}
                        className="bg-white"
                        sx={{ 
                          minWidth: 120, 
                          maxWidth: 180,
                          '& .MuiOutlinedInput-root': {
                            fontSize: '14px',
                            height: '40px'
                          }
                        }}
                      />
                    )}
                    {field.type === 'select' && (
                      <Select
                        value={form[field.key]}
                        onChange={e => handleChange(field.key, e.target.value, 'select')}
                        size="small"
                        variant="outlined"
                        className="bg-white"
                        sx={{ 
                          minWidth: 160, 
                          maxWidth: 220,
                          '& .MuiOutlinedInput-root': {
                            fontSize: '14px',
                            height: '40px'
                          }
                        }}
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
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 mt-6 mb-6 w-full max-w-3xl mx-auto">
            <Button 
              type="submit" 
              variant="contained" 
              sx={blueButtonSx}
              onClick={handleSave}
              className="w-full sm:w-auto"
            >
              Save
            </Button>
            <Button 
              type="button" 
              variant="contained" 
              sx={blueButtonSx} 
              onClick={handleReset}
              className="w-full sm:w-auto"
            >
              Reset
            </Button>
          </div>

          {/* Info Log Section - Inside the form container */}
          <div className="w-full flex flex-col items-center" style={{ marginTop: 32 }}>
            <div className="text-base font-medium text-gray-700 mb-1 w-full" style={{ maxWidth: 700, textAlign: 'left' }}>Info</div>
            <textarea
              className="w-full min-h-[180px] max-h-[320px] border border-gray-400 rounded bg-white text-[16px] p-2 font-mono resize-y"
              value={log}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DDOSSettings; 