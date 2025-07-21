import React, { useState } from 'react';
import { MANAGEMENT_SECTIONS, MANAGEMENT_INITIAL_FORM } from '../constants/ManagementConstants';
import { Button, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Checkbox, TextField } from '@mui/material';

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
    // Implement save logic here
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
        <div className="flex flex-row items-center gap-2">
          <Checkbox
            name={nextField.name}
            checked={!!form[nextField.name]}
            onChange={handleChange}
            size="small"
          />
          <span className="text-base text-gray-800 mr-2">{nextField.label}</span>
        </div>
        <TextField
          variant="outlined"
          size="small"
          name={field.name}
          type="datetime-local"
          value={form[field.name] ? form[field.name].replace(' ', 'T') : ''}
          onChange={handleChange}
          className="bg-white w-full sm:w-auto"
          sx={{ minWidth: 0, maxWidth: 260, flex: 1 }}
          InputProps={{ readOnly: !form[nextField.name] }}
        />
      </div>
    </>
  );

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] h-10 flex items-center justify-center font-semibold text-lg text-black shadow mb-0 border-t-2 border-x-2 border-gray-400 rounded-t-xl">
          Management Parameters
        </div>
        <form key={formKey} onSubmit={handleSave} className="w-full bg-white border-x-2 border-b-2 border-gray-400 rounded-b-xl flex flex-col gap-0 px-2 md:px-8 py-6">
          <div className="w-full max-w-3xl mx-auto">
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
        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8 w-full max-w-3xl mx-auto">
          <Button
            type="submit"
            variant="contained"
            sx={blueButtonSx}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={handleReset}
            sx={blueButtonSx}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Management; 