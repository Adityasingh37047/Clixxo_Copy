import React, { useState, useRef, useEffect } from 'react';
import { FILTERING_RULE_COLUMNS, FILTERING_RULE_DROPDOWN_OPTIONS } from '../constants/FilteringRuleConstants';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select as MuiSelect, MenuItem } from '@mui/material';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

const MIN_ROWS = 10;
const initialForm = {
  no: 0,
  callerIdWhitelist: 'none',
  calleeIdWhitelist: 'none',
  callerIdBlacklist: 'none',
  calleeIdBlacklist: 'none',
  callerIdPoolWhitelist: 'none',
  callerIdPoolBlacklist: 'none',
  calleeIdPoolWhitelist: 'none',
  calleeIdPoolBlacklist: 'none',
  originalCallerIdPoolWhitelist: 'none',
  originalCallerIdPoolBlacklist: 'none',
  description: 'default',
};

const FilteringRule = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState(initialForm);

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
      setForm(rows[rowIdx]);
    } else {
      setForm(initialForm);
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
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = { ...form };
      setRows(updatedRows);
    } else {
      setRows([
        ...rows,
        { ...form, no: rows.length },
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

  // Custom scrollbar logic (same as Number Pool)
  const thumbArea = 400 - 40;
  const thumbHeight = scrollState.height && scrollState.scrollHeight ? Math.max(30, (scrollState.height / scrollState.scrollHeight) * thumbArea) : 30;
  const maxThumbTop = thumbArea - thumbHeight;
  const thumbTop = scrollState.height && scrollState.scrollHeight && scrollState.scrollHeight > scrollState.height ? ((scrollState.top / (scrollState.scrollHeight - scrollState.height)) * maxThumbTop) : 0;

  return (
    <div className="bg-white min-h-screen p-2 md:p-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="bg-white border-2 border-gray-300 rounded-lg shadow-sm w-full min-h-[400px] flex flex-col">
            <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center font-semibold text-[17px] text-[#222] justify-center border-b-2 border-gray-300">Filtering Rule</div>
            <div className="overflow-x-auto w-full" style={{ height: 400 }}>
              <table className="w-full min-w-[1400px] border border-gray-300 border-collapse whitespace-nowrap" style={{ tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    {FILTERING_RULE_COLUMNS.map((col, i) => (
                      <th key={col.key} className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">{col.label}</th>
                    ))}
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {displayRows.map((row, idx) =>
                    row ? (
                      <tr key={idx}>
                        {FILTERING_RULE_COLUMNS.map((col) => (
                          <td key={col.key} className="border border-gray-300 px-2 py-1 text-center bg-white">{row[col.key]}</td>
                        ))}
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">
                          <EditDocumentIcon style={{ color: '#0e8fd6', cursor: 'pointer', margin: '0 auto' }} onClick={() => openModal(idx)} />
                        </td>
                      </tr>
                    ) : (
                      <tr key={idx}>
                        {FILTERING_RULE_COLUMNS.map((col) => (
                          <td key={col.key} className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                        ))}
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-between items-center mt-2">
            <div className="flex gap-2">
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleDelete}>Delete</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleClearAll}>Clear All</button>
            </div>
            <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-6 py-2 min-w-[120px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={() => openModal()}>Add New</button>
          </div>
        </div>
        {/* Modal */}
        <Dialog open={modalOpen} onClose={closeModal} maxWidth={false} PaperProps={{ sx: { maxWidth: '95vw', width: 420, background: '#f4f6fa', borderRadius: 2, border: '1.5px solid #888' } }}>
          <DialogTitle className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center font-semibold p-3 text-base rounded-t-md">
            Filtering Rule
          </DialogTitle>
          <DialogContent className="pt-3 pb-0 px-2" style={{padding: '24px 24px 0 24px'}}>
            <div className="flex flex-col gap-0 w-full">
              {/* No.: */}
              <div className="flex items-center mb-3" style={{ minHeight: 38 }}>
                <label className="text-[15px] text-gray-800 font-medium mr-2 text-left" style={{ width: 170, minWidth: 120 }}>No.:</label>
                <TextField name="no" value={form.no} onChange={handleFormChange} size="small" variant="outlined" inputProps={{ style: { fontSize: 15, padding: '4px 8px', height: 28 } }} sx={{ width: 160, background: '#fff' }} />
              </div>
              {/* Dropdown fields */}
              {[
                { key: 'callerIdWhitelist', label: 'CallerID Whitelist:' },
                { key: 'calleeIdWhitelist', label: 'CalleeID Whitelist:' },
                { key: 'callerIdBlacklist', label: 'CallerID Blacklist:' },
                { key: 'calleeIdBlacklist', label: 'CalleeID Blacklist:' },
                { key: 'callerIdPoolWhitelist', label: 'CallerID Pool in Whitelist:' },
                { key: 'callerIdPoolBlacklist', label: 'CallerID Pool in Blacklist:' },
                { key: 'calleeIdPoolWhitelist', label: 'CalleeID Pool in Whitelist:' },
                { key: 'calleeIdPoolBlacklist', label: 'CalleeID Pool in Blacklist:' },
                { key: 'originalCallerIdPoolWhitelist', label: 'Original CallerID Pool in Whitelist:' },
                { key: 'originalCallerIdPoolBlacklist', label: 'Original CallerID Pool in Blacklist:' },
              ].map(field => (
                <div key={field.key} className="flex items-center mb-3" style={{ minHeight: 38 }}>
                  <label className="text-[15px] text-gray-800 font-medium mr-2 text-left" style={{ width: 170, minWidth: 120 }}>{field.label}</label>
                  <MuiSelect name={field.key} value={form[field.key]} onChange={handleFormChange} size="small" variant="outlined" sx={{ width: 160, background: '#fff', fontSize: 15 }}>
                    {FILTERING_RULE_DROPDOWN_OPTIONS.map(opt => (
                      <MenuItem key={opt} value={opt} sx={{ fontSize: 15 }}>{opt}</MenuItem>
                    ))}
                  </MuiSelect>
                </div>
              ))}
              {/* Description */}
              <div className="flex items-center mb-3" style={{ minHeight: 38 }}>
                <label className="text-[15px] text-gray-800 font-medium mr-2 text-left" style={{ width: 170, minWidth: 120 }}>Description:</label>
                <TextField name="description" value={form.description} onChange={handleFormChange} size="small" variant="outlined" inputProps={{ style: { fontSize: 15, padding: '4px 8px', height: 28 } }} sx={{ width: 160, background: '#fff' }} />
              </div>
            </div>
          </DialogContent>
          <DialogActions className="p-6 pt-2 justify-center gap-6">
            <Button variant="contained" sx={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 1.5, minWidth: 100, boxShadow: '0 2px 6px #0002', textTransform: 'none', px: 4, py: 1, '&:hover': { background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)', color: '#fff' } }} onClick={handleSave}>Save</Button>
            <Button variant="contained" sx={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 1.5, minWidth: 100, boxShadow: '0 2px 6px #0002', textTransform: 'none', px: 4, py: 1, '&:hover': { background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)', color: '#fff' } }} onClick={closeModal}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default FilteringRule; 