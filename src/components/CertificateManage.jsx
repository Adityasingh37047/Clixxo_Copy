import React, { useState } from 'react';
import { CERTIFICATE_FIELDS, CERTIFICATE_BUTTONS, CERTIFICATE_NOTE } from '../constants/CertificateManageConstants';
import { Button } from '@mui/material';

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

const CertificateManage = () => {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-2 md:p-6 flex flex-col items-center">
      <div style={blueBarStyle}>Certificate Management</div>
      <div style={formContainerStyle} className="flex flex-col items-center w-full">
        <form className="w-full max-w-2xl grid grid-cols-2 gap-x-0 gap-y-4 items-center mt-8 mb-2 px-2 md:px-0">
          {CERTIFICATE_FIELDS.map((field) => (
            <React.Fragment key={field.name}>
              <div className="flex items-center justify-start min-h-[38px]">
                <span className="text-base text-gray-700">{field.label}:</span>
              </div>
              <div className="flex items-center min-h-[38px]">
                <input
                  type="text"
                  name={field.name}
                  value={form[field.name] || ''}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-sm px-2 py-1 w-full max-w-xs"
                  placeholder=""
                />
              </div>
            </React.Fragment>
          ))}
        </form>
      </div>
      <div className="flex flex-row justify-center gap-8 mt-8 mb-2 w-full">
        {CERTIFICATE_BUTTONS.map((btn) => (
          <Button key={btn.name} variant="contained" sx={legacyBtn}>{btn.label}</Button>
        ))}
      </div>
      <div className="w-full flex flex-row justify-center mt-2 mb-4">
        <span className="text-red-600 text-base font-medium">{CERTIFICATE_NOTE}</span>
      </div>
    </div>
  );
};

export default CertificateManage; 