import React, { useState } from 'react';
import { CALLERID_RESERVE_POOL_FIELDS, CALLERID_RESERVE_POOL_TABLE_COLUMNS, CALLERID_RESERVE_POOL_INITIAL_FORM } from '../constants/CallerIDReservePoolConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const grayButtonSx = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
  fontWeight: 600,
  fontSize: 15,
  borderRadius: 1.5,
  minWidth: 110,
  boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
  textTransform: 'none',
  px: 2.25,
  py: 1,
  padding: '4px 18px',
  border: '1px solid #bbb',
  '&:hover': {
    background: 'linear-gradient(to bottom, #bfc6d1 0%, #e3e7ef 100%)',
    color: '#222',
  },
};
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

const CallerIDReservePool = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(CALLERID_RESERVE_POOL_INITIAL_FORM);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [errors, setErrors] = useState({});

  const handleOpenModal = (item = null, index = -1) => {
    setFormData(item ? { ...item, originalIndex: index } : CALLERID_RESERVE_POOL_INITIAL_FORM);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = () => {
    const newErrors = {};
    CALLERID_RESERVE_POOL_FIELDS.forEach(field => {
      if (!formData[field.name] || formData[field.name].toString().trim() === '') {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const { originalIndex, ...dataToSave } = formData;
    setRows(prev => {
      if (originalIndex !== undefined && originalIndex > -1) {
        const updated = [...prev];
        updated[originalIndex] = dataToSave;
        return updated;
      }
      return [...prev, dataToSave];
    });
    setIsModalOpen(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectRow = idx => {
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  };
  const handleCheckAll = () => setSelected(rows.map((_, idx) => idx));
  const handleUncheckAll = () => setSelected([]);
  const handleInverse = () => setSelected(rows.map((_, idx) => !selected.includes(idx) ? idx : null).filter(i => i !== null));
  const handleDelete = () => {
    setRows(rows.filter((_, idx) => !selected.includes(idx)));
    setSelected([]);
  };
  const handleClearAll = () => {
    setRows([]);
    setSelected([]);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-2 md:p-8">
      {rows.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
          <div className="text-gray-800 text-2xl md:text-[22px] font-semibold mb-8 text-center">No available CallerID Reserve!</div>
          <Button
            variant="contained"
            sx={{
              ...blueButtonSx,
              minWidth: 140,
              minHeight: 48,
              fontSize: '18px',
              fontWeight: 600,
              px: 2,
              py: 0.5,
              boxShadow: '0 2px 8px #b3e0ff',
              textTransform: 'none',
            }}
            onClick={() => handleOpenModal()}
          >Add New</Button>
          <div className="text-red-600 text-lg md:text-xl font-semibold mt-8 text-center">Note: Don't change the number when using the number kept in pool!</div>
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto">
          <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center font-semibold text-[17px] text-[#222] justify-center shadow border-b-0 rounded-t-lg">
            CallerID Reserve Pool
          </div>
          <div className="overflow-x-auto w-full border-b border-gray-300" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: 'none' }}>
            <table className="w-full min-w-[500px] border border-gray-300 border-collapse whitespace-nowrap" style={{ tableLayout: 'auto', border: '1px solid #bbb' }}>
              <thead>
                <tr>{CALLERID_RESERVE_POOL_TABLE_COLUMNS.map(col => <th key={col.key} className="bg-white text-[#222] font-semibold text-[15px] border border-gray-300 text-center" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{col.label}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx} style={{ minHeight: 32 }}>
                    <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}><input type="checkbox" checked={selected.includes(idx)} onChange={() => handleSelectRow(idx)} /></td>
                    <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{row.no}</td>
                    <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{row.callerId}</td>
                    <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}><EditDocumentIcon style={{ cursor: 'pointer', color: '#0e8fd6', display: 'block', margin: '0 auto' }} onClick={() => handleOpenModal(row, idx)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full px-2 py-2" style={{ background: '#e3e7ef', marginTop: 12 }}>
            <div className="flex flex-wrap gap-2">
              <Button variant="contained" sx={grayButtonSx} onClick={handleCheckAll}>Check All</Button>
              <Button variant="contained" sx={grayButtonSx} onClick={handleUncheckAll}>Uncheck All</Button>
              <Button variant="contained" sx={grayButtonSx} onClick={handleInverse}>Inverse</Button>
              <Button variant="contained" sx={grayButtonSx} onClick={handleDelete}>Delete</Button>
              <Button variant="contained" sx={grayButtonSx} onClick={handleClearAll}>Clear All</Button>
            </div>
            <Button variant="contained" sx={blueButtonSx} onClick={() => handleOpenModal()}>Add New</Button>
          </div>
          <div className="text-red-600 text-lg md:text-xl font-semibold mt-8 text-center">Note: Don't change the number when using the number kept in pool!</div>
        </div>
      )}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth={false} PaperProps={{ sx: { maxWidth: '95vw', width: 440, background: '#f8fafd', borderRadius: 2, border: '2px solid #222' } }}>
        <DialogTitle className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center font-semibold p-3 text-base">CallerID</DialogTitle>
        <DialogContent className="pt-3 pb-0 px-2" style={{padding: '12px 8px 0 8px'}}>
          <div className="flex flex-col gap-2 w-full">
            {CALLERID_RESERVE_POOL_FIELDS.map((field) => (
              <div key={field.name} className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1 gap-2" style={{ minHeight: 32 }}>
                <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:120, marginRight:10}}>{field.label}</label>
                <div className="flex-1">
                  <TextField
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                    variant="outlined"
                    inputProps={{ style: { fontSize: 14, padding: '3px 6px' }, min: field.min }}
                    error={!!errors[field.name]}
                    helperText={errors[field.name] || ''}
                  />
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions className="p-6 pt-2 justify-center gap-6">
          <Button variant="contained" sx={blueButtonSx} onClick={handleSave}>Save</Button>
          <Button variant="contained" sx={blueButtonSx} onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CallerIDReservePool; 