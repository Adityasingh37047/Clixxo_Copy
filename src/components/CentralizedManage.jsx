import React, { useState } from 'react';
import { CENTRALIZED_MANAGE_FIELDS, MANAGEMENT_PLATFORM_OPTIONS, CENTRALIZED_MANAGE_BUTTONS } from '../constants/CentralizedManageConstants';
import { Button, Checkbox, Select, MenuItem, TextField } from '@mui/material';

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
    <div className="bg-white min-h-[calc(100vh-80px)] p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Centralized Manage Section */}
        <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] h-10 flex items-center justify-center font-semibold text-lg text-black shadow mb-0 border-t-2 border-x-2 border-gray-400 rounded-t-xl">
          Centralized Manage
        </div>
        
        <div className="w-full bg-white border-x-2 border-b-2 border-gray-400 rounded-b-xl flex flex-col gap-0 px-2 md:px-8 py-6">
          <div className="w-full max-w-3xl mx-auto">
            
            {/* Form Fields Grid */}
            <form onSubmit={handleSave} className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 mt-4">
              {CENTRALIZED_MANAGE_FIELDS.map((field) => (
                <React.Fragment key={field.name}>
                  <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                    {field.label}
                  </div>
                  <div className="flex items-center min-h-[36px]">
                    {field.type === 'checkbox' ? (
                      <div className="flex items-center">
                        <Checkbox
                          checked={!!form[field.name]}
                          onChange={handleChange}
                          name={field.name}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                        />
                        <span className="ml-1 text-base text-gray-700">Enable</span>
                      </div>
                    ) : field.type === 'select' ? (
                      <Select
                        value={form[field.name]}
                        onChange={handleChange}
                        name={field.name}
                        size="small"
                        variant="outlined"
                        className="w-full"
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            fontSize: '14px',
                            height: '40px'
                          }
                        }}
                      >
                        {MANAGEMENT_PLATFORM_OPTIONS.map(opt => (
                          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                        ))}
                      </Select>
                    ) : field.type === 'static' ? (
                      <span className="text-base text-gray-700">{field.value}</span>
                    ) : (
                      <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        name={field.name}
                        value={form[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder || ''}
                        className="bg-white w-full"
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            fontSize: '14px',
                            height: '40px'
                          }
                        }}
                      />
                    )}
                  </div>
                </React.Fragment>
              ))}
            </form>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8 w-full max-w-3xl mx-auto">
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
          <Button 
            variant="contained" 
            sx={blueButtonSx}
            className="w-full sm:w-auto"
          >
            {CENTRALIZED_MANAGE_BUTTONS[2].label}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CentralizedManage; 