import React, { useState, useEffect } from 'react';
import { NETWORK_SETTINGS_FIELDS, NETWORK_SETTINGS_INITIAL_FORM } from '../constants/NetworkConstants';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { fetchNetwork, resetNetworkSettings, saveNetworkSettings } from '../api/apiService';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';


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


const Network = () => {
  const [lanInterfaces, setLanInterfaces] = useState([]);
  const [dnsServers, setDnsServers] = useState(['', '']);
  const [arpMode, setArpMode] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  // Error states for each field
  const [ipErrors, setIpErrors] = useState([]);
  const [subnetErrors, setSubnetErrors] = useState([]);
  const [gatewayErrors, setGatewayErrors] = useState([]);
  const [dnsErrors, setDnsErrors] = useState(['', '']);
  const [arpError, setArpError] = useState('');
  // Removed showConfirm and pendingSave for native confirm
  const [hasChanges, setHasChanges] = useState(false);

  const navigate = useNavigate();

  function isValidIPv4(ip) {
    return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
  }
  function isValidSubnetMask(mask) {
    const masks = [
      "255.0.0.0","255.255.0.0","255.255.255.0","255.255.255.128","255.255.255.192","255.255.255.224","255.255.255.240","255.255.255.248","255.255.255.252","255.255.255.254","255.255.255.255"
    ];
    return masks.includes(mask);
  }
  function isValidArpMode(mode) {
    return mode === '1' || mode === '2';
  }

  useEffect(() => {
    setLoading(true);
    fetchNetwork()
      .then((data) => {
        setLoading(false);
        if (data && data.data) {
          if (Array.isArray(data.data.interfaces)) {
            setLanInterfaces(data.data.interfaces);
          }
          setDnsServers(data.data.dnsServers || ['', '']);
          setArpMode(data.data.defaultArpMode || '1');
        }
      })
      .catch((err) => {
        setError('Failed to fetch network data');
        setLoading(false);
      });
  }, []);



  // Update setHasChanges to true on any input change
  const handleLanChange = (index, field, value) => {
    setHasChanges(true);
    setLanInterfaces(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    // Clear error for the changed field
    if (field === 'ipAddress') {
      setIpErrors(prev => {
        const arr = [...prev]; arr[index] = ''; return arr;
      });
    }
    if (field === 'subnetMask') {
      setSubnetErrors(prev => {
        const arr = [...prev]; arr[index] = ''; return arr;
      });
    }
    if (field === 'defaultGateway') {
      setGatewayErrors(prev => {
        const arr = [...prev]; arr[index] = ''; return arr;
      });
    }
  };

  const handleDnsChange = (idx, value) => {
    setHasChanges(true);
    setDnsServers(prev => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
    setDnsErrors(prev => {
      const arr = [...prev]; arr[idx] = ''; return arr;
    });
  };

  const handleArpChange = (e) => {
    setHasChanges(true);
    setArpMode(e.target.value);
    setArpError('');
  };

  const handleReset = async () => {
    setResetting(true);
    setResetSuccess(false);
    try {
      const resp = await resetNetworkSettings();
      if (resp.response) {
        const data = await fetchNetwork();
        if (data && data.data) {
          if (Array.isArray(data.data.interfaces)) {
            setLanInterfaces(data.data.interfaces);
          }
          setDnsServers(data.data.dnsServers || ['', '']);
          setArpMode(data.data.defaultArpMode || '1');
        }
        setResetSuccess(true); // Show success message
        setTimeout(() => setResetSuccess(false), 3000); // Hide after 3s
      }
    } catch (error) {
      setError('Failed to reset network settings');
    } finally {
      setResetting(false);
    }
  };

  // Move actual save logic here
  const actuallySave = async () => {
    setLoading(true);
    setError('');

    // Validate all fields
    let valid = true;
    let newIp = null;
    let ipErrs = [];
    let subnetErrs = [];
    let gatewayErrs = [];
    let dnsErrs = ['', ''];
    let arpErr = '';
    lanInterfaces.forEach((lan, idx) => {
      if (!isValidIPv4(lan.ipAddress)) {
        ipErrs[idx] = 'Please enter a valid IP address.';
        valid = false;
      } else {
        ipErrs[idx] = '';
      }
      if (!isValidSubnetMask(lan.subnetMask)) {
        subnetErrs[idx] = 'Please enter a valid subnet mask.';
        valid = false;
      } else {
        subnetErrs[idx] = '';
      }
      if (!isValidIPv4(lan.defaultGateway)) {
        gatewayErrs[idx] = 'Please enter a valid gateway address.';
        valid = false;
      } else {
        gatewayErrs[idx] = '';
      }
      if (lan.ipAddress !== import.meta.env.VITE_IP?.replace('http://', '')) {
        newIp = lan.ipAddress;
      }
    });
    if (dnsServers[0] && !isValidIPv4(dnsServers[0])) {
      dnsErrs[0] = 'Please enter a valid IP address.';
      valid = false;
    }
    if (dnsServers[1] && !isValidIPv4(dnsServers[1])) {
      dnsErrs[1] = 'Please enter a valid IP address.';
      valid = false;
    }
    if (!isValidArpMode(arpMode)) {
      arpErr = 'Please select a valid ARP mode.';
      valid = false;
    }
    setIpErrors(ipErrs);
    setSubnetErrors(subnetErrs);
    setGatewayErrors(gatewayErrs);
    setDnsErrors(dnsErrs);
    setArpError(arpErr);

    if (!valid) {
      setLoading(false);
      return;
    }

    try {
      const lanArray = lanInterfaces.map(lan => ({
        name: lan.interface,
        ipv4Type: lan.ipv4Type,
        ipAddress: lan.ipAddress,
        subnetMask: lan.subnetMask,
        defaultGateway: lan.defaultGateway,
        ipv6Address: lan.ipv6Address,
        ipv6Prefix: lan.ipv6Prefix,
      }));
      const dnsArray = [
        { preferredDns: dnsServers[0] },
        { standbyDns: dnsServers[1] }
      ];
      const arpArray = [
        { defaultArpMode: arpMode }
      ];
      const payload = {
        interfaces: lanArray,
        dnsServers: dnsArray,
        arpMode: arpArray
      };
      console.log(payload);

      await saveNetworkSettings(payload);

      // Always show alert and redirect first
      window.alert('Network settings saved successfully! You will be redirected to login.');
      navigate('/login');

      // Now update axios baseURL for future requests
      if (newIp) {
        const PORT = import.meta.env.VITE_API_PORT;
        const METHOD = import.meta.env.VITE_H_METHOD;
        axiosInstance.defaults.baseURL = `http://${newIp}:${PORT}/${METHOD}/api`;
      }
      setHasChanges(false);
    } catch (error) {
      window.alert('Failed to save network settings. Please check your connection or try again.');
      setError('Failed to save network settings');
    } finally {
      setLoading(false);
    }
  };

  // Use native browser confirm dialog
  const handleSave = async (e) => {
    e.preventDefault();
    if (hasChanges) {
      const confirmed = window.confirm("Are you sure you want to save changes?");
      if (!confirmed) {
        return; // User cancelled, do nothing
      }
      await actuallySave(); // Proceed with save and redirect
      return;
    }
    // If no changes, do nothing or show a message
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
          Network Settings
        </div>
        {/* Always show the form, even if there is an error */}
        <div onSubmit={handleSave} className="w-full bg-white border-x-2 border-b-2 border-gray-400 rounded-b-xl flex flex-col gap-0 px-2 sm:px-4 md:px-8 py-6">
          <div className="w-full max-w-3xl mx-auto">
            {/* Dynamically render LAN sections */}
            {lanInterfaces.map((lan, idx) => (
              <div key={lan.name || idx} className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-center mb-8">
                <label className="text-base text-gray-700 text-left">IPV4 Network Type (M):</label>
                <Select
                  value={lan.ipv4Type || ''}
                  onChange={e => handleLanChange(idx, 'ipv4Type', e.target.value)}
                  size="small"
                  variant="outlined"
                  className="bg-white"
                  sx={{ minWidth: 140, maxWidth: 220 }}
                >
                  <MenuItem value="Static">Static</MenuItem>
                </Select>

                <label className="text-base text-gray-700 text-left">IP Address (I):</label>
                <div className="flex flex-col w-full">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={lan.ipAddress || ''}
                    onChange={e => handleLanChange(idx, 'ipAddress', e.target.value)}
                    className="bg-white"
                    sx={{ minWidth: 140, maxWidth: 220 }}
                  />
                  <div className="min-h-[20px]">
                    {ipErrors[idx] && (
                      <span className="text-red-600 text-sm">{ipErrors[idx]}</span>
                    )}
                  </div>
                </div>

                <label className="text-base text-gray-700 text-left">Subnet Mask (U):</label>
                <div className="flex flex-col w-full">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={lan.subnetMask || ''}
                    onChange={e => handleLanChange(idx, 'subnetMask', e.target.value)}
                    className="bg-white"
                    sx={{ minWidth: 140, maxWidth: 220 }}
                  />
                  <div className="min-h-[20px]">
                    {subnetErrors[idx] && (
                      <span className="text-red-600 text-sm">{subnetErrors[idx]}</span>
                    )}
                  </div>
                </div>

                <label className="text-base text-gray-700 text-left">Default Gateway (D):</label>
                <div className="flex flex-col w-full">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={lan.defaultGateway || ''}
                    onChange={e => handleLanChange(idx, 'defaultGateway', e.target.value)}
                    className="bg-white"
                    sx={{ minWidth: 140, maxWidth: 220 }}
                  />
                  <div className="min-h-[20px]">
                    {gatewayErrors[idx] && (
                      <span className="text-red-600 text-sm">{gatewayErrors[idx]}</span>
                    )}
                  </div>
                </div>

                <label className="text-base text-gray-700 text-left">IPV6 Address (I):</label>
                <TextField
                  variant="outlined"
                  size="small"
                  value={lan.ipv6Address || ''}
                  onChange={e => handleLanChange(idx, 'ipv6Address', e.target.value)}
                  className="bg-white"
                  sx={{ minWidth: 140, maxWidth: 220 }}
                />

                <label className="text-base text-gray-700 text-left">IPV6 Address Prefix (U):</label>
                <TextField
                  variant="outlined"
                  size="small"
                  value={lan.ipv6Prefix || ''}
                  onChange={e => handleLanChange(idx, 'ipv6Prefix', e.target.value)}
                  className="bg-white"
                  sx={{ minWidth: 140, maxWidth: 220 }}
                />
              </div>
            ))}
            {/* DNS Server Set */}
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-center mb-8">
              <label className="text-base text-gray-700 text-left">Preferred DNS Server (P):</label>
              <div className="flex flex-col w-full">
                <TextField
                  variant="outlined"
                  size="small"
                  value={dnsServers[0] || ''}
                  onChange={e => handleDnsChange(0, e.target.value)}
                  className="bg-white"
                  sx={{ minWidth: 140, maxWidth: 220 }}
                />
                <div className="min-h-[20px]">
                  {dnsErrors[0] && (
                    <span className="text-red-600 text-sm">{dnsErrors[0]}</span>
                  )}
                </div>
              </div>

              <label className="text-base text-gray-700 text-left">Standby DNS Server (P):</label>
              <div className="flex flex-col w-full">
                <TextField
                  variant="outlined"
                  size="small"
                  value={dnsServers[1] || ''}
                  onChange={e => handleDnsChange(1, e.target.value)}
                  className="bg-white"
                  sx={{ minWidth: 140, maxWidth: 220 }}
                />
                <div className="min-h-[20px]">
                  {dnsErrors[1] && (
                    <span className="text-red-600 text-sm">{dnsErrors[1]}</span>
                  )}
                </div>
              </div>
            </div>
            {/* ARP Mode */}
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-center mb-8">
              <label className="text-base text-gray-700 text-left">Default Mode:</label>
              <div className="flex flex-col w-full">
                <Select
                  value={arpMode}
                  onChange={handleArpChange}
                  size="small"
                  variant="outlined"
                  className="bg-white"
                  sx={{ minWidth: 140, maxWidth: 220 }}
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                </Select>
                <div className="min-h-[20px]">
                  {arpError && (
                    <span className="text-red-600 text-sm">{arpError}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 w-full max-w-3xl mx-auto">
          <Button
            type="submit"
            variant="contained"
            sx={blueButtonSx}
            onClick={handleSave}
            className="sm:w-auto"
            disabled={loading || resetting}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={handleReset}
            sx={blueButtonSx}
            className="sm:w-auto"
            disabled={resetting}
          >
            {resetting ? "Resetting..." : "Reset"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Network; 