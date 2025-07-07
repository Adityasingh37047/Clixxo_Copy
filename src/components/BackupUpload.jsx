import React, { useState, useRef } from 'react';
import {
  BU_TITLES,
  BU_LABELS,
  BU_FILE_OPTIONS,
  BU_BUTTONS,
} from '../constants/BackupUploadConstants';
import Button from '@mui/material/Button';

const blueBar = (title) => (
  <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#7ecbfa] to-[#3b8fd6] h-10 rounded-t-lg flex items-center justify-center text-[20px] font-semibold text-gray-800 shadow mb-0 border-b border-[#b3e0ff]">
    {title}
  </div>
);

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

const BackupUpload = () => {
  // Backup state
  const [backupFile, setBackupFile] = useState(BU_FILE_OPTIONS[0].value);
  // Upload state
  const [uploadFile, setUploadFile] = useState(BU_FILE_OPTIONS[0].value);
  const [fileName, setFileName] = useState(BU_LABELS.noFile);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFileName(f ? f.name : BU_LABELS.noFile);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-2 gap-8">
      {/* Data Backup Section */}
      <div className="w-full max-w-4xl mb-4">
        {blueBar(BU_TITLES.backup)}
        <div className="border border-gray-400 rounded-b-lg bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-[17px] text-gray-700 whitespace-nowrap">{BU_LABELS.backupFile}</label>
            <select
              className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[180px]"
              value={backupFile}
              onChange={e => setBackupFile(e.target.value)}
            >
              {BU_FILE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex items-center justify-center text-[16px] text-gray-700">
            {BU_LABELS.backupInstruction}
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <Button variant="contained" sx={buttonSx}>{BU_BUTTONS.backup}</Button>
          </div>
        </div>
      </div>

      {/* Data Upload Section */}
      <div className="w-full max-w-4xl">
        {blueBar(BU_TITLES.upload)}
        <div className="border border-gray-400 rounded-b-lg bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-[16px] text-gray-700 mb-1">{BU_LABELS.uploadInstruction}</div>
              <div className="flex flex-row items-center gap-2">
                <label className="text-[17px] text-gray-700 whitespace-nowrap">{BU_LABELS.uploadFile}</label>
                <select
                  className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[180px]"
                  value={uploadFile}
                  onChange={e => setUploadFile(e.target.value)}
                >
                  {BU_FILE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 min-w-[220px]">
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
              {BU_LABELS.chooseFile}
            </Button>
            <span className="text-gray-600 text-[15px] whitespace-nowrap">{fileName}</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <Button variant="contained" sx={buttonSx}>{BU_BUTTONS.upload}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupUpload; 