import React, { useState } from 'react';
import { FAX_MODE_OPTIONS, FAX_FORM_INITIAL } from '../constants/FaxFaxConstants';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const containerStyle = {
  background: '#fff',
  minHeight: '100vh',
  padding: 0,
  margin: 0,
};

const panelStyle = {
  maxWidth: 1400,
  margin: '32px auto 0 auto',
  background: 'transparent',
  border: 'none',
  borderRadius: 16,
  boxShadow: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const blueBarStyle = {
  width: '100%',
  maxWidth: 1400,
  background: 'linear-gradient(to bottom, #7cc0f1, #3d92d0)',
  color: '#222',
  fontWeight: 600,
  fontSize: 22,
  textAlign: 'center',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderBottom: '2px solid #d3d3d3',
  padding: '12px 0 8px 0',
  letterSpacing: 0.2,
  marginBottom: 0,
};

const formBoxStyle = {
  border: '2px solid #222',
  borderTop: 'none',
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  background: '#fff',
  width: '100%',
  maxWidth: 1400,
  minHeight: 180,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  margin: '32px 0 24px 0',
  gap: 0,
};

const labelStyle = {
  fontSize: 22,
  color: '#222',
  fontWeight: 600,
  minWidth: 220,
  textAlign: 'right',
  marginRight: 32,
};

const selectStyle = {
  fontSize: 22,
  padding: '8px 24px',
  borderRadius: 6,
  border: '2px solid #888',
  background: '#fff',
  minWidth: 220,
  maxWidth: 260,
  fontWeight: 600,
};

const buttonRowStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 48,
  margin: '32px 0 32px 0',
};

const buttonStyle = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontSize: 22,
  padding: '10px 48px',
  border: 'none',
  borderRadius: 8,
  boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
  cursor: 'pointer',
  minWidth: 160,
  transition: 'background 0.2s, box-shadow 0.2s',
  fontWeight: 700,
};

const buttonGrayStyle = {
  ...buttonStyle,
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
};

const FaxFaxPage = () => {
  const [form, setForm] = useState({ ...FAX_FORM_INITIAL });

  const handleChange = (e) => {
    setForm({ ...form, faxMode: e.target.value });
  };

  const handleSave = () => {
    alert('Fax parameters saved!');
  };

  const handleReset = () => {
    setForm({ ...FAX_FORM_INITIAL });
  };

  return (
    <div className="bg-white min-h-screen p-0 m-0 w-full">
      <div className="w-full max-w-3xl mx-auto mt-10">
        <div className="bg-gradient-to-b from-[#b3e0ff] to-[#3d92d0] text-[#222] font-semibold text-xl text-center rounded-t-lg border-b-2 border-gray-300 py-3">
          Fax Parameters
        </div>
        <div className="border-2 border-gray-300 border-t-0 rounded-b-lg bg-white w-full flex flex-col items-center justify-center py-8 px-4">
          <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-6">
            <label className="font-medium text-base sm:text-lg text-gray-700 min-w-[120px] text-right sm:mr-8 mb-2 sm:mb-0">Fax Mode</label>
            <Select
              size="small"
              value={form.faxMode}
              onChange={handleChange}
              fullWidth
              className="bg-white"
              sx={{ minWidth: 180, maxWidth: 320 }}
            >
              {FAX_MODE_OPTIONS.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
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
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaxFaxPage;
