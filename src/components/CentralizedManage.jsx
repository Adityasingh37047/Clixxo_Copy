import React, { useState } from 'react';
import { CENTRALIZED_MANAGE_FIELDS, MANAGEMENT_PLATFORM_OPTIONS, CENTRALIZED_MANAGE_BUTTONS } from '../constants/CentralizedManageConstants';
import { Button, Checkbox, Select, MenuItem } from '@mui/material';

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
const legacyBtn = {
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
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
  },
};

const initialForm = {
  centralizedManage: false,
  notificationSetting: false,
  trapServerPort: '162',
  cpuUsage: '90',
  memoryUsage: '90',
  highCps: '90',
  lowConnRate: '20',
  autoChangeGateway: false,
  managementPlatform: 'DCMS',
  companyName: '',
  gatewayDesc: '',
  snmpServer: '192.168.1.54',
  communityString: 'public',
  authCode: '',
  workingStatus: 'Requesting authentication',
};

const CentralizedManage = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = () => {
    setForm(initialForm);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved!');
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-2 md:p-6 flex flex-col items-center">
      <div style={blueBarStyle}>Centralized Manage</div>
      <div style={formContainerStyle} className="flex flex-col items-center w-full">
        <form onSubmit={handleSave} className="w-full max-w-2xl grid grid-cols-2 gap-x-0 gap-y-4 items-center mt-8 mb-2 px-2 md:px-0">
          {CENTRALIZED_MANAGE_FIELDS.map((field) => (
            <React.Fragment key={field.name}>
              <div className="flex items-center justify-start min-h-[38px]">
                <span className="text-base text-gray-700">{field.label}</span>
              </div>
              <div className="flex items-center min-h-[38px]">
                {field.type === 'checkbox' ? (
                  <>
                    <Checkbox
                      checked={!!form[field.name]}
                      onChange={handleChange}
                      name={field.name}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                    />
                    <span className="ml-1 text-base text-gray-700">Enable</span>
                  </>
                ) : field.type === 'select' ? (
                  <Select
                    value={form[field.name]}
                    onChange={handleChange}
                    name={field.name}
                    size="small"
                    variant="outlined"
                    sx={{ minWidth: 120, maxWidth: 220 }}
                  >
                    {MANAGEMENT_PLATFORM_OPTIONS.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                  </Select>
                ) : field.type === 'static' ? (
                  <span className="text-base text-gray-700">{field.value}</span>
                ) : (
                  <input
                    type={field.name === 'authCode' ? 'text' : 'text'}
                    name={field.name}
                    value={form[field.name] || ''}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-sm px-2 py-1 w-full max-w-xs"
                    placeholder={field.placeholder || ''}
                  />
                )}
              </div>
            </React.Fragment>
          ))}
        </form>
      </div>
      <div className="flex flex-row justify-center gap-8 mt-8 mb-2 w-full">
        <Button type="submit" variant="contained" sx={legacyBtn} onClick={handleSave}>Save</Button>
        <Button type="button" variant="contained" sx={legacyBtn} onClick={handleReset}>Reset</Button>
        <Button variant="contained" sx={legacyBtn}>{CENTRALIZED_MANAGE_BUTTONS[2].label}</Button>
      </div>
    </div>
  );
};

export default CentralizedManage; 