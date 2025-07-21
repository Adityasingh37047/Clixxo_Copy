import React, { useState } from 'react';
import { NETWORK_SETTINGS_FIELDS, NETWORK_SETTINGS_INITIAL_FORM } from '../constants/NetworkConstants';
import { TextField, Button, Select, MenuItem } from '@mui/material';

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

const Network = () => {
  const [form, setForm] = useState(NETWORK_SETTINGS_INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setForm(NETWORK_SETTINGS_INITIAL_FORM);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Implement save logic here
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] h-10 flex items-center justify-center font-semibold text-lg text-black shadow mb-0 border-t-2 border-x-2 border-gray-400 rounded-t-xl">
          Network Settings
        </div>
        <form onSubmit={handleSave} className="w-full bg-white border-x-2 border-b-2 border-gray-400 rounded-b-xl flex flex-col gap-0 px-2 md:px-8 py-6">
          <div className="w-full max-w-3xl mx-auto">
            {NETWORK_SETTINGS_FIELDS.map((section, idx) => (
              <div key={section.section} className="w-full flex flex-col md:flex-row md:items-start mb-8">
                {/* Section label */}
                <div className="md:w-1/4 w-full flex md:justify-center justify-start items-center mb-2 md:mb-0">
                  <span className="font-bold text-lg text-gray-700 text-left">{section.section}</span>
                </div>
                {/* Fields */}
                <div className="w-full md:w-3/4 flex flex-col gap-2">
                  {section.fields.map((field) => (
                    <div key={field.name} className="flex flex-row items-center mb-1 gap-x-6 md:gap-x-10">
                      <div className="w-56 text-base text-gray-800 text-left pl-2 whitespace-nowrap">
                        {field.label}
                      </div>
                      {field.type === 'select' ? (
                        <Select
                          value={form[field.name]}
                          name={field.name}
                          onChange={handleChange}
                          size="small"
                          variant="outlined"
                          className="bg-white"
                          sx={{ minWidth: 140, maxWidth: 220 }}
                          fullWidth
                        >
                          {field.options.map(opt => (
                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <TextField
                          variant="outlined"
                          size="small"
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          className="bg-white"
                          sx={{ minWidth: 140, maxWidth: 220 }}
                          fullWidth
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </form>
        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8 w-full max-w-3xl mx-auto">
          <Button
            type="submit"
            variant="contained"
            sx={blueButtonSx}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={handleReset}
            sx={blueButtonSx}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Network; 