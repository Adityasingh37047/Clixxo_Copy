import React, { useState, useEffect } from 'react';
import { PCM_RECEPTION_TIMEOUT_FIELDS, PCM_RECEPTION_TIMEOUT_INITIAL_FORM, PCM_RECEPTION_TIMEOUT_TABLE_COLUMNS } from '../constants/PcmReceptionTimeoutConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const PcmReceptionTimeoutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...PCM_RECEPTION_TIMEOUT_INITIAL_FORM });
  const [timeoutData, setTimeoutData] = useState(PCM_RECEPTION_TIMEOUT_INITIAL_FORM);

  const handleOpenModal = () => {
    setFormData({ ...timeoutData });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setTimeoutData(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-128px)] flex flex-col items-center box-border py-8 px-2 sm:px-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="rounded-t-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] text-center font-semibold text-lg text-[#222] py-3">
            Number-receiving Timeout Info
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[400px] bg-[#f8fafd] table-fixed border-2 border-t-0 border-gray-400 rounded-b-lg">
              <colgroup>
                <col className="w-1/3" />
                <col className="w-1/3" />
                <col className="w-1/3" />
              </colgroup>
            <thead>
              <tr>
                  <th className="bg-white text-gray-800 font-semibold text-sm border border-gray-300 px-3 py-2 whitespace-nowrap w-1/3">Inter Digit Timeout(s)</th>
                  <th className="bg-white text-gray-800 font-semibold text-sm border border-gray-300 px-3 py-2 whitespace-nowrap w-1/3">Description</th>
                  <th className="bg-white text-gray-800 font-semibold text-sm border border-gray-300 px-3 py-2 whitespace-nowrap w-1/3">Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <td className="border border-gray-300 px-3 py-2 text-center w-1/3">{timeoutData.interDigitTimeout}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center w-1/3">{timeoutData.description}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center w-1/3">
                    <Button onClick={handleOpenModal} sx={{ minWidth: 0, p: 0, borderRadius: 1 }}>
                      <EditDocumentIcon style={{ fontSize: 24, color: '#0e8fd6', transition: 'color 0.2s, transform 0.2s' }} />
                    </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="xs" fullWidth>
        <DialogTitle className="bg-gradient-to-b from-[#23272b] to-[#6e7a8a] text-white text-center font-semibold text-lg">Number-Receiving Timeout</DialogTitle>
        <DialogContent className="bg-[#f8fafd] flex flex-col gap-2 py-4">
          {PCM_RECEPTION_TIMEOUT_FIELDS.map((field) => (
            <div key={field.name} className="flex flex-row items-center border border-gray-200 rounded px-2 py-1 gap-2 w-full bg-white mb-2">
              <label className="text-[15px] text-gray-700 font-medium whitespace-nowrap text-left min-w-[120px] mr-2">{field.label}:</label>
              <div className="flex-1 min-w-0">
                <TextField
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                  size="small"
                  fullWidth
                  variant="outlined"
                  className="bg-white"
                  sx={{ maxWidth: '100%', minWidth: 0 }}
                  placeholder={field.placeholder || ''}
                      />
              </div>
            </div>
          ))}
        </DialogContent>
        <DialogActions className="flex justify-center gap-6 pb-4">
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: 1,
              minWidth: 100,
              boxShadow: '0 2px 8px #b3e0ff',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
                color: '#fff',
              },
            }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: 1,
              minWidth: 100,
              boxShadow: '0 2px 8px #b3e0ff',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
                color: '#fff',
              },
            }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PcmReceptionTimeoutPage; 