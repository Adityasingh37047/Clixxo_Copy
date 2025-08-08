import React, { useState, useEffect } from 'react';
import { DHCP_SERVER_SETTINGS_FIELDS, DHCP_SERVER_SETTINGS_INITIAL_FORM } from '../constants/DhcpServerSettingsConstants';
import { fetchDhcpSettings, fetchSaveDhcpSettings, fetchResetDhcpSettings } from '../api/apiService';
import { Checkbox, TextField, Button, Alert, CircularProgress } from '@mui/material';

const grayButtonSx = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
  fontWeight: 600,
  fontSize: 15,
  borderRadius: 1.5,
  minWidth: 110,
  boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
  textTransform: 'none',
  px: 2.25,
  py: 1,
  padding: '4px 18px',
  border: '1px solid #bbb',
  '&:hover': {
    background: 'linear-gradient(to bottom, #bfc6d1 0%, #e3e7ef 100%)',
    color: '#222',
  },
};
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

const DhcpServerSettings = () => {
  const [form, setForm] = useState(DHCP_SERVER_SETTINGS_INITIAL_FORM);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch DHCP settings on component mount
  useEffect(() => {
    fetchDhcpData();
  }, []);

  const fetchDhcpData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchDhcpSettings();
      
      // Map the server data to our form structure
      if (response && response.success && response.data && Array.isArray(response.data)) {
        const mappedData = {};
        
        response.data.forEach((lanData, index) => {
          const lanNumber = index + 1;
          mappedData[`enabled${lanNumber}`] = lanData.enabled || false;
          mappedData[`ipRange${lanNumber}`] = lanData.ipRange || '';
          mappedData[`subnetMask${lanNumber}`] = lanData.subnetMask || '';
          mappedData[`defaultGateway${lanNumber}`] = lanData.defaultGateway || '';
          mappedData[`dnsServer${lanNumber}`] = lanData.dnsServer || '';
        });
        
        setForm(prevForm => ({
          ...prevForm,
          ...mappedData
        }));
      }
    } catch (err) {
      console.error('Error fetching DHCP settings:', err);
      setError('Failed to load DHCP settings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = async () => {
    try {
      setError(null);
      setSuccess(null);
      const response = await fetchResetDhcpSettings();
      if (response && response.success) {
        setSuccess('DHCP settings reset successfully!');
        // Optionally refresh the data after successful reset
        await fetchDhcpData();
      } else {
        setError('Failed to reset DHCP settings. Please try again.');
      }
    } catch (err) {
      console.error('Error resetting DHCP settings:', err);
      setError('Failed to reset DHCP settings. Please try again.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);
      
      // Send the form data to the server
      const response = await fetchSaveDhcpSettings(form);
      
      if (response && response.success) {
        setSuccess('DHCP settings saved successfully!');
        // Optionally refresh the data after successful save
        // await fetchDhcpData();
      } else {
        setError('Failed to save DHCP settings. Please try again.');
      }
    } catch (err) {
      console.error('Error saving DHCP settings:', err);
      setError('Failed to save DHCP settings. Please try again.');
    }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-2 sm:p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Error message above the blue bar */}
        {error && (
          <div className="w-full flex items-center justify-center p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-b-lg mb-4">
            <span className="mr-4 text-4xl font-bold">❌</span>
            <span className="text-2xl font-bold">{error}</span>
          </div>
        )}
        {/* Blue bar */}
        <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] h-10 flex items-center justify-center font-semibold text-lg text-black shadow mb-0 border-t-2 border-x-2 border-gray-400 rounded-t-xl relative">
          DHCP Server Settings
        </div>
        {/* Always show the form, even if loading or error */}
        <div className="w-full bg-white border-x-2 border-b-2 border-gray-400 rounded-b-xl flex flex-col gap-0 px-2 sm:px-4 md:px-8 py-6">
          {loading && !error ? (
            <div className="flex justify-center items-center py-12">
              <CircularProgress />
              <span className="ml-4 text-lg">Loading DHCP settings...</span>
            </div>
          ) : (
            // ... existing form rendering code ...
            <>{/* Place your form fields/components here as before */}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default DhcpServerSettings; 