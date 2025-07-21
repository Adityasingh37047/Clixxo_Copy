import React, { useState, useRef, useEffect } from 'react';
import { NUMBER_POOL_COLUMNS, NUMBER_POOL_GROUPS } from '../constants/NumberPoolConstants';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select as MuiSelect, MenuItem } from '@mui/material';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

const tableContainerStyle = {
  background: '#fff',
  borderRadius: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  width: '100%',
  minHeight: 400,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};
const contentAreaStyle = {
  border: '2px solid #444',
  borderTop: 'none',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  background: '#fff',
  width: '100%',
  position: 'relative',
  marginTop: 0,
  paddingTop: 0,
};
const blueBarStyle = {
  width: '100%',
  height: 32,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: 17,
  color: '#111',
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
  borderBottom: 'none',
};
const thStyle = {
  background: '#fff', color: '#222', fontWeight: 600, fontSize: 15, border: '1px solid #bbb', padding: '6px 8px', whiteSpace: 'nowrap', textAlign: 'center',
};
const tdStyle = {
  border: '1px solid #bbb', padding: '6px 8px', fontSize: 14, background: '#fff', textAlign: 'center', whiteSpace: 'nowrap', height: 40,
};
const emptyRowStyle = {
  ...tdStyle,
  borderBottom: '1px solid #bbb',
  background: '#fff',
  height: 40,
};
const buttonStyle = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', borderRadius: 6, padding: '7px 32px', minWidth: 100, boxShadow: '0 2px 6px #0002', cursor: 'pointer', margin: '0 8px',
};
const grayButtonStyle = {
  ...buttonStyle, background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222',
};

const legacyModalOverlay = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 1000,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
const legacyModalBox = {
  background: '#f4f6fa',
  borderRadius: 6,
  boxShadow: '0 4px 24px #0005',
  minWidth: 340,
  maxWidth: '90vw',
  padding: '0 24px 18px 24px',
  border: '2px solid #222',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
};
const legacyModalHeader = {
  background: 'linear-gradient(to bottom, #3b4a56 0%, #222 100%)',
  color: '#fff',
  fontWeight: 500,
  fontSize: 16,
  padding: '10px 0 8px 0',
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  textAlign: 'center',
  margin: '-2px -24px 18px -24px',
  letterSpacing: 0.2,
};
const legacyModalLabel = { fontWeight: 500, marginBottom: 2, fontSize: 14 };
const legacyModalInput = { width: '100%', fontSize: 14, padding: '4px 8px', borderRadius: 3, border: '1px solid #bbb', background: '#fafdff', marginBottom: 10, height: 28 };
const legacyModalButtonBar = { display: 'flex', justifyContent: 'center', gap: 18, marginTop: 8 };
const legacySaveButton = { background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 15, border: '1px solid #1976d2', borderRadius: 4, padding: '6px 32px', minWidth: 90, boxShadow: '0 2px 6px #0002', cursor: 'pointer' };
const legacyCloseButton = { background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222', fontWeight: 600, fontSize: 15, border: '1px solid #bbb', borderRadius: 4, padding: '6px 32px', minWidth: 90, boxShadow: '0 2px 6px #0002', cursor: 'pointer' };

const MIN_ROWS = 10;

const NumberPool = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ groupNo: 0, noInGroup: 1, numberRangeStart: '', numberRangeEnd: '' });

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
      const row = rows[rowIdx];
      // Split numberRange if possible
      let start = '', end = '';
      if (row.numberRange && row.numberRange.includes('--')) {
        [start, end] = row.numberRange.split('--');
      }
      setForm({ groupNo: row.groupNo, noInGroup: row.noInGroup, numberRangeStart: start, numberRangeEnd: end });
    } else {
      setForm({ groupNo: 0, noInGroup: 1, numberRangeStart: '', numberRangeEnd: '' });
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

  const handleSave = () => {
    const numberRange = form.numberRangeStart && form.numberRangeEnd ? `${form.numberRangeStart}--${form.numberRangeEnd}` : '';
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = {
        ...updatedRows[editIndex],
        groupNo: Number(form.groupNo),
        noInGroup: Number(form.noInGroup),
        numberRange,
      };
      setRows(updatedRows);
    } else {
      setRows([
        ...rows,
        {
          id: Date.now(),
          checked: false,
          groupNo: Number(form.groupNo),
          noInGroup: Number(form.noInGroup),
          numberRange,
        },
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

  // Calculate thumb size and position
  // Thumb can only move between the arrows (20px top and bottom)
  const thumbArea = 400 - 40; // 400px height - 20px for each arrow
  const thumbHeight = scrollState.height && scrollState.scrollHeight ? Math.max(30, (scrollState.height / scrollState.scrollHeight) * thumbArea) : 30;
  const maxThumbTop = thumbArea - thumbHeight;
  const thumbTop = scrollState.height && scrollState.scrollHeight && scrollState.scrollHeight > scrollState.height ? ((scrollState.top / (scrollState.scrollHeight - scrollState.height)) * maxThumbTop) : 0;

  return (
    <div className="bg-white min-h-screen p-2 md:p-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="bg-white border-2 border-gray-300 rounded-lg shadow-sm w-full min-h-[400px] flex flex-col">
            <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center font-semibold text-[17px] text-[#222] justify-center border-b-2 border-gray-300">Number Pool</div>
            <div className="overflow-x-auto w-full" style={{ height: 400 }}>
              <table className="w-full md:min-w-[700px] border border-gray-300 border-collapse">
                <thead>
                  <tr>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">Check</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">Group No.</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">No. in Group</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">Number Range</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {displayRows.map((row, idx) =>
                    row ? (
                      <tr key={idx}>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white"><input type="checkbox" checked={row.checked || false} onChange={() => handleCheck(idx)} /></td>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.groupNo}</td>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.noInGroup}</td>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.numberRange}</td>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">
                          <EditDocumentIcon style={{ color: '#0e8fd6', cursor: 'pointer', margin: '0 auto' }} onClick={() => openModal(idx)} />
                        </td>
                      </tr>
                    ) : (
                      <tr key={idx}>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-between items-center mt">
            <div className="flex gap-2">
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleDelete}>Delete</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleClearAll}>Clear All</button>
            </div>
            <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-6 py-2 min-w-[120px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={() => openModal()}>Add New</button>
          </div>
        </div>
        {/* Modal */}
        <Dialog open={modalOpen} onClose={closeModal} maxWidth={false} PaperProps={{ sx: { maxWidth: '95vw', width: 380, background: '#f4f6fa', borderRadius: 2, border: '1.5px solid #888' } }}>
          <DialogTitle className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center font-semibold p-3 text-base rounded-t-md">
            Number Pool
          </DialogTitle>
          <DialogContent className="pt-3 pb-0 px-2" style={{padding: '24px 24px 0 24px'}}>
            <div className="flex flex-col gap-0 w-full">
              <div className="flex items-center gap-2 mb-4">
                <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left w-[110px]">Group No.:</label>
                <MuiSelect name="groupNo" value={form.groupNo} onChange={handleFormChange} size="small" fullWidth variant="outlined" sx={{ fontSize: 14 }}>
                  {NUMBER_POOL_GROUPS.map((g) => (
                    <MenuItem key={g.value} value={g.value} sx={{ fontSize: 14 }}>{g.label}</MenuItem>
                  ))}
                </MuiSelect>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left w-[110px]">No. in Group:</label>
                <TextField name="noInGroup" type="text" value={form.noInGroup} onChange={handleFormChange} size="small" fullWidth variant="outlined" inputProps={{ style: { fontSize: 14, padding: '3px 6px' } }} />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left w-[110px]">Number Range:</label>
                <TextField name="numberRangeStart" type="text" value={form.numberRangeStart} onChange={handleFormChange} size="small" fullWidth variant="outlined" inputProps={{ style: { fontSize: 14, padding: '3px 6px' }, placeholder: 'Start' }} className="mr-2" />
                <span className="mx-1">--</span>
                <TextField name="numberRangeEnd" type="text" value={form.numberRangeEnd} onChange={handleFormChange} size="small" fullWidth variant="outlined" inputProps={{ style: { fontSize: 14, padding: '3px 6px' }, placeholder: 'End' }} />
              </div>
            </div>
          </DialogContent>
          <DialogActions className="p-6 pt-2 justify-center gap-6">
            <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-8 py-2 min-w-[100px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={handleSave}>Save</button>
            <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-8 py-2 min-w-[100px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={closeModal}>Cancel</button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default NumberPool; 