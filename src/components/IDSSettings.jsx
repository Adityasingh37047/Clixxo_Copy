import React, { useState } from 'react';
import { IDS_TYPES, IDS_INITIAL_FORM, IDS_WARNING_LOG, IDS_LOG_NOTE } from '../constants/IDSSettingsConstants';
import { Button, Checkbox, TextField } from '@mui/material';

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
const buttonSx = {
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

const IDSSettings = () => {
  const [form, setForm] = useState(IDS_INITIAL_FORM);
  const [log, setLog] = useState(IDS_WARNING_LOG);

  const handleCheckbox = (key) => {
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleEnable = () => {
    setForm((prev) => ({ ...prev, enable: !prev.enable }));
  };
  const handleWarningThreshold = (idx, value) => {
    const arr = [...form.warningThresholds];
    arr[idx] = value;
    setForm((prev) => ({ ...prev, warningThresholds: arr }));
  };
  const handleBlacklistThreshold = (idx, value) => {
    const arr = [...form.blacklistThresholds];
    arr[idx] = value;
    setForm((prev) => ({ ...prev, blacklistThresholds: arr }));
  };
  const handleValidity = (value) => {
    setForm((prev) => ({ ...prev, blacklistValidity: value }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    alert('IDS Settings saved!');
  };
  const handleReset = () => {
    setForm(IDS_INITIAL_FORM);
  };
  const handleDownload = () => {
    // For now, just alert. In real app, trigger file download.
    alert('Download all warning log info!');
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-2 md:p-6 flex flex-col items-center">
      <div style={blueBarStyle}>IDS Settings</div>
      <div style={formContainerStyle} className="flex flex-col items-center w-full">
        <form className="w-full flex flex-col items-center" onSubmit={handleSave}>
          <div className="w-full max-w-3xl flex flex-col md:flex-row md:justify-between md:items-start gap-4 mt-6 mb-2">
            {/* Left: IDS Settings and checkboxes */}
            <div className="flex flex-col min-w-[180px] w-full">
              <div className="flex flex-row items-center mb-2 w-full">
                <span className="text-base font-medium text-gray-700 mr-4 min-w-[140px]">IDS Settings:</span>
                <Checkbox checked={form.enable} onChange={handleEnable} size="small" className="ml-0" />
                <span className="text-base text-gray-800 ml-1">Enable</span>
              </div>
              <div className="grid grid-cols-3 gap-x-2 gap-y-1 items-center w-full">
                <span className="text-base font-medium text-gray-700 col-span-1">Type</span>
                <span className="text-base font-medium text-gray-700 col-span-1">Warning Threshold (per 10 seconds)</span>
                <span className="text-base font-medium text-gray-700 col-span-1">Blacklist Threshold (per 10 seconds)</span>
                {IDS_TYPES.map((type, idx) => (
                  <React.Fragment key={type.key}>
                    <div className="flex flex-row items-center gap-2 col-span-1">
                      <Checkbox checked={form[type.key]} onChange={() => handleCheckbox(type.key)} size="small" />
                      <span className="text-base text-gray-800">{type.label}</span>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={form.warningThresholds[idx]}
                        onChange={e => handleWarningThreshold(idx, Number(e.target.value))}
                        className="bg-white"
                        sx={{ minWidth: 90, maxWidth: 120 }}
                      />
                    </div>
                    <div className="col-span-1 flex items-center">
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={form.blacklistThresholds[idx]}
                        onChange={e => handleBlacklistThreshold(idx, Number(e.target.value))}
                        className="bg-white"
                        sx={{ minWidth: 90, maxWidth: 120 }}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex flex-row items-center mt-4" style={{ marginLeft: 0 }}>
                <span className="text-base font-medium text-gray-700 mr-4 min-w-[140px]">Blacklist Validity(s)</span>
                <TextField
                  variant="outlined"
                  size="small"
                  type="number"
                  value={form.blacklistValidity}
                  onChange={e => handleValidity(Number(e.target.value))}
                  className="bg-white"
                  sx={{ minWidth: 120, maxWidth: 180 }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-8 mt-6 mb-2">
            <Button type="submit" variant="contained" sx={buttonSx}>Save</Button>
            <Button type="button" variant="contained" sx={buttonSx} onClick={handleReset}>Reset</Button>
          </div>
        </form>
      </div>
      {/* IDS Warning Log Section */}
      <div className="w-full max-w-5xl mt-8 flex flex-col items-center">
        <div style={blueBarStyle}>IDS Warning Log</div>
        <div className="w-full bg-white border border-gray-400 rounded-md shadow-sm overflow-y-auto" style={{ minHeight: 180, maxHeight: 260, fontFamily: 'monospace', fontSize: 15, padding: 16, whiteSpace: 'pre', resize: 'none' }}>
          <textarea
            className="w-full h-full bg-white border-none outline-none resize-none"
            style={{ minHeight: 140, maxHeight: 220, fontFamily: 'monospace', fontSize: 15, background: 'white', color: '#222' }}
            value={log}
            readOnly
          />
        </div>
        <div className="flex flex-row justify-center mt-4 mb-2">
          <Button variant="contained" sx={buttonSx} onClick={handleDownload}>Download</Button>
        </div>
        <div className="text-xs text-red-600 text-center mt-1 mb-2" style={{ maxWidth: 700 }}>{IDS_LOG_NOTE}</div>
      </div>
    </div>
  );
};

export default IDSSettings; 