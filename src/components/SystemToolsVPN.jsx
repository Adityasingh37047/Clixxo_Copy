import React, { useState } from 'react';
import { VPN_TYPES, SYSTEM_TOOLS_VPN_INITIAL, VPN_RUNNING_INFO } from '../constants/SystemToolsVPNConstants';
import { Button, Select, MenuItem, TextField } from '@mui/material';

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

const grayButtonSx = {
  background: 'linear-gradient(to bottom, #e0e0e0 0%, #bdbdbd 100%)',
  color: '#222',
  fontSize: 15,
  borderRadius: 3,
  minWidth: 110,
  minHeight: 36,
  boxShadow: 'none',
  border: '1px solid #888',
  fontWeight: 400,
  textTransform: 'none',
  px: 2,
  '&:hover': {
    background: 'linear-gradient(to bottom, #bdbdbd 0%, #e0e0e0 100%)',
    boxShadow: 'none',
    border: '1px solid #888',
  },
};

const SystemToolsVPN = () => {
  const [form, setForm] = useState(SYSTEM_TOOLS_VPN_INITIAL);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [runningInfo, setRunningInfo] = useState(VPN_RUNNING_INFO);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setForm((prev) => ({ ...prev, vpnType: newType }));
    if (newType === 'none') {
      setShowAdvanced(false);
    } else {
      setShowAdvanced(true);
    }
  };
  const handleSaveType = (e) => {
    e.preventDefault();
    if (form.vpnType !== 'none') {
      setShowAdvanced(true);
    } else {
      setShowAdvanced(false);
    }
  };
  const handleCertChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, vpnCert: e.target.files[0], vpnCertName: e.target.files[0].name }));
    } else {
      setForm((prev) => ({ ...prev, vpnCert: null, vpnCertName: 'No file chosen' }));
    }
  };
  const handleUpload = () => {
    alert('VPN Certificate uploaded!');
  };
  const handleSave = () => {
    alert('VPN settings saved!');
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* VPN Settings Section */}
        <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] h-10 flex items-center justify-center font-semibold text-lg text-black shadow mb-0 border-t-2 border-x-2 border-gray-400 rounded-t-xl">
          VPN Settings
        </div>
        
        <div className="w-full bg-white border-x-2 border-b-2 border-gray-400 rounded-b-xl flex flex-col gap-0 px-2 md:px-8 py-6">
          <div className="w-full max-w-3xl mx-auto">
            
            {/* VPN Type row always visible */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 mt-4 items-center">
              <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                VPN Type
              </div>
              <div className="flex items-center min-h-[36px]">
                <Select
                  value={form.vpnType}
                  onChange={handleTypeChange}
                  size="small"
                  variant="outlined"
                  className="bg-white"
                  sx={{ 
                    minWidth: 180, 
                    maxWidth: 220,
                    '& .MuiOutlinedInput-root': {
                      fontSize: '14px',
                      height: '40px'
                    }
                  }}
                >
                  {VPN_TYPES.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* Save button only if advanced not shown */}
            {!showAdvanced && (
              <div className="flex flex-col sm:flex-row justify-center gap-8 mt-6 mb-2 w-full max-w-3xl mx-auto">
                <Button 
                  type="button" 
                  variant="contained" 
                  sx={blueButtonSx} 
                  onClick={handleSaveType}
                  className="w-full sm:w-auto"
                >
                  Save
                </Button>
              </div>
            )}

            {/* Show advanced options if VPN type is not none and not SoftEtherVPN */}
            {showAdvanced && form.vpnType !== 'none' && form.vpnType !== 'softethervpn' && (
              <div className="w-full flex flex-col items-center mt-6">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 items-center mb-4">
                  <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                    Upload VPN Certificate
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 min-h-[36px] w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-wrap">
                      <label htmlFor="vpn-cert-upload" className="flex items-center">
                        <input
                          id="vpn-cert-upload"
                          type="file"
                          style={{ display: 'none' }}
                          onChange={handleCertChange}
                        />
                        <Button 
                          variant="outlined" 
                          component="span" 
                          sx={grayButtonSx}
                          className="w-full sm:w-auto"
                        >
                          Choose File
                        </Button>
                      </label>
                      <span className="text-gray-700 text-sm whitespace-nowrap">{form.vpnCertName}</span>
                    </div>
                    <Button 
                      variant="outlined" 
                      sx={grayButtonSx} 
                      onClick={handleUpload}
                      className="w-full sm:w-auto"
                    >
                      Upload
                    </Button>
                  </div>
                </div>

                <div className="w-full flex flex-col items-center mt-6">
                  <div className="text-base font-medium text-gray-700 mb-2 w-full text-center">VPN RunningInfo</div>
                  <textarea
                    className="w-full min-h-[180px] max-h-[320px] border border-gray-400 rounded bg-white text-[16px] p-2 font-mono resize-y"
                    value={runningInfo}
                    readOnly
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-8 mt-6 mb-2 w-full">
                  <Button 
                    type="button" 
                    variant="contained" 
                    sx={blueButtonSx} 
                    onClick={handleSave}
                    className="w-full sm:w-auto"
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}

            {/* Show SoftEtherVPN form, then bottom VPN RunningInfo and Save button */}
            {showAdvanced && form.vpnType === 'softethervpn' && (
              <div className="w-full flex flex-col items-center mt-6">
                <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 items-center mb-4">
                  <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                    Server Address
                  </div>
                  <div className="flex items-center min-h-[36px]">
                    <TextField
                      variant="outlined"
                      size="small"
                      className="bg-white w-full"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          height: '40px'
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                    Port
                  </div>
                  <div className="flex items-center min-h-[36px]">
                    <TextField
                      variant="outlined"
                      size="small"
                      className="bg-white w-full"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          height: '40px'
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                    HUB Name
                  </div>
                  <div className="flex items-center min-h-[36px]">
                    <TextField
                      variant="outlined"
                      size="small"
                      className="bg-white w-full"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          height: '40px'
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                    Username
                  </div>
                  <div className="flex items-center min-h-[36px]">
                    <TextField
                      variant="outlined"
                      size="small"
                      className="bg-white w-full"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          height: '40px'
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                    Auth Method
                  </div>
                  <div className="flex items-center min-h-[36px]">
                    <Select
                      defaultValue="password"
                      size="small"
                      variant="outlined"
                      className="bg-white w-full"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          height: '40px'
                        }
                      }}
                    >
                      <MenuItem value="password">Password</MenuItem>
                      <MenuItem value="certificate">Certificate</MenuItem>
                    </Select>
                  </div>

                  <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                    Password
                  </div>
                  <div className="flex items-center min-h-[36px]">
                    <TextField
                      variant="outlined"
                      size="small"
                      type="password"
                      className="bg-white w-full"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          height: '40px'
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                    Client Address
                  </div>
                  <div className="flex items-center min-h-[36px]">
                    <TextField
                      variant="outlined"
                      size="small"
                      className="bg-white w-full"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          height: '40px'
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                    Subnet Mask
                  </div>
                  <div className="flex items-center min-h-[36px]">
                    <TextField
                      variant="outlined"
                      size="small"
                      className="bg-white w-full"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          height: '40px'
                        }
                      }}
                    />
                  </div>
                </form>

                <div className="w-full flex flex-col items-center mt-8">
                  <div className="text-base font-medium text-gray-700 mb-2 w-full text-center">VPN RunningInfo</div>
                  <textarea
                    className="w-full min-h-[180px] max-h-[320px] border border-gray-400 rounded bg-white text-[16px] p-2 font-mono resize-y"
                    value={runningInfo}
                    readOnly
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-8 mt-6 mb-2 w-full">
                  <Button 
                    type="button" 
                    variant="contained" 
                    sx={blueButtonSx} 
                    onClick={handleSave}
                    className="w-full sm:w-auto"
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemToolsVPN; 