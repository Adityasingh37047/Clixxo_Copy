import React, { useState, useEffect } from 'react';
import { MANAGEMENT_SECTIONS, MANAGEMENT_INITIAL_FORM } from '../constants/ManagementConstants';
import { fetchManagementParameters, saveManagementParameters, resetManagementParameters } from '../api/apiService';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const fetchManagementData = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchManagementParameters();
      console.log('Management data:', data);
      
      if (data.response === true) {
        // Map the response data to form structure
        const responseData = data.responseData;
        const mappedData = {
          // Web Management
          webPort: responseData.webConfig?.webPort || '',
          webAccess: responseData.webConfig?.webAccess || 'all',
          webTimeout: responseData.webConfig?.webTimeout || '',
          webWhitelist: responseData.webConfig?.webWhitelist || '',
          
          // SSH Management
          sshEnable: responseData.sshEnable || 'No',
          sshPort: responseData.sshPort || '',
          sshWhitelist: responseData.sshWhitelist || '',
          
          // Remote Data Capture
          remoteDataCapture: responseData.remoteDataCapture || 'No',
          
          // FTP Config
          ftpEnable: responseData.ftpEnable || 'No',
          ftpWhitelist: responseData.ftpWhitelist || '',
          
          // Telnet Config
          telnetEnable: responseData.telnetEnable || 'No',
          telnetWhitelist: responseData.telnetWhitelist || '',
          
          // Watchdog Setting
          watchdogEnable: responseData.watchdogEnable || 'No',
          
          // SYSLOG Parameters
          syslogEnable: responseData.syslogEnable || 'No',
          
          // CDR Parameters
          cdrEnable: responseData.cdrEnable || 'No',
          cdrHangup: responseData.cdrHangup || false,
          cdrAddLanIp: responseData.cdrAddLanIp || false,
          cdrSendNumberClass: responseData.cdrSendNumberClass || false,
          cdrKeepRouting: responseData.cdrKeepRouting || false,
          cdrDebugPhp: responseData.cdrDebugPhp || 'No',
          cdrAllowDeny: responseData.cdrAllowDeny || 'Allow',
          
          // Access to the interface
          accessDebugPhp: responseData.accessDebugPhp || 'No',
          
          // Time Parameters
          ntpEnable: responseData.ntpEnable || 'No',
          dailyRestart: responseData.dailyRestart || 'No',
          systemTime: responseData.systemTime || '',
          modifyTime: responseData.modifyTime || false,
          timeZone: responseData.timeZone || 'GMT+5:30'
        };
        
        // Update form with mapped data
        setForm(prevForm => ({
          ...prevForm,
          ...mappedData
        }));
      } else {
        setError(data.message || 'Failed to fetch management parameters');
        setForm(MANAGEMENT_INITIAL_FORM);
      }
    } catch (error) {
      console.error('Error fetching management parameters:', error);
      setError(error.message || 'Error fetching management parameters');
      setForm(MANAGEMENT_INITIAL_FORM);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagementData();
  }, []);

  // Validation functions
  const validatePort = (value) => {
    if (!value) return '';
    const port = parseInt(value);
    if (isNaN(port) || port < 1 || port > 65535) {
      return 'Port must be a number between 1 and 65535';
    }
    return '';
  };

  const validateIPAddress = (value) => {
    if (!value) return '';
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(value)) {
      return 'Please enter a valid IP address (e.g., 192.168.1.1)';
    }
    const parts = value.split('.');
    for (let part of parts) {
      const num = parseInt(part);
      if (num < 0 || num > 255) {
        return 'IP address parts must be between 0 and 255';
      }
    }
    return '';
  };

  const validateTimeout = (value) => {
    if (!value) return '';
    const timeout = parseInt(value);
    if (isNaN(timeout) || timeout < 1 || timeout > 3600) {
      return 'Timeout must be a number between 1 and 3600 seconds';
    }
    return '';
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'webPort':
      case 'sshPort':
        return validatePort(value);
      case 'webTimeout':
        return validateTimeout(value);
      case 'webWhitelist':
      case 'sshWhitelist':
      case 'ftpWhitelist':
      case 'telnetWhitelist':
        if (value && value.trim()) {
          return validateIPAddress(value);
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    
    // Handle number input validation
    if (type === 'number') {
      // Only allow positive integers
      const numValue = parseInt(value);
      if (value === '' || (numValue >= 0 && Number.isInteger(numValue))) {
        newValue = value === '' ? '' : numValue.toString();
      } else {
        // Don't update if invalid number
        return;
      }
    }
    
    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate field on change
    const error = validateField(name, newValue);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validate all fields before saving
    const errors = {};
    Object.keys(form).forEach(fieldName => {
      const error = validateField(fieldName, form[fieldName]);
      if (error) {
        errors[fieldName] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fix the validation errors before saving.');
      return;
    }

    try {
      setLoading(true);
      setError("");
      setFieldErrors({});
      
      // Format the data according to the expected API structure
      const saveData = {
        webConfig: {
          webPort: form.webPort,
          webAccess: form.webAccess,
          webTimeout: form.webTimeout,
          webWhitelist: form.webWhitelist
        },
        sshEnable: form.sshEnable,
        sshPort: form.sshPort,
        sshWhitelist: form.sshWhitelist,
        remoteDataCapture: form.remoteDataCapture,
        ftpEnable: form.ftpEnable,
        ftpWhitelist: form.ftpWhitelist,
        telnetEnable: form.telnetEnable,
        telnetWhitelist: form.telnetWhitelist,
        watchdogEnable: form.watchdogEnable,
        syslogEnable: form.syslogEnable,
        cdrEnable: form.cdrEnable,
        cdrHangup: form.cdrHangup,
        cdrAddLanIp: form.cdrAddLanIp,
        cdrSendNumberClass: form.cdrSendNumberClass,
        cdrKeepRouting: form.cdrKeepRouting,
        cdrDebugPhp: form.cdrDebugPhp,
        cdrAllowDeny: form.cdrAllowDeny,
        accessDebugPhp: form.accessDebugPhp,
        ntpEnable: form.ntpEnable,
        dailyRestart: form.dailyRestart,
        systemTime: form.systemTime,
        modifyTime: form.modifyTime,
        timeZone: form.timeZone
      };
      
      console.log('Saving management data:', saveData);
      const response = await saveManagementParameters(saveData);
      
      if (response.response === true) {
        alert('Settings saved successfully!');
        // Optionally refresh data after save
        await fetchManagementData();
      } else {
        setError(response.message || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving management parameters:', error);
      setError(error.message || 'Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      setError("");
      setFieldErrors({});
      
      console.log('Resetting management parameters...');
      const resetResponse = await resetManagementParameters();
      
      if (resetResponse.response === true) {
        console.log('Reset successful, fetching default values...');
        // After successful reset, fetch the default values
        await fetchManagementData();
      } else {
        console.log('Reset failed, using initial form values:', resetResponse.message);
        // If reset fails (no default config), use initial form values
        setForm(MANAGEMENT_INITIAL_FORM);
        setFormKey(k => k + 1);
        setError("Reset completed with initial values (no default config found on server)");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error resetting management parameters:', error);
      // If API call fails, use initial form values as fallback
      setForm(MANAGEMENT_INITIAL_FORM);
      setFormKey(k => k + 1);
      setError("Reset completed with initial values (server error occurred)");
      setLoading(false);
    }
  };



  
  // Helper to render System Time row with Modify checkbox and date/time input inline
  const renderSystemTimeInline = (field, nextField) => (
    <>
      <div className="flex items-center text-base text-gray-800 text-left pl-4 whitespace-nowrap min-h-[36px]">
        {field.label}
      </div>
      <div className="flex flex-col w-full">
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
            sx={{ 
              minWidth: 0, 
              maxWidth: 280, 
              flex: 1,
              '& .MuiOutlinedInput-root': {
                fontSize: '14px',
                height: '40px'
              }
            }}
            InputProps={{ readOnly: !form[nextField.name] }}
            error={!!fieldErrors[field.name]}
            helperText={fieldErrors[field.name] || ''}
          />
        </div>
      </div>
    </>
  );



  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Error message with icon */}
        {error && (
          <div className="flex items-center mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <span className="mr-2 text-xl">❌</span>
            <span>{typeof error === 'string' ? error : JSON.stringify(error)}</span>
          </div>
        )}
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center justify-center mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
            <span className="mr-2 text-xl">⏳</span>
            <span>Loading management parameters...</span>
          </div>
        )}
        
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
                        <div className="flex flex-col w-full">
                          {field.type === 'text' && (
                            <div className="w-full">
                              <TextField
                                variant="outlined"
                                size="small"
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                className="bg-white"
                                sx={{ 
                                  minWidth: 120, 
                                  maxWidth: 280,
                                  '& .MuiOutlinedInput-root': {
                                    fontSize: '14px',
                                    height: '40px'
                                  }
                                }}
                                fullWidth
                                error={!!fieldErrors[field.name]}
                                helperText={fieldErrors[field.name] || ''}
                                // Add number input type for specific fields
                                type={
                                  field.name === 'webPort' || 
                                  field.name === 'webTimeout' || 
                                  field.name === 'sshPort' 
                                    ? 'number' 
                                    : 'text'
                                }
                                // Add input props for number fields
                                inputProps={
                                  (field.name === 'webPort' || 
                                   field.name === 'webTimeout' || 
                                   field.name === 'sshPort') 
                                    ? {
                                        min: 1,
                                        max: field.name === 'webTimeout' ? 3600 : 65535,
                                        step: 1
                                      }
                                    : {}
                                }
                              />
                            </div>
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
                                sx={{ 
                                  minWidth: 120, 
                                  maxWidth: 280,
                                  '& .MuiOutlinedInput-root': {
                                    fontSize: '14px'
                                  }
                                }}
                                fullWidth
                                multiline
                                minRows={2}
                                error={!!fieldErrors[field.name]}
                                helperText={fieldErrors[field.name] || ''}
                              />
                              {(field.name === 'webWhitelist' || field.name === 'sshWhitelist' || field.name === 'ftpWhitelist' || field.name === 'telnetWhitelist') && (
                                <span className="text-xs text-gray-600 mt-1 ml-1">IP addresses are separated by '.'</span>
                              )}
                            </div>
                          )}
                          {field.type === 'select' && (
                            <div className="w-full">
                              <Select
                                value={form[field.name]}
                                name={field.name}
                                onChange={handleChange}
                                size="small"
                                variant="outlined"
                                className="bg-white"
                                sx={{ 
                                  minWidth: 120, 
                                  maxWidth: 280,
                                  '& .MuiOutlinedInput-root': {
                                    fontSize: '14px',
                                    height: '40px'
                                  }
                                }}
                                fullWidth
                                error={!!fieldErrors[field.name]}
                              >
                                {field.options.map(opt => (
                                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                ))}
                              </Select>
                              {fieldErrors[field.name] && (
                                <div className="text-red-600 text-xs mt-1 ml-1">
                                  {fieldErrors[field.name]}
                                </div>
                              )}
                            </div>
                          )}
                          {field.type === 'radio' && (
                            <div className="w-full">
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
                                    sx={{ mr: 2, fontSize: '14px' }}
                                  />
                                ))}
                              </RadioGroup>
                              {fieldErrors[field.name] && (
                                <div className="text-red-600 text-xs mt-1 ml-1">
                                  {fieldErrors[field.name]}
                                </div>
                              )}
                            </div>
                          )}
                          {field.type === 'checkbox' && (
                            <div className="w-full">
                              <Checkbox
                                name={field.name}
                                checked={!!form[field.name]}
                                onChange={handleChange}
                                size="small"
                              />
                              {fieldErrors[field.name] && (
                                <div className="text-red-600 text-xs mt-1 ml-1">
                                  {fieldErrors[field.name]}
                                </div>
                              )}
                            </div>
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
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={handleReset}
            sx={blueButtonSx}
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Management; 