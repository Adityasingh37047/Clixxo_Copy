import React, { useState } from 'react';
import { SIP_SETTINGS_FIELDS, SIP_SETTINGS_NOTE } from '../constants/SipSipConstants';
import Button from '@mui/material/Button';
import { Select, MenuItem, FormControl } from '@mui/material';

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
  fontSize: 18,
  color: '#2266aa',
  paddingLeft: 0,
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};

const formBoxStyle = {
  background: 'transparent',
  borderRadius: 0,
  boxShadow: 'none',
  padding: '0 0 0 0',
  margin: '0 auto',
  width: '100%',
  maxWidth: 1200,
  border: '2px solid #888',
  borderTop: 'none',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  marginTop: 0,
};

const formContentStyle = {
  flex: 1,
  padding: '0 0 24px 0',
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '24px 0',
  paddingLeft: 32,
  paddingRight: 32,
};
const labelStyle = {
  width: 340,
  fontSize: 16,
  color: '#222',
  minWidth: 220,
  textAlign: 'left',
  whiteSpace: 'normal',
  overflow: 'visible',
  textOverflow: 'unset',
};
const inputAreaStyle = {
  width: 350,
  display: 'flex',
  alignItems: 'center',
  marginLeft: 300,
};
const inputStyle = {
  flex: 1.5,
  fontSize: 16,
  padding: '6px 10px',
  borderRadius: 4,
  border: '1px solid #666',
  minWidth: 200,
  maxWidth: 350,
  background: '#e0e3ea',
};
const checkboxStyle = {
  width: 18,
  height: 18,
  marginRight: 8,
  accentColor: '#666',
  border: '1.5px solid #666',
  background: '#e0e3ea',
};
const selectStyle = {
  ...inputStyle,
  minWidth: 200,
  maxWidth: 350,
};

const getInitialState = () => {
  const state = {};
  SIP_SETTINGS_FIELDS.forEach(f => {
    if (f.type === 'select') {
      state[f.key] = f.options[0]; // Set first option as default for select fields
    } else if (f.type === 'checkbox') {
      state[f.key] = f.default || false; // Set checkbox default to false if not specified
    } else if (f.type === 'radio') {
      state[f.key] = f.options[0]; // Set first option as default for radio fields
    } else {
      state[f.key] = f.default || ''; // Set text fields default to empty string if not specified
    }
  });
  return state;
};

const SipSipPage = () => {
  const [form, setForm] = useState(getInitialState());

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckbox = (key) => {
    setForm(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert('Settings saved!');
  };

  const handleReset = () => {
    setForm(getInitialState());
  };

  return (
    <div className="bg-white min-h-screen py-6 px-2 sm:px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto">
        <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center justify-center font-semibold text-lg text-black shadow mb-0">
          SIP Settings
        </div>
        <div className="bg-white border-2 border-gray-400 border-t-0 rounded-b-lg shadow-sm flex flex-col">
          <div className="flex-1 py-6 px-2 sm:px-8">
            {SIP_SETTINGS_FIELDS.map((field, idx) => (
              <div key={field.key} className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0 my-6 px-0 md:px-8">
                <label
                  className={
                    field.key === 'externalBound'
                      ? 'w-full md:w-[340px] min-w-[220px] text-left text-base text-[#222] whitespace-normal overflow-visible text-ellipsis font-medium'
                      : 'w-full md:w-[340px] min-w-[220px] text-left text-base text-[#222] font-medium'
                  }
                >
                  {field.key === 'externalBound'
                    ? (
                        <>When the externally bound is enabled, only the externally bound address is matched to confirm the SIP trunk:</>
                      )
                    : field.label}
                </label>
                {field.type === 'text' && (
                  <div className="w-full md:w-[350px] flex items-center ml-0 md:ml-[300px]">
                    <input
                      type={field.key === 'calledPrefix' ? 'text' : 'number'}
                      value={form[field.key]}
                      className="flex-1.5 text-base px-3 py-1.5 rounded border border-gray-500 min-w-[200px] max-w-[350px] bg-white"
                      onChange={e => {
                        const value = e.target.value;
                        if (field.key === 'calledPrefix') {
                          // Allow only numbers and colons for Called Number Prefix
                          if (/^[0-9:]*$/.test(value) && value.split(':').length <= 6) {
                            handleChange(field.key, value);
                          }
                        } else {
                          // For other number fields, allow only numbers (strict validation)
                          if (/^\d*$/.test(value) || value === '') {
                            handleChange(field.key, value);
                          }
                        }
                      }}
                      onKeyPress={e => {
                        if (field.key !== 'calledPrefix') {
                          // Prevent non-numeric characters for number fields
                          if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'Enter') {
                            e.preventDefault();
                          }
                        } else {
                          // For calledPrefix, allow numbers and colons only
                          if (!/[0-9:]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'Enter') {
                            e.preventDefault();
                          }
                        }
                      }}
                      placeholder={field.key === 'calledPrefix' ? 'e.g., 123:456:789' : ''}
                    />
                  </div>
                )}
                {field.type === 'select' && (
                  <div className="w-full md:w-[350px] flex items-center ml-0 md:ml-[300px]">
                    <FormControl size="small" className="w-full">
                      <Select
                        value={form[field.key]}
                        onChange={e => handleChange(field.key, e.target.value)}
                        fullWidth
                        variant="outlined"
                        sx={{ fontSize: 16 }}
                      >
                        {field.options.map(opt => (
                          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
                {field.type === 'checkbox' && (
                  <div className="w-full md:w-[350px] flex items-center ml-0 md:ml-[300px]">
                    <input
                      type="checkbox"
                      checked={!!form[field.key]}
                      className="w-[18px] h-[18px] mr-2 accent-gray-600 border border-gray-500 bg-white"
                      onChange={() => handleCheckbox(field.key)}
                    />
                    {field.key === 'workingPeriod' ? (
                      field.labelAfter && <span className="text-base ml-2">{field.labelAfter}</span>
                    ) : (
                      <>
                        <span className="text-base ml-1">Enable</span>
                        {field.labelAfter && <span className="text-base ml-2">{field.labelAfter}</span>}
                      </>
                    )}
                  </div>
                )}
                {field.type === 'radio' && (
                  <div className="w-full md:w-[350px] flex items-center ml-0 md:ml-[300px]">
                    <label className="flex items-center text-base">
                      <input
                        type="radio"
                        name={field.key}
                        value="Yes"
                        checked={form[field.key] === 'Yes'}
                        onChange={() => handleChange(field.key, 'Yes')}
                        className="mr-1 accent-gray-600 border border-gray-500 bg-white"
                      />
                      Yes
                    </label>
                    <label className="flex items-center text-base ml-4">
                      <input
                        type="radio"
                        name={field.key}
                        value="No"
                        checked={form[field.key] === 'No'}
                        onChange={() => handleChange(field.key, 'No')}
                        className="mr-1 accent-gray-600 border border-gray-500 bg-white"
                      />
                      No
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-8 mt-8">
          <Button
            variant="contained"
            sx={{
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
            }}
            onClick={handleSave}
          >Save</Button>
          <Button
            variant="contained"
            sx={{
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
            }}
            onClick={handleReset}
          >Reset</Button>
        </div>
        <div className="text-red-600 text-center mt-5 text-base">
          {SIP_SETTINGS_NOTE}
        </div>
      </div>
    </div>
  );
};

export default SipSipPage;
