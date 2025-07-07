import React, { useState, useRef } from 'react';
import {
  UPGRADE_TABLE_HEADERS,
  UPGRADE_VERSION_DATA,
  UPGRADE_LABELS,
  UPGRADE_BUTTONS,
} from '../constants/UpgradeConstants';
import Button from '@mui/material/Button';

const buttonSx = {
  background: 'linear-gradient(to bottom, #5dc6f8 0%, #299fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '16px',
  borderRadius: 0,
  minWidth: 90,
  px: 2,
  py: 0.5,
  boxShadow: '0 2px 8px #b3e0ff',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(to bottom, #299fd6 0%, #5dc6f8 100%)',
  },
};

const Upgrade = () => {
  const [fileName, setFileName] = useState(UPGRADE_LABELS.noFile);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFileName(f ? f.name : UPGRADE_LABELS.noFile);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
        {/* Version Table */}
        <div className="w-full border border-gray-400 bg-white rounded-md overflow-x-auto">
          <div className="w-full text-center text-[18px] font-semibold text-gray-700 py-2 border-b border-gray-300 bg-[#f6fafd]">
            {UPGRADE_LABELS.currentVersion}
          </div>
          <table className="w-full border-collapse text-center">
            <tbody>
              {UPGRADE_VERSION_DATA.map(([label, value], idx) => (
                <tr key={label} className="border-b border-gray-300">
                  <td className="px-3 py-1 text-[16px] text-gray-700 text-center border-r border-gray-300 min-w-[120px]">{label}</td>
                  <td className="px-3 py-1 text-[16px] text-blue-700 text-left break-all">
                    {value && value.startsWith('#') ? (
                      <span className="text-blue-700">{value}</span>
                    ) : value && value.match(/^\d+\./) ? (
                      <span className="text-blue-700 underline cursor-pointer">{value}</span>
                    ) : (
                      <span>{value}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* File Input Row */}
        <div className="w-full flex flex-col md:flex-row md:items-center gap-2 border border-gray-400 rounded bg-white px-2 py-3">
          <label className="text-[16px] text-gray-700 min-w-[160px]">{UPGRADE_LABELS.selectFile}</label>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="outlined"
            component="span"
            sx={{
              background: '#f5f5f5',
              border: '1px solid #b0b0b0',
              color: '#333',
              fontWeight: 500,
              fontSize: '15px',
              textTransform: 'none',
              minWidth: '120px',
              mr: 1,
            }}
            onClick={() => fileInputRef.current.click()}
          >
            {UPGRADE_LABELS.chooseFile}
          </Button>
          <span className="text-gray-600 text-[15px] whitespace-nowrap">{fileName}</span>
        </div>
        {/* Buttons Row */}
        <div className="w-full flex flex-row justify-center gap-12 mt-2">
          <Button variant="contained" sx={buttonSx}>{UPGRADE_BUTTONS.update}</Button>
          <Button variant="contained" sx={buttonSx}>{UPGRADE_BUTTONS.reset}</Button>
        </div>
      </div>
    </div>
  );
};

export default Upgrade; 