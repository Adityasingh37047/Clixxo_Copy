import React, { useState, useRef, useEffect } from 'react';
import { IP_ROUTING_TABLE_COLUMNS, IP_ROUTING_TABLE_MODAL_FIELDS, IP_ROUTING_TABLE_INITIAL_ROW } from '../constants/IPRoutingTableConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@mui/material';

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
const grayButtonSx = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
  fontWeight: 600,
  fontSize: 16,
  borderRadius: 1.5,
  minWidth: 120,
  boxShadow: '0 2px 6px #0002',
  textTransform: 'none',
  px: 3,
  py: 1.5,
  padding: '6px 28px',
  border: '1px solid #bfc6d1',
  '&:hover': {
    background: 'linear-gradient(to bottom, #bfc6d1 0%, #e3e7ef 100%)',
    color: '#222',
  },
};

const MIN_ROWS = 10;

const IPRoutingTable = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ ...IP_ROUTING_TABLE_INITIAL_ROW });

  // Custom scrollbar state
  const tableScrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({ top: 0, height: 0, scrollHeight: 0 });

  const handleTableScroll = (e) => {
    setScrollState({
      top: e.target.scrollTop,
      height: e.target.clientHeight,
      scrollHeight: e.target.scrollHeight,
    });
  };

  useEffect(() => {
    if (tableScrollRef.current) {
      setScrollState({
        top: tableScrollRef.current.scrollTop,
        height: tableScrollRef.current.clientHeight,
        scrollHeight: tableScrollRef.current.scrollHeight,
      });
    }
  }, [rows.length]);

  const openModal = (rowIdx = null) => {
    setEditIndex(rowIdx);
    if (rowIdx !== null) {
      setForm({ ...rows[rowIdx] });
    } else {
      setForm({ ...IP_ROUTING_TABLE_INITIAL_ROW, no: rows.length });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditIndex(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e && e.preventDefault && e.preventDefault();
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = { ...form };
      setRows(updatedRows);
    } else {
      setRows([
        ...rows,
        { ...form, checked: false, no: rows.length },
      ]);
    }
    closeModal();
  };

  const handleCheck = (idx) => {
    setRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, checked: !row.checked } : row))
    );
  };

  const handleDelete = () => {
    setRows(rows.filter((row) => !row.checked));
  };

  const handleClearAll = () => {
    setRows([]);
  };

  // Fill up to MIN_ROWS for grid look
  const displayRows = [
    ...rows,
    ...Array.from({ length: Math.max(0, MIN_ROWS - rows.length) }).map(() => null),
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-2 md:p-6 flex flex-col items-center min-h-[calc(100vh-80px)]">
      <div className="w-full bg-white rounded-xl shadow border-2 border-gray-400 flex flex-col overflow-hidden">
        <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] h-10 flex items-center justify-center font-semibold text-lg text-black shadow mb-0 border-b-2 border-gray-400">
          IP Routing Table
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse w-full">
            <thead>
              <tr>
                {IP_ROUTING_TABLE_COLUMNS.map((col) => (
                  <th key={col.key} className="bg-white text-gray-800 font-semibold text-[15px] border border-gray-300 px-2 py-2 whitespace-nowrap text-center" style={{ minWidth: col.width }}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody ref={tableScrollRef} onScroll={handleTableScroll}>
              {displayRows.map((row, idx) =>
                row ? (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      <input type="checkbox" checked={row.checked || false} onChange={() => handleCheck(idx)} />
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{row.no}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{row.destination}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{row.gateway}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{row.subnetMask}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{row.networkPort}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      <EditDocumentIcon style={{ color: '#1976d2', fontSize: 22, cursor: 'pointer' }} onClick={() => openModal(idx)} />
                    </td>
                  </tr>
                ) : (
                  <tr key={idx}>
                    {IP_ROUTING_TABLE_COLUMNS.map((col) => (
                      <td key={col.key} className="border border-gray-300 px-2 py-2 text-center h-10"></td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Button Row OUTSIDE the bordered box */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-[1400px] px-4 py-4 gap-4 bg-[#f4f6fa] mt-2">
        <div className="flex gap-2">
          <Button variant="contained" sx={grayButtonSx} onClick={handleDelete}>Delete</Button>
          <Button variant="contained" sx={grayButtonSx} onClick={handleClearAll}>Clear All</Button>
        </div>
        <Button variant="contained" sx={blueButtonSx} onClick={() => openModal(null)}>Add New</Button>
      </div>
      {/* Modal */}
      <Dialog open={modalOpen} onClose={closeModal} maxWidth={false} PaperProps={{ sx: { maxWidth: '95vw', width: 400, background: '#f4f6fa', borderRadius: 2, border: '1.5px solid #888' } }}>
        <DialogTitle className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center font-semibold p-3 text-base rounded-t-md">
          Routing Table
        </DialogTitle>
        <DialogContent className="pt-3 pb-0 px-2" style={{padding: '24px 24px 0 24px'}}>
          <div className="flex flex-col gap-0 w-full">
            {IP_ROUTING_TABLE_MODAL_FIELDS.map((field) => (
              <div key={field.key} className="flex flex-row items-center gap-2 mb-4 w-full">
                <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left w-40 flex-shrink-0">{field.label}:</label>
                {field.type === 'text' || field.type === 'number' ? (
                  <TextField
                    name={field.key}
                    type={field.type}
                    value={form[field.key]}
                    onChange={handleFormChange}
                    size="small"
                    fullWidth
                    variant="outlined"
                    inputProps={{ style: { fontSize: 14, padding: '3px 6px' } }}
                    sx={{ minWidth: 0 }}
                  />
                ) : null}
                {field.type === 'select' ? (
                  <Select
                    name={field.key}
                    value={form[field.key]}
                    onChange={handleFormChange}
                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{ fontSize: 14, minWidth: 0 }}
                  >
                    {field.options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 14 }}>{opt.label}</MenuItem>
                    ))}
                  </Select>
                ) : null}
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center gap-8 pb-6">
          <Button variant="contained" sx={blueButtonSx} onClick={handleSave}>Save</Button>
          <Button variant="contained" sx={grayButtonSx} onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IPRoutingTable; 