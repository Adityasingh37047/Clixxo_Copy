import React, { useState } from 'react';
import { IPTABLES_INFO, ACCESS_CONTROL_BUTTONS } from '../constants/AccessControlConstants';
import { Button } from '@mui/material';

const buttonSx = {
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
};

const AccessControl = () => {
  const [editMode, setEditMode] = useState(false);
  const [iptablesInfo, setIptablesInfo] = useState(IPTABLES_INFO);
  const [textareaValue, setTextareaValue] = useState(IPTABLES_INFO);

  const handleAddNew = () => {
    setEditMode(true);
    setTextareaValue(iptablesInfo);
  };

  const handleApply = () => {
    setIptablesInfo(textareaValue);
    setEditMode(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-start bg-white p-2 md:p-8">
      {/* Top message and buttons */}
      <div className="w-full flex flex-col items-center justify-center mt-8 mb-8">
        <div className="text-lg md:text-xl font-medium text-gray-700 mb-4 text-center">No available access control command!</div>
        <div className="flex flex-row gap-6 justify-center items-center">
          <Button
            variant="contained"
            sx={buttonSx}
            onClick={handleApply}
            disabled={!editMode}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            sx={buttonSx}
            onClick={handleAddNew}
            disabled={editMode}
          >
            Add New
          </Button>
        </div>
      </div>
      {/* Iptables Info */}
      <div className="flex flex-col items-center w-full">
        <div className="text-gray-500 text-base font-normal mb-2 ml-2 w-full max-w-[700px] text-left">Iptables Info</div>
        <div
          className="w-full max-w-[700px] bg-white border border-gray-400 rounded-md shadow-sm overflow-y-auto"
          style={{ minHeight: 180, maxHeight: 260, fontFamily: 'monospace', fontSize: 15, padding: 16, whiteSpace: 'pre', resize: 'none' }}
        >
          {editMode ? (
            <textarea
              className="w-full h-full bg-white border-none outline-none resize-none"
              style={{ minHeight: 140, maxHeight: 220, fontFamily: 'monospace', fontSize: 15, background: 'white', color: '#222' }}
              value={textareaValue}
              onChange={e => setTextareaValue(e.target.value)}
              autoFocus
            />
          ) : (
            iptablesInfo
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessControl; 