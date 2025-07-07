import React, { useState, useRef } from 'react';
import {
  CONFIG_FILE_TITLE,
  CONFIG_FILE_OPTIONS,
  CONFIG_FILE_EDIT_BUTTON,
  CONFIG_FILE_SAVE_BUTTON,
  CONFIG_FILE_CONTENT_MAP
} from '../constants/ConfigFileConstants';
import Button from '@mui/material/Button';

const ConfigFile = () => {
  const [selectedFile, setSelectedFile] = useState(CONFIG_FILE_OPTIONS[0].value);
  const [content, setContent] = useState(CONFIG_FILE_CONTENT_MAP[CONFIG_FILE_OPTIONS[0].value]);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  const handleFileChange = (e) => {
    const value = e.target.value;
    setSelectedFile(value);
    setContent(CONFIG_FILE_CONTENT_MAP[value] || '');
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const len = textareaRef.current.value.length;
        textareaRef.current.setSelectionRange(len, len);
      }
    }, 0);
  };
  const handleSave = () => setIsEditing(false);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-2">
      {/* Dropdown above the blue bar */}
      <div className="w-full max-w-5xl flex justify-end pt-2 md:pt-6 pr-4" style={{ marginBottom: '-18px', zIndex: 10, position: 'relative' }}>
        <select
          className="w-[170px] border border-black rounded px-2 py-1 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={selectedFile}
          onChange={handleFileChange}
          disabled={isEditing}
          style={{ background: 'white' }}
        >
          {CONFIG_FILE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {/* Blue bar header */}
      <div className="w-full max-w-5xl h-9 bg-gradient-to-b from-[#d0ecff] via-[#7ecbfa] to-[#3b8fd6] rounded-t-lg flex items-center justify-center font-semibold text-lg text-gray-800 shadow mb-0">
        {CONFIG_FILE_TITLE}
      </div>
      {/* Main bordered container, no top border or radius */}
      <div className="w-full max-w-5xl border border-gray-300 rounded-b-md bg-white shadow-sm min-h-[85vh] border-t-0">
        {/* Textarea */}
        <div className="w-full p-2 md:p-4 bg-white">
          <textarea
            ref={textareaRef}
            className="w-full h-[80vh] min-h-[500px] max-h-[90vh] rounded resize-none p-2 text-[15px] font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={content}
            onChange={e => setContent(e.target.value)}
            readOnly={!isEditing}
            spellCheck={false}
            style={{ border: 'none', boxShadow: 'none' }}
          />
        </div>
      </div>
      {/* Buttons outside the main border */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-4 pb-4 mt-2">
        <Button
          variant="contained"
          onClick={handleEdit}
          disabled={isEditing}
          sx={{
            background: 'linear-gradient(180deg, #5db6e8 0%, #298fcf 100%)',
            color: '#fff',
            borderRadius: '4px',
            minWidth: '90px',
            fontWeight: 500,
            fontSize: '16px',
            textTransform: 'none',
            '&:hover': { background: 'linear-gradient(180deg, #298fcf 0%, #5db6e8 100%)' },
          }}
        >
          {CONFIG_FILE_EDIT_BUTTON}
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!isEditing}
          sx={{
            background: 'linear-gradient(180deg, #5db6e8 0%, #298fcf 100%)',
            color: '#fff',
            borderRadius: '4px',
            minWidth: '90px',
            fontWeight: 500,
            fontSize: '16px',
            textTransform: 'none',
            '&:hover': { background: 'linear-gradient(180deg, #298fcf 0%, #5db6e8 100%)' },
          }}
        >
          {CONFIG_FILE_SAVE_BUTTON}
        </Button>
      </div>
    </div>
  );
};

export default ConfigFile; 