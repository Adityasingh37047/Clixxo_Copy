import React, { useState } from 'react';
import { DHCP_SERVER_SETTINGS_FIELDS, DHCP_SERVER_SETTINGS_INITIAL_FORM } from '../constants/DhcpServerSettingsConstants';
import { Checkbox, TextField, Button } from '@mui/material';

const blueBarStyle = {
  width: '100%',
  maxWidth: 1100,
  height: 38,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 60%, #3b8fd6 100%)',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  margin: '0 auto',
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
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',
  padding: '0 0 40px 0',
  minHeight: 320,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderTop: 'none',
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
    alert('Settings saved!');
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-4 flex flex-col items-center">
      <div style={blueBarStyle}>DHCP Server</div>
      <div style={formContainerStyle}>
        <form onSubmit={handleSave} className="w-full flex justify-center pt-6">
          <div className="w-full" style={{ maxWidth: 800 }}>
            {DHCP_SERVER_SETTINGS_FIELDS.map((section, idx) => (
              <div key={section.lan} className="w-full flex flex-col md:flex-row md:items-start mb-8">
                {/* LAN label */}
                <div className="md:w-1/5 w-full flex md:justify-center justify-start items-center mb-2 md:mb-0">
                  <span className="font-semibold text-lg text-gray-700">{section.lan}</span>
                </div>
                {/* Fields */}
                <div className="md:w-4/5 w-full flex flex-col gap-2">
                  {section.fields.map((field, i) => (
                    <div key={field.name} className="flex flex-row items-center mb-1">
                      <div className="w-40 text-base text-gray-800 text-right pr-60 whitespace-nowrap">
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
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8" style={{ width: '100%', maxWidth: 1100 }}>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSave}
          sx={{
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
          }}
        >
          Save
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={handleReset}
          sx={{
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            color: '#fff',
            fontSize: 18,
            px: 6,
            py: 1.5,
            borderRadius: 2,
            minWidth: 120,
            boxShadow: '0 2px 8px #b3e0ff',
            fontWeight: 500,
            ml: 2,
            '&:hover': {
              background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
            },
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default DhcpServerSettings; 