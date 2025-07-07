import React, { useState } from 'react';
import {
  MR_TITLE,
  MR_BUTTONS,
  MR_NOTE,
  MR_PLACEHOLDER,
} from '../constants/ModificationRecordConstants';
import Button from '@mui/material/Button';

const blueBar = (title) => (
  <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#7ecbfa] to-[#3b8fd6] h-12 rounded-t-lg flex items-center justify-center text-[22px] font-semibold text-gray-800 shadow mb-0 border-b border-[#b3e0ff]">
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

const ModificationRecord = () => {
  const [record, setRecord] = useState('');

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-5xl">
        {blueBar(MR_TITLE)}
        <div className="border border-gray-400 rounded-b-lg bg-white p-0 flex flex-col items-center">
          <textarea
            className="w-full min-h-[340px] max-h-[60vh] border border-gray-400 bg-white text-[16px] p-2 font-mono resize-y outline-none"
            value={record}
            onChange={e => setRecord(e.target.value)}
            placeholder={MR_PLACEHOLDER}
            style={{ resize: 'vertical' }}
          />
        </div>
        <div className="w-full flex flex-row justify-center gap-8 my-6">
          <Button variant="contained" sx={buttonSx}>{MR_BUTTONS.check}</Button>
          <Button variant="contained" sx={buttonSx}>{MR_BUTTONS.download}</Button>
        </div>
        <div className="w-full flex flex-row justify-center mt-2 mb-4">
          <span className="text-red-600 text-base font-medium text-center">{MR_NOTE}</span>
        </div>
      </div>
    </div>
  );
};

export default ModificationRecord; 