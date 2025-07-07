import React, { useState } from 'react';
import { MANAGEMENT_SECTIONS, MANAGEMENT_INITIAL_FORM } from '../constants/ManagementConstants';
import { Button, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Checkbox, TextField } from '@mui/material';

const blueBarStyle = {
  width: '100%',
  maxWidth: 1100,
  height: 38,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 60%, #3b8fd6 100%)',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  margin: '10px',
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
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',
  padding: '0 0 40px 0',
  minHeight: 320,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderTop: 'none',
};

const Management = () => {
  const [form, setForm] = useState(MANAGEMENT_INITIAL_FORM);
  const [formKey, setFormKey] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved!');
  };

  const handleReset = () => {
    setForm(MANAGEMENT_INITIAL_FORM);
    setFormKey(k => k + 1);
  };

  // Helper to render System Time row with Modify checkbox and date/time input inline
  const renderSystemTimeInline = (field, nextField) => (
    <>
      <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
        {field.label}
      </div>
      <div className="flex items-center gap-2">
        <TextField
          variant="outlined"
          size="small"
          name={field.name}
          type="datetime-local"
          value={form[field.name] ? form[field.name].replace(' ', 'T') : ''}
          onChange={handleChange}
          className="bg-white"
          sx={{ minWidth: 220, maxWidth: 260 }}
          InputProps={{ readOnly: !form[nextField.name] }}
        />
        <Checkbox
          name={nextField.name}
          checked={!!form[nextField.name]}
          onChange={handleChange}
          size="small"
        />
        <span className="text-base text-gray-800 mr-2">{nextField.label}</span>
      </div>
    </>
  );

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-4 flex flex-col items-center">
      <div style={blueBarStyle}>Management Parameters</div>
      <div style={formContainerStyle}>
        <form key={formKey} onSubmit={handleSave} className="w-full flex justify-center pt-6">
          <div className="w-full" style={{ maxWidth: 1000 }}>
            {MANAGEMENT_SECTIONS.map((section, idx) => (
              <div key={section.section} className="w-full mb-8">
                <div className="font-bold text-lg text-gray-700 mb-2 mt-2 ml-2 md:ml-8">{section.section}</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pl-2 md:pl-12">
                  {section.fields.map((field, fieldIdx) => {
                    // Special case: System Time + Modify inline in the same row
                    if (
                      field.name === 'systemTime' &&
                      section.fields[fieldIdx + 1] &&
                      section.fields[fieldIdx + 1].name === 'modifyTime'
                    ) {
                      return renderSystemTimeInline(
                        field,
                        section.fields[fieldIdx + 1]
                      );
                    }
                    // Skip rendering the modifyTime row (handled above)
                    if (field.name === 'modifyTime' && section.fields[fieldIdx - 1] && section.fields[fieldIdx - 1].name === 'systemTime') {
                      return null;
                    }
                    // Default rendering
                    return (
                      <React.Fragment key={section.section + field.name}>
                        <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
                          {field.label}
                        </div>
                        <div className="flex items-center relative w-full">
                          {field.type === 'text' && (
                            <TextField
                              variant="outlined"
                              size="small"
                              name={field.name}
                              value={form[field.name]}
                              onChange={handleChange}
                              className="bg-white"
                              sx={{ minWidth: 120, maxWidth: 220 }}
                              fullWidth
                            />
                          )}
                          {field.type === 'textarea' && (
                            <div className="w-full flex flex-col">
                              <TextField
                                variant="outlined"
                                size="small"
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                className="bg-white"
                                sx={{ minWidth: 120, maxWidth: 220 }}
                                fullWidth
                                multiline
                                minRows={2}
                              />
                              {(field.name === 'webWhitelist' || field.name === 'sshWhitelist' || field.name === 'ftpWhitelist' || field.name === 'telnetWhitelist') && (
                                <span className="text-xs text-gray-600 mt-1 ml-1">IP addresses are separated by '.'</span>
                              )}
                            </div>
                          )}
                          {field.type === 'select' && (
                            <Select
                              value={form[field.name]}
                              name={field.name}
                              onChange={handleChange}
                              size="small"
                              variant="outlined"
                              className="bg-white"
                              sx={{ minWidth: 120, maxWidth: 220 }}
                              fullWidth
                            >
                              {field.options.map(opt => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                              ))}
                            </Select>
                          )}
                          {field.type === 'radio' && (
                            <RadioGroup
                              row
                              name={field.name}
                              value={form[field.name]}
                              onChange={handleChange}
                            >
                              {field.options.map(opt => (
                                <FormControlLabel
                                  key={opt}
                                  value={opt}
                                  control={<Radio size="small" />}
                                  label={opt}
                                  sx={{ mr: 2 }}
                                />
                              ))}
                            </RadioGroup>
                          )}
                          {field.type === 'checkbox' && (
                            <Checkbox
                              name={field.name}
                              checked={!!form[field.name]}
                              onChange={handleChange}
                              size="small"
                            />
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8" style={{ width: '100%', maxWidth: 1100 }}>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSave}
          sx={{
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
          }}
        >
          Save
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={handleReset}
          sx={{
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            color: '#fff',
            fontSize: 18,
            px: 6,
            py: 1.5,
            borderRadius: 2,
            minWidth: 120,
            boxShadow: '0 2px 8px #b3e0ff',
            fontWeight: 500,
            ml: 2,
            '&:hover': {
              background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
            },
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Management; 