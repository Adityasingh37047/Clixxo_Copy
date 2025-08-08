import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Select, MenuItem, FormControl } from '@mui/material';
import { HA_DEFAULTS, HA_PRIMARY_BACKUP_OPTIONS, HA_ETH_OPTIONS, HA_LABELS } from '../constants/HaConstants';

function isValidIPv4(ip) {
  // Simple IPv4 validation
  return /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.|$)){4}$/.test(ip);
}

const HaPage = () => {
  const [enabled, setEnabled] = useState(HA_DEFAULTS.enabled);
  const [virtualIp, setVirtualIp] = useState(HA_DEFAULTS.virtualIp);
  const [primaryBackup, setPrimaryBackup] = useState(HA_DEFAULTS.primaryBackup);
  const [haEth, setHaEth] = useState(HA_DEFAULTS.haEth);
  const [ipTouched, setIpTouched] = useState(false);

  const handleSave = () => {
    // Check if IP is valid before saving
    if (enabled && !isValidIPv4(virtualIp)) {
      // Don't show browser alert, just return - the inline error is already showing
      return;
    }
    alert('Settings saved!');
  };

  const handleReset = () => {
    setEnabled(HA_DEFAULTS.enabled);
    setVirtualIp(HA_DEFAULTS.virtualIp);
    setPrimaryBackup(HA_DEFAULTS.primaryBackup);
    setHaEth(HA_DEFAULTS.haEth);
    setIpTouched(false);
  };

  const ipIsValid = isValidIPv4(virtualIp);

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] py-6 px-2 sm:px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto">
        <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center justify-center font-semibold text-lg text-black shadow mb-0">
          HA
        </div>
        <div className="bg-white border-2 border-gray-400 rounded-b-lg shadow-sm flex flex-col">
          <div className="flex-1 py-6">
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0 px-0 md:px-8">
                <label className="w-full md:w-[220px] text-base text-gray-800 font-medium mb-2 md:mb-0">{HA_LABELS.ha}</label>
                <div className="flex items-center w-full md:w-auto ml-0 md:ml-[200px]">
                  <FormControlLabel
                    control={
                      <Checkbox
                    checked={enabled}
                    onChange={() => setEnabled(prev => !prev)}
                        sx={{ color: '#6b7280', '&.Mui-checked': { color: '#6b7280' } }}
                      />
                    }
                    label={<span className="text-base ml-2">Enable</span>}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0 px-0 md:px-8">
                <label className="w-full md:w-[220px] text-base text-gray-800 font-medium mb-2 md:mb-0">{HA_LABELS.virtualIp}</label>
                <div className="w-full md:w-auto ml-0 md:ml-[200px]">
                  <input
                    type="text"
                    value={virtualIp}
                    onChange={e => setVirtualIp(e.target.value)}
                    onBlur={() => setIpTouched(true)}
                    className={`w-full md:w-[350px] text-base px-3 py-1.5 rounded border ${!ipIsValid && ipTouched && enabled ? 'border-red-500' : 'border-gray-600'} bg-white`}
                    disabled={!enabled}
                    placeholder="e.g. 192.168.1.100"
                  />
                  {!ipIsValid && ipTouched && enabled && (
                    <div className="text-red-500 text-xs mt-1">Please enter a valid IPv4 address.</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0 px-0 md:px-8">
                <label className="w-full md:w-[220px] text-base text-gray-800 font-medium mb-2 md:mb-0">{HA_LABELS.primaryBackup}</label>
                <div className="w-full md:w-auto ml-0 md:ml-[200px]">
                  <FormControl size="small" className="w-full md:w-[350px]">
                    <Select
                      value={primaryBackup}
                      onChange={e => setPrimaryBackup(e.target.value)}
                      fullWidth
                      variant="outlined"
                      disabled={!enabled}
                      sx={{ fontSize: 16 }}
                    >
                      {HA_PRIMARY_BACKUP_OPTIONS.map(opt => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0 px-0 md:px-8">
                <label className="w-full md:w-[220px] text-base text-gray-800 font-medium mb-2 md:mb-0">{HA_LABELS.haEth}</label>
                <div className="w-full md:w-auto ml-0 md:ml-[200px]">
                  <FormControl size="small" className="w-full md:w-[350px]">
                    <Select
                      value={haEth}
                      onChange={e => setHaEth(e.target.value)}
                      fullWidth
                      variant="outlined"
                      disabled={!enabled}
                      sx={{ fontSize: 16 }}
                    >
                      {HA_ETH_OPTIONS.map(opt => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
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
      </div>
    </div>
  );
};

export default HaPage;
