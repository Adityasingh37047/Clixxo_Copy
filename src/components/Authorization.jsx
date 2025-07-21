import React, { useState, useRef } from 'react';
import { Button, TextField } from '@mui/material';
import { DEFAULT_SERIAL, DEFAULT_STATUS } from '../constants/AuthorizationConstants';

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
      <div className="w-full max-w-xl mx-auto">
        <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] h-10 flex items-center justify-center font-semibold text-lg text-black shadow mb-0 border-t-2 border-x-2 border-gray-400 rounded-t-xl">
          Authorization
        </div>
        <form className="w-full bg-white border-x-2 border-b-2 border-gray-400 rounded-b-xl flex flex-col gap-0 px-2 md:px-8 py-6" onSubmit={handleUpdate}>
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
                    <TextField
                      type="text"
                      value={serial}
                      onChange={e => setSerial(e.target.value)}
                      size="small"
                      fullWidth
                      variant="outlined"
                      sx={{ maxWidth: 220, fontSize: '1.05rem', fontWeight: 400 }}
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
        </form>
        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8 w-full max-w-xl mx-auto">
          <Button
            type="submit"
            variant="contained"
            sx={blueButtonSx}
            onClick={handleUpdate}
          >
            Update
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
        {/* Warning Note */}
        <div className="w-full text-center mt-8">
          <span className="text-red-600 text-base">
            Note: All the configurations related to the PCM Trunk will be deleted after you update the authorization file!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Authorization; 