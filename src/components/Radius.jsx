import React, { useState } from 'react';
import { RADIUS_FIELDS, LOCAL_IP_OPTIONS, CALL_TYPE_OPTIONS, RADIUS_BUTTONS } from '../constants/RadiusConstants';
import { Button, Checkbox, Select, MenuItem, FormControlLabel } from '@mui/material';

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

const RADIUS_INITIAL_FORM = {
  radius: false,
  certification: false,
  allowCalls: false,
  localIp: '',
  masterServer: '',
  sharedKey: '',
  spareServer: '',
  spareSharedKey: '',
  timeout: '',
  retransmission: '',
  transmitInterval: '',
  callType: [],
};

const Radius = () => {
  const [form, setForm] = useState(RADIUS_INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCallTypeChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const arr = prev.callType || [];
      if (checked) {
        return { ...prev, callType: [...arr, value] };
      } else {
        return { ...prev, callType: arr.filter((v) => v !== value) };
      }
    });
  };

  const handleReset = () => {
    setForm(RADIUS_INITIAL_FORM);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved!');
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-2 md:p-6 flex flex-col items-center">
      <div style={blueBarStyle}>Radius Configuration</div>
      <div style={formContainerStyle} className="flex flex-col items-center w-full">
        <form onSubmit={handleSave} className="w-full max-w-2xl grid grid-cols-2 gap-x-0 gap-y-4 items-center mt-8 mb-2 px-2 md:px-0">
          {RADIUS_FIELDS.map((field) => (
            field.type === 'checkboxGroup' ? (
              CALL_TYPE_OPTIONS.map((opt, idx) => (
                <React.Fragment key={opt.value}>
                  <div className={idx === 0 ? 'flex items-start justify-start min-h-[38px] pt-2' : 'flex min-h-[38px]'}>
                    {idx === 0 && (
                      <span className="text-base text-gray-700">{field.label}</span>
                    )}
                  </div>
                  <div className="flex items-center min-h-[38px]">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.callType.includes(opt.value)}
                          onChange={handleCallTypeChange}
                          name="callType"
                          value={opt.value}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                        />
                      }
                      label={<span className="text-base text-gray-700">{opt.label}</span>}
                      className="min-w-[160px]"
                    />
                  </div>
                </React.Fragment>
              ))
            ) : (
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
                      <span className="ml-1 text-base text-gray-700">{field.enableLabel}</span>
                    </>
                  ) : field.type === 'select' ? (
                    <Select
                      value={form[field.name]}
                      onChange={handleChange}
                      name={field.name}
                      size="small"
                      variant="outlined"
                      sx={{ minWidth: 220, maxWidth: 260 }}
                    >
                      {LOCAL_IP_OPTIONS.map(opt => (
                        <MenuItem key={opt.value} value={opt.label}>{opt.label}</MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <input
                      type={field.type === 'password' ? 'password' : 'text'}
                      name={field.name}
                      value={form[field.name] || ''}
                      onChange={handleChange}
                      className="border border-gray-400 rounded-sm px-2 py-1 w-full max-w-xs"
                    />
                  )}
                </div>
              </React.Fragment>
            )
          ))}
        </form>
      </div>
      <div className="flex flex-row justify-center gap-8 mt-8 mb-2 w-full">
        <Button type="submit" variant="contained" sx={legacyBtn} onClick={handleSave}>Save</Button>
        <Button type="button" variant="contained" sx={legacyBtn} onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
};

export default Radius; 