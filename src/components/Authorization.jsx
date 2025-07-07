import React, { useState, useRef } from 'react';
import { Button, TextField } from '@mui/material';
import { DEFAULT_SERIAL, DEFAULT_STATUS } from '../constants/AuthorizationConstants';

const Authorization = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [status, setStatus] = useState(DEFAULT_STATUS);
  const [serial, setSerial] = useState(DEFAULT_SERIAL);
  const ref = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setFile(null);
      setFileName('No file chosen');
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Simulate upload
    alert('Authorization file uploaded!');
    setStatus('Authorized');
  };

  const handleReset = () => {
    setFile(null);
    setFileName('No file chosen');
    setStatus(DEFAULT_STATUS);
    setSerial(DEFAULT_SERIAL);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white p-4">
      <form className="w-full max-w-xl flex flex-col items-center" onSubmit={handleUpdate}>
        {/* Table */}
        <div className="w-full">
          <table className="w-full border border-gray-400 bg-white text-center" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th colSpan={2} className="border border-gray-400 py-2 text-base font-normal" style={{ background: 'inherit', fontWeight: 400 }}>Authorization Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 py-2 px-3 text-left align-middle" style={{ width: '40%', fontSize: '1.1rem', fontWeight: 400 }}>Serial Number</td>
                <td className="border border-gray-400 py-2 px-3 text-left align-middle" style={{ width: '60%' }}>
                  <input
                    type="text"
                    value={serial}
                    onChange={e => setSerial(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-base outline-none focus:ring-1 focus:ring-blue-400"
                    style={{ maxWidth: 220, fontSize: '1.05rem', fontWeight: 400 }}
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-2 px-3 text-left align-middle" style={{ fontSize: '1.1rem', fontWeight: 400 }}>Authorization Status</td>
                <td className="border border-gray-400 py-2 px-3 text-left align-middle">
                  <a href="#" className="text-blue-700 underline cursor-pointer" style={{ fontSize: '1.05rem', fontWeight: 400 }}>{status}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* File Upload */}
        <div className="w-full mt-6">
          <table className="w-full border border-gray-400 bg-white text-center" style={{ borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td className="border border-gray-400 py-2 px-3 text-left align-middle" style={{ width: '40%', fontSize: '1.1rem', fontWeight: 400 }}>
                  <label htmlFor="authFile">Please select an authorization file:</label>
                </td>
                <td className="border border-gray-400 py-2 px-3 text-left align-middle" style={{ width: '60%' }}>
                  <div className="flex items-center">
                    <input
                      id="authFile"
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      ref={ref => (window._authFileInput = ref)}
                    />
                    <div
                      className="border border-gray-400 rounded px-4 py-1 text-base font-semibold text-gray-800 cursor-pointer select-none hover:bg-gray-100"
                      style={{ display: 'inline-block', fontSize: '1.05rem' }}
                      onClick={() => window._authFileInput && window._authFileInput.click()}
                    >
                      Choose File
                    </div>
                    <span className="ml-3 text-gray-700 text-base align-middle" style={{ fontSize: '1.05rem', fontWeight: 400 }}>
                      {fileName === 'No file chosen' ? 'No file chosen!' : fileName}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-8 mt-8 w-full">
          <Button
            type="submit"
            variant="contained"
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
            Update
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
        {/* Warning Note */}
        <div className="w-full text-center mt-8">
          <span className="text-red-600 text-base">
            Note: All the configurations related to the PCM Trunk will be deleted after you update the authorization file!
          </span>
        </div>
      </form>
    </div>
  );
};

export default Authorization; 