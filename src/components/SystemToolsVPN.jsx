import React, { useState } from 'react';
import { VPN_TYPES, SYSTEM_TOOLS_VPN_INITIAL, VPN_RUNNING_INFO } from '../constants/SystemToolsVPNConstants';
import { Button, Select, MenuItem } from '@mui/material';

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
const legacyGrayBtn = {
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
const legacySaveBtn = {
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
    <div className="bg-white min-h-[calc(100vh-80px)] p-2 md:p-6 flex flex-col items-center">
      <div style={blueBarStyle}>VPN Settings</div>
      <div style={formContainerStyle} className="flex flex-col items-center w-full">
        {/* VPN Type row always visible */}
        <div className="w-full max-w-2xl grid grid-cols-2 gap-x-0 gap-y-4 mt-8 mb-2 items-center">
          <div className="flex items-center justify-start pl-2 min-h-[38px]">
            <span className="text-base font-medium text-gray-700">VPN Type</span>
          </div>
          <div className="flex items-center min-h-[38px]">
            <Select
              value={form.vpnType}
              onChange={handleTypeChange}
              size="small"
              variant="outlined"
              className="bg-white"
              sx={{ minWidth: 180, maxWidth: 220 }}
            >
              {VPN_TYPES.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
        {/* Save button only if advanced not shown */}
        {!showAdvanced && (
          <div className="flex flex-row justify-center gap-8 mt-6 mb-2">
            <Button type="button" variant="contained" sx={legacySaveBtn} onClick={handleSaveType}>Save</Button>
          </div>
        )}
        {/* Show advanced options if VPN type is not none and not SoftEtherVPN */}
        {showAdvanced && form.vpnType !== 'none' && form.vpnType !== 'softethervpn' && (
          <div className="w-full flex flex-col items-center mt-2">
            <div className="w-full max-w-2xl grid grid-cols-2 gap-x-0 gap-y-4 items-center mb-2">
              <div className="flex items-center justify-start pl-2 min-h-[38px]">
                <span className="text-base font-medium text-gray-700">Upload VPN Certificate</span>
              </div>
              <div className="flex items-center min-h-[38px] space-x-2 md:space-x-2 md:flex-row flex-col items-start md:items-center" style={{ marginLeft: '-32px', minWidth: 0 }}>
                <div className="flex flex-row items-center">
                  <label htmlFor="vpn-cert-upload" className="flex items-center">
                    <input
                      id="vpn-cert-upload"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleCertChange}
                    />
                    <Button variant="outlined" component="span" sx={legacyGrayBtn} style={{ marginRight: 4, minWidth: 120, padding: '0 12px' }}>Choose File</Button>
                  </label>
                  <span className="text-gray-700 text-sm whitespace-nowrap" style={{ marginRight: 8 }}>{form.vpnCertName}</span>
                </div>
                <Button variant="outlined" sx={legacyGrayBtn} onClick={handleUpload} style={{ minWidth: 120, padding: '0 12px', marginLeft: 0, marginTop: '0.5rem' }}>Upload</Button>
              </div>
            </div>
            <div className="w-full flex flex-col items-center mt-2">
              <div className="text-base font-medium text-gray-700 mb-1 ml-2 w-full text-center">VPN RunningInfo</div>
              <textarea
                className="bg-white border border-gray-400 outline-none resize-none mx-auto block"
                style={{ minHeight: 260, maxHeight: 340, minWidth: 0, width: 600, maxWidth: '90%', fontFamily: 'monospace', fontSize: 15, background: 'white', color: '#222', borderRadius: 0, boxShadow: 'none', padding: 12, whiteSpace: 'pre', overflowY: 'auto' }}
                value={runningInfo}
                readOnly
              />
            </div>
            <div className="flex flex-row justify-center mt-6 mb-2">
              <Button type="button" variant="contained" sx={legacySaveBtn} onClick={handleSave}>Save</Button>
            </div>
          </div>
        )}
        {/* Show SoftEtherVPN form, then bottom VPN RunningInfo and Save button */}
        {showAdvanced && form.vpnType === 'softethervpn' && (
          <div className="w-full flex flex-col items-center mt-2">
            <form className="w-full max-w-2xl grid grid-cols-2 gap-x-0 gap-y-4 items-center mb-2 px-2 md:px-0">
              <div className="flex items-center justify-start min-h-[38px]">
                <span className="text-base text-gray-700">Server Address</span>
              </div>
              <div className="flex items-center min-h-[38px]">
                <input type="text" className="border border-gray-400 rounded-sm px-2 py-1 w-full max-w-xs" placeholder="" />
              </div>
              <div className="flex items-center justify-start min-h-[38px]">
                <span className="text-base text-gray-700">Port</span>
              </div>
              <div className="flex items-center min-h-[38px]">
                <input type="text" className="border border-gray-400 rounded-sm px-2 py-1 w-full max-w-xs" placeholder="" />
              </div>
              <div className="flex items-center justify-start min-h-[38px]">
                <span className="text-base text-gray-700">HUB Name</span>
              </div>
              <div className="flex items-center min-h-[38px]">
                <input type="text" className="border border-gray-400 rounded-sm px-2 py-1 w-full max-w-xs" placeholder="" />
              </div>
              <div className="flex items-center justify-start min-h-[38px]">
                <span className="text-base text-gray-700">Username</span>
              </div>
              <div className="flex items-center min-h-[38px]">
                <input type="text" className="border border-gray-400 rounded-sm px-2 py-1 w-full max-w-xs" placeholder="" />
              </div>
              <div className="flex items-center justify-start min-h-[38px]">
                <span className="text-base text-gray-700">Auth Method</span>
              </div>
              <div className="flex items-center min-h-[38px]">
                <select className="border border-gray-400 rounded-sm px-2 py-1 w-full max-w-xs">
                  <option value="password">Password</option>
                  <option value="certificate">Certificate</option>
                </select>
              </div>
              <div className="flex items-center justify-start min-h-[38px]">
                <span className="text-base text-gray-700">Password</span>
              </div>
              <div className="flex items-center min-h-[38px]">
                <input type="password" className="border border-gray-400 rounded-sm px-2 py-1 w-full max-w-xs" placeholder="" />
              </div>
              <div className="flex items-center justify-start min-h-[38px]">
                <span className="text-base text-gray-700">Client Address</span>
              </div>
              <div className="flex items-center min-h-[38px]">
                <input type="text" className="border border-gray-400 rounded-sm px-2 py-1 w-full max-w-xs" placeholder="" />
              </div>
              <div className="flex items-center justify-start min-h-[38px]">
                <span className="text-base text-gray-700">Subnet Mask</span>
              </div>
              <div className="flex items-center min-h-[38px]">
                <input type="text" className="border border-gray-400 rounded-sm px-2 py-1 w-full max-w-xs" placeholder="" />
              </div>
            </form>
            <div className="w-full flex flex-col items-center mt-8">
              <div className="text-base font-medium text-gray-700 mb-1 ml-2 w-full text-center">VPN RunningInfo</div>
              <textarea
                className="bg-white border border-gray-400 outline-none resize-none mx-auto block"
                style={{ minHeight: 260, maxHeight: 340, minWidth: 0, width: 600, maxWidth: '90%', fontFamily: 'monospace', fontSize: 15, background: 'white', color: '#222', borderRadius: 0, boxShadow: 'none', padding: 12, whiteSpace: 'pre', overflowY: 'auto' }}
                value={runningInfo}
                readOnly
              />
            </div>
            <div className="flex flex-row justify-center mt-6 mb-2">
              <Button type="button" variant="contained" sx={legacySaveBtn} onClick={handleSave}>Save</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemToolsVPN; 