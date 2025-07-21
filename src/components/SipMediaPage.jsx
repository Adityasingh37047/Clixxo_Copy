import React, { useState } from 'react';
import { SIP_MEDIA_FIELDS, SIP_MEDIA_CODEC_FIELD, SIP_MEDIA_INITIAL_FORM } from '../constants/SipMediaconstants';
import { TextField, Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material';

const SipMediaPage = () => {
  const [formData, setFormData] = useState(SIP_MEDIA_INITIAL_FORM);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Your details are saved');
  };

  const handleReset = () => {
    setFormData(SIP_MEDIA_INITIAL_FORM);
  };

  return (
    <div className="bg-white min-h-[120vh] py-8 px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto">
        {/* Blue Bar */}
        <div className="rounded-t-lg border-b-2 border-[#888] h-10 flex items-center justify-center font-semibold text-[20px] text-[#222] shadow-sm"
          style={{background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)'}}>
          Media Parameters
        </div>
        {/* Card */}
        <div className="border-2 border-[#888] border-t-0 rounded-b-lg bg-white w-full py-6 md:py-10 px-4 md:px-8 flex flex-col gap-4 items-center">
            {SIP_MEDIA_FIELDS.map((field) => (
            <div key={field.name} className="flex flex-col md:flex-row items-start md:items-center w-full max-w-3xl mx-auto mb-4">
              <label className="md:w-1/2 w-full max-w-xs text-[16px] text-gray-800 text-left break-words md:pr-4 mb-1 md:mb-0">{field.label}:</label>
              <div className="md:w-1/2 w-full max-w-xs md:ml-auto">
                {field.type === 'select' ? (
                  <FormControl size="small" className="w-full">
                    <Select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                      sx={{ fontSize: 16 }}
                  >
                    {field.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{ fontSize: 16 }}
                  />
                )}
              </div>
            </div>
          ))}
          <div className="flex flex-col md:flex-row items-start md:items-center w-full max-w-3xl mx-auto mt-2">
            <label className="md:w-1/2 w-full max-w-xs text-[16px] text-gray-800 text-left break-words md:pr-4 mb-1 md:mb-0">CODEC Setting:</label>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center w-full max-w-3xl mx-auto">
            <label className="md:w-1/2 w-full max-w-xs text-[16px] text-gray-800 text-left break-words md:pr-4 mb-1 md:mb-0">Gateway Negotiation Coding Sequence:</label>
            <div className="md:w-1/2 w-full max-w-xs md:ml-auto">
              <FormControl size="small" className="w-full">
                <Select
                name={SIP_MEDIA_CODEC_FIELD.name}
                value={formData[SIP_MEDIA_CODEC_FIELD.name]}
                onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  sx={{ fontSize: 16 }}
              >
                {SIP_MEDIA_CODEC_FIELD.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-center gap-8 mt-8 w-full">
          <Button variant="contained" onClick={handleSave} sx={{background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 18, borderRadius: 2, minWidth: 120, minHeight: 40, textTransform: 'none', boxShadow: '0 2px 8px #b3e0ff', '&:hover': {background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)'}}}>Save</Button>
          <Button variant="contained" onClick={handleReset} sx={{background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 18, borderRadius: 2, minWidth: 120, minHeight: 40, textTransform: 'none', boxShadow: '0 2px 8px #b3e0ff', '&:hover': {background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)'}}}>Reset</Button>
        </div>
      </div>
    </div>
  );
};

export default SipMediaPage;
