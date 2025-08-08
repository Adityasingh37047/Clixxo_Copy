import React, { useState } from 'react';
import { IPTABLES_INFO, ACCESS_CONTROL_BUTTONS } from '../constants/AccessControlConstants';
import { Button, TextField } from '@mui/material';

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
            sx={blueButtonSx}
            onClick={handleApply}
            disabled={!editMode}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            sx={blueButtonSx}
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
        <div className="w-full max-w-[700px] bg-white border border-gray-400 rounded-md shadow-sm overflow-y-auto p-4 resize-y" style={{ minHeight: 180, maxHeight: 380 }}>
          {editMode ? (
            <TextField
              className="w-full"
              multiline
              minRows={7}
              maxRows={12}
              value={textareaValue}
              onChange={e => setTextareaValue(e.target.value)}
              autoFocus
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                style: {
                  fontFamily: 'monospace',
                  fontSize: 15,
                  background: 'white',
                  color: '#222',
                  padding: '8px 10px',
                  resize: 'none',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'monospace',
                  fontSize: 15,
                  background: 'white',
                  color: '#222',
                  padding: 0,
                  border: 'none',
                  borderRadius: 0,
                  boxShadow: 'none',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiOutlinedInput-input': {
                  outline: 'none',
                },
              }}
            />
          ) : (
            <pre className="w-full h-full bg-white text-gray-800 text-[15px] font-mono whitespace-pre-wrap m-0 p-0" style={{ minHeight: 140, maxHeight: 220 }}>{iptablesInfo}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessControl; 