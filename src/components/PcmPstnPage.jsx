import React, { useState } from 'react';
import { PCM_PSTN_FIELDS } from '../constants/PcmPstnConstants';
import { TextField, Select, MenuItem, Checkbox, Button, FormControl, InputLabel, FormControlLabel } from '@mui/material';

const initialFormState = PCM_PSTN_FIELDS.reduce((acc, field) => {
  if (field.type === 'checkbox') acc[field.key] = false;
  else if (field.type === 'select') acc[field.key] = field.options[0];
  else acc[field.key] = '';
  return acc;
}, {});

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
    <div className="min-h-screen py-8 px-2 flex flex-col items-center bg-white">
      <div className="w-full max-w-5xl mx-auto">
        {/* Blue Bar */}
        <div className="rounded-t-lg border-b-2 border-[#888] h-10 flex items-center justify-center font-semibold text-[20px] text-[#222] shadow-sm"
          style={{background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)'}}>
          PSTN Configuration
        </div>
        {/* Card */}
        <div className="border-2 border-[#888] border-t-0 rounded-b-lg bg-white w-full py-8 md:py-12 px-4 md:px-10 flex flex-col gap-6 items-center">
          <form onSubmit={e => e.preventDefault()} className="w-full">
            <div className="flex flex-col gap-4">
            {PCM_PSTN_FIELDS.map(field => (
                <div key={field.key} className="flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-4xl mx-auto">
                  <label className="md:w-1/2 w-full max-w-xs text-[16px] text-gray-800 text-left whitespace-nowrap md:pr-2 mb-1 md:mb-0">{field.label}</label>
                  <div className="md:w-1/2 w-full max-w-xs flex items-center">
                  {field.type === 'select' && (
                      <FormControl size="small" className="w-full">
                        <Select
                          value={form[field.key]}
                          onChange={e => handleChange(field.key, e.target.value, field.type)}
                          fullWidth
                          variant="outlined"
                          sx={{ fontSize: 16 }}
                        >
                          {field.options.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                        </Select>
                      </FormControl>
                  )}
                  {field.type === 'checkbox' && (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={form[field.key]}
                            onChange={() => handleChange(field.key, null, field.type)}
                            sx={{ color: '#6b7280', '&.Mui-checked': { color: '#6b7280' } }}
                          />
                        }
                        label={<span className="text-[15px]">Enable</span>}
                        className="pl-1"
                      />
                  )}
                  {field.type === 'text' && (
                      <TextField
                        type="text"
                        value={form[field.key]}
                        onChange={e => handleChange(field.key, e.target.value, field.type)}
                        size="small"
                        fullWidth
                        variant="outlined"
                        sx={{ fontSize: 16 }}
                      />
                  )}
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
        {/* Buttons and Info */}
        <div className="flex flex-col items-center mt-8 w-full">
          <div className="flex justify-center gap-8 w-full">
            <Button variant="contained" onClick={handleSave} sx={{background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 18, borderRadius: 2, minWidth: 120, minHeight: 40, textTransform: 'none', boxShadow: '0 2px 8px #b3e0ff', '&:hover': {background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)'}}}>Save</Button>
            <Button variant="contained" onClick={handleReset} sx={{background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 18, borderRadius: 2, minWidth: 120, minHeight: 40, textTransform: 'none', boxShadow: '0 2px 8px #b3e0ff', '&:hover': {background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)'}}}>Reset</Button>
        </div>
          <div className="text-red-600 text-center mt-6 text-[15px] pb-4 max-w-2xl">
          Note 1: In the feature of E1 Outgoing Call Monthly Time Limit, "*" represents all PCMs; once there exist multiple PCMs, they are separated by ",", such as: 1, 2, 3, 4.<br/>
          Note 2: In the feature of E1 Outgoing Call Monthly Time Limit, you can set only one time limit (min) to apply to all the PCMs. If multiple time limits are set, be sure they are as many as corresponding PCMs and separate them by "," too, such as: 1, 3, 4, 6.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcmPstnPage; 