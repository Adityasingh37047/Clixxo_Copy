import React, { useState } from 'react';
import { DHCP_SERVER_SETTINGS_FIELDS, DHCP_SERVER_SETTINGS_INITIAL_FORM } from '../constants/DhcpServerSettingsConstants';
import { Checkbox, TextField, Button } from '@mui/material';

const grayButtonSx = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
  fontWeight: 600,
  fontSize: 15,
  borderRadius: 1.5,
  minWidth: 110,
  boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
  textTransform: 'none',
  px: 2.25,
  py: 1,
  padding: '4px 18px',
  border: '1px solid #bbb',
  '&:hover': {
    background: 'linear-gradient(to bottom, #bfc6d1 0%, #e3e7ef 100%)',
    color: '#222',
  },
};
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

const DhcpServerSettings = () => {
  const [form, setForm] = useState(DHCP_SERVER_SETTINGS_INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = () => {
    setForm(DHCP_SERVER_SETTINGS_INITIAL_FORM);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Implement save logic here
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] h-10 flex items-center justify-center font-semibold text-lg text-black shadow mb-0 border-t-2 border-x-2 border-gray-400 rounded-t-xl">
          DHCP Server
        </div>
        <form onSubmit={handleSave} className="w-full bg-white border-x-2 border-b-2 border-gray-400 rounded-b-xl flex flex-col gap-0 px-2 md:px-8 py-6">
          <div className="w-full max-w-3xl mx-auto">
            {DHCP_SERVER_SETTINGS_FIELDS.map((section, idx) => (
              <div key={section.lan} className="w-full flex flex-col md:flex-row md:items-start mb-8">
                {/* LAN label */}
                <div className="md:w-1/5 w-full flex md:justify-center justify-start items-center mb-2 md:mb-0">
                  <span className="font-semibold text-lg text-gray-700">{section.lan}</span>
                </div>
                {/* Fields */}
                <div className="md:w-4/5 w-full flex flex-col gap-2">
                  {section.fields.map((field, i) => (
                    <div key={field.name} className="flex flex-row items-center mb-1 gap-x-6 md:gap-x-10">
                      <div className="w-40 text-base text-gray-800 text-left pl-2 whitespace-nowrap">
                        {field.type === 'checkbox' ? field.label : field.label}
                      </div>
                      {field.type === 'checkbox' ? (
                        <>
                          <Checkbox
                            checked={form[field.name]}
                            onChange={handleChange}
                            name={field.name}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                          />
                          <span className="ml-1 text-base text-gray-800">Enable</span>
                        </>
                      ) : (
                        <TextField
                          variant="outlined"
                          size="small"
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          className="flex-1 bg-white ml-4"
                          sx={{ minWidth: 140, maxWidth: 220 }}
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

export default DhcpServerSettings; 