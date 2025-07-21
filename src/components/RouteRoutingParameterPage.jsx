import React, { useState } from 'react';
import { ROUTE_SETTINGS_OPTIONS, ROUTE_SETTINGS_DEFAULTS } from '../constants/RouteRoutingParameterPageConstants';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const RouteRoutingParameterPage = () => {
  const [settings, setSettings] = useState({ ...ROUTE_SETTINGS_DEFAULTS });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // Here you would typically save to backend or localStorage
    alert('Settings saved!');
  };

  return (
    <div className="bg-white min-h-screen p-0 w-full">
      <div className="w-full max-w-4xl mx-auto mt-10">
        <div className="bg-gradient-to-b from-[#b3e0ff] to-[#3d92d0] text-[#222] font-semibold text-xl text-center rounded-t-lg border-b-2 border-gray-300 py-3">
        Route Settings
      </div>
        <div className="border-2 border-gray-300 border-t-0 rounded-b-lg bg-white w-full flex flex-col items-center justify-center py-10 px-4">
          <div className="w-full max-w-lg flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="font-medium text-base sm:text-lg text-gray-700 min-w-[140px] text-left sm:mr-8 mb-2 sm:mb-0">IP Incoming</label>
              <Select
              name="ipIncoming"
              value={settings.ipIncoming}
              onChange={handleChange}
                size="small"
                fullWidth
                className="bg-white text-left"
                sx={{ minWidth: 180, maxWidth: 320, textAlign: 'left', '& .MuiSelect-select': { textAlign: 'left' } }}
            >
                {ROUTE_SETTINGS_OPTIONS.map(opt => (
                  <MenuItem key={opt.value} value={opt.value} sx={{ textAlign: 'left' }}>{opt.label}</MenuItem>
              ))}
              </Select>
          </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="font-medium text-base sm:text-lg text-gray-700 min-w-[140px] text-left sm:mr-8 mb-2 sm:mb-0">PSTN Incoming</label>
              <Select
              name="pstnIncoming"
              value={settings.pstnIncoming}
              onChange={handleChange}
                size="small"
                fullWidth
                className="bg-white text-left"
                sx={{ minWidth: 180, maxWidth: 320, textAlign: 'left', '& .MuiSelect-select': { textAlign: 'left' } }}
            >
                {ROUTE_SETTINGS_OPTIONS.map(opt => (
                  <MenuItem key={opt.value} value={opt.value} sx={{ textAlign: 'left' }}>{opt.label}</MenuItem>
              ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-8 mt-8">
          <Button
            variant="contained"
            sx={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 16, borderRadius: 2, minWidth: 120, boxShadow: '0 2px 8px #b3e0ff', textTransform: 'none', '&:hover': { background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)', color: '#fff', }, }}
          onClick={handleSave}
        >
          Save
          </Button>
          <Button
            variant="contained"
            sx={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 16, borderRadius: 2, minWidth: 120, boxShadow: '0 2px 8px #b3e0ff', textTransform: 'none', '&:hover': { background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)', color: '#fff', }, }}
          onClick={() => { setSettings({ ...ROUTE_SETTINGS_DEFAULTS }); setSaved(false); }}
        >
          Reset
          </Button>
        </div>
      </div>
  </div>
  );
};

export default RouteRoutingParameterPage;


