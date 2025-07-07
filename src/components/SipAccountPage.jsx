import React, { useState, useRef, useEffect } from 'react';
import { SIP_ACCOUNT_FIELDS, SIP_ACCOUNT_TABLE_COLUMNS, SIP_ACCOUNT_INITIAL_FORM } from '../constants/SipAccountConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select as MuiSelect, MenuItem, FormControl } from '@mui/material';

const SipAccountPage = () => {
  // State
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(SIP_ACCOUNT_INITIAL_FORM);
  const [editIndex, setEditIndex] = useState(null);
  // Pagination
  const itemsPerPage = 20;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(accounts.length / itemsPerPage));
  const pagedAccounts = accounts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  // Custom scrollbar
  const tableScrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({ left: 0, width: 0, scrollWidth: 0 });
  useEffect(() => {
    const el = tableScrollRef.current;
    if (el) {
      setScrollState({ left: el.scrollLeft, width: el.clientWidth, scrollWidth: el.scrollWidth });
    }
  }, [accounts, page]);
  const handleTableScroll = (e) => {
    setScrollState({
      left: e.target.scrollLeft,
      width: e.target.clientWidth,
      scrollWidth: e.target.scrollWidth,
    });
  };
  const handleScrollbarDrag = (e) => {
    const track = e.target.parentNode;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    const newScrollLeft = (scrollState.scrollWidth - scrollState.width) * percent;
    if (tableScrollRef.current) {
      tableScrollRef.current.scrollLeft = newScrollLeft;
    }
  };
  const handleArrowClick = (dir) => {
    if (tableScrollRef.current) {
      const delta = dir === 'left' ? -100 : 100;
      tableScrollRef.current.scrollLeft += delta;
    }
  };
  // Modal logic
  const handleOpenModal = (row = null, idx = null) => {
    if (row && idx !== null) {
      setForm({ ...row });
      setEditIndex(idx);
    } else {
      setForm({ ...SIP_ACCOUNT_INITIAL_FORM });
      setEditIndex(null);
    }
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditIndex(null);
  };
  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const handleSave = () => {
    if (editIndex !== null) {
      setAccounts(accs => accs.map((a, i) => i === editIndex ? { ...form } : a));
    } else {
      setAccounts([...accounts, { ...form }]);
    }
    setShowModal(false);
    setEditIndex(null);
  };
  // Table selection logic
  const handleSelectRow = idx => {
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  };
  const handleCheckAll = () => setSelected(accounts.map((_, idx) => idx));
  const handleUncheckAll = () => setSelected([]);
  const handleInverse = () => setSelected(accounts.map((_, idx) => selected.includes(idx) ? null : idx).filter(i => i !== null));
  const handleDelete = () => {
    setAccounts(accounts.filter((_, idx) => !selected.includes(idx)));
    setSelected([]);
  };
  const handleClearAll = () => {
    setAccounts([]);
    setSelected([]);
    setPage(1);
  };
  const handlePageChange = (newPage) => {
    setPage(Math.max(1, Math.min(totalPages, newPage)));
  };
  // Custom scrollbar thumb
  const thumbWidth = scrollState.width && scrollState.scrollWidth
    ? Math.max(40, (scrollState.width / scrollState.scrollWidth) * (scrollState.width - 8))
    : 40;
  const thumbLeft = scrollState.width && scrollState.scrollWidth && scrollState.scrollWidth > scrollState.width
    ? ((scrollState.left / (scrollState.scrollWidth - scrollState.width)) * (scrollState.width - thumbWidth - 16))
    : 0;

  return (
    <div className={`bg-white min-h-[calc(100vh-128px)] flex flex-col items-center ${accounts.length === 0 ? 'justify-center' : 'justify-start'} box-border`}>
      {/* Modal */}
      <Dialog 
        open={showModal} 
        onClose={handleCloseModal}
        maxWidth={false}
        className="z-50"
        PaperProps={{
          sx: { width: 440, maxWidth: '95vw', mx: 'auto', p: 0 }
        }}
      >
        <DialogTitle className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center font-semibold p-2 text-base">
          {editIndex !== null ? 'Edit SIP Account' : 'Add SIP Account'}
        </DialogTitle>
        <DialogContent className="pt-3 pb-0 px-2" style={{padding: '12px 8px 0 8px'}}>
          <div className="flex flex-col gap-2 w-full">
            {SIP_ACCOUNT_FIELDS.map(field => (
              <div
                key={field.name}
                className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1 gap-2"
                style={{ minHeight: 32 }}
              >
                <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:180, marginRight:10}}>
                  {field.label}:
                </label>
                <div className="flex-1">
                  {field.name === 'sipTrunkNo' ? (
                    <MuiSelect
                      value={form[field.name] || ''}
                      onChange={e => handleChange(field.name, e.target.value)}
                      size="small"
                      fullWidth
                      variant="outlined"
                      sx={{ fontSize: 14 }}
                    >
                      {field.options.map(opt => (
                        <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 14 }}>{opt.label}</MenuItem>
                      ))}
                    </MuiSelect>
                  ) : field.name === 'password' ? (
                    <TextField
                      type="password"
                      value={form[field.name] || ''}
                      onChange={e => handleChange(field.name, e.target.value)}
                      size="small"
                      fullWidth
                      variant="outlined"
                      inputProps={{ style: { fontSize: 14, padding: '3px 6px' } }}
                    />
                  ) : field.name === 'index' ? (
                    <TextField
                      type="text"
                      value={form[field.name] || ''}
                      onChange={e => handleChange(field.name, e.target.value)}
                      size="small"
                      fullWidth
                      variant="outlined"
                      inputProps={{ style: { fontSize: 14, padding: '3px 6px' } }}
                    />
                  ) : (
                    <TextField
                      type="text"
                      value={form[field.name] || ''}
                      onChange={e => handleChange(field.name, e.target.value)}
                      size="small"
                      fullWidth
                      variant="outlined"
                      inputProps={{ style: { fontSize: 14, padding: '3px 6px' } }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions className="p-4 justify-center gap-6">
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: 2,
              minWidth: 120,
              minHeight: 40,
              px: 2,
              py: 0.5,
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
              borderRadius: 2,
              minWidth: 120,
              minHeight: 40,
              px: 2,
              py: 0.5,
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

      {/* Blue header bar - only show when there are accounts */}
      {accounts.length > 0 && (
        <div className="w-full max-w-6xl mx-auto mt-8">
          <div className="rounded-t-lg border-b-2 border-[#888] h-9 flex items-center justify-center font-semibold text-[18px] text-[#222] shadow-sm"
            style={{background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)'}}>
            SIP Account
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto">
        {accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="text-gray-800 text-2xl mb-6">No available SIP account!</div>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '18px',
                borderRadius: 2,
                minWidth: 140,
                minHeight: 48,
                px: 2,
                py: 0.5,
                boxShadow: '0 2px 8px #b3e0ff',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
                  color: '#fff',
                },
              }}
              onClick={() => handleOpenModal()}
            >
              Add New
            </Button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[900px] bg-[#f8fafd] border-2 border-gray-400 rounded-b-lg shadow-sm">
                <thead>
                  <tr>
                    {SIP_ACCOUNT_TABLE_COLUMNS.map(c => (
                      <th key={c.key} className="bg-white text-gray-800 font-semibold text-sm border border-gray-300 px-3 py-2 whitespace-nowrap">{c.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pagedAccounts.map((item, idx) => {
                    const realIdx = (page - 1) * itemsPerPage + idx;
                    return (
                      <tr key={realIdx}>
                        <td className="border border-gray-300 px-2 py-1 text-center"><input type="checkbox" checked={selected.includes(realIdx)} onChange={() => handleSelectRow(realIdx)} /></td>
                        {SIP_ACCOUNT_TABLE_COLUMNS.slice(1, -1).map(col => <td key={col.key} className="border border-gray-300 px-2 py-1 text-center whitespace-nowrap">{item[col.key] || '--'}</td>)}
                        <td className="border border-gray-300 px-2 py-1 text-center"><EditDocumentIcon className="cursor-pointer text-blue-600 mx-auto" onClick={() => handleOpenModal(item, realIdx)} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Table controls */}
            <div className="flex flex-wrap justify-between items-center bg-[#e3e7ef] rounded-b-lg border border-t-0 border-gray-300 px-2 py-2 gap-2">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleCheckAll}>Check All</button>
                <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleUncheckAll}>Uncheck All</button>
                <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleInverse}>Inverse</button>
                <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleDelete}>Delete</button>
                <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleClearAll}>Clear All</button>
              </div>
              <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-6 py-2 min-w-[120px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={() => handleOpenModal()}>Add New</button>
            </div>
            {/* Pagination */}
            <div className="flex flex-wrap items-center gap-2 w-full max-w-7xl mx-auto bg-gray-200 rounded-lg border border-gray-300 border-t-0 mt-1 p-2 text-sm text-gray-700">
              <span>{accounts.length} items Total</span>
              <span>{itemsPerPage} Items/Page</span>
              <span>{page}/{totalPages}</span>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400" onClick={() => handlePageChange(1)} disabled={page === 1}>First</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400" onClick={() => handlePageChange(totalPages)} disabled={page === totalPages}>Last</button>
              <span>Go to Page</span>
              <select className="text-xs rounded border border-gray-300 px-2 py-1 min-w-[48px]" value={page} onChange={e => handlePageChange(Number(e.target.value))}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span>{totalPages} Pages Total</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SipAccountPage;
