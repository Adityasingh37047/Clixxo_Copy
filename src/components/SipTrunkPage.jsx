import React, { useState, useRef, useEffect } from 'react';
import { SIP_TRUNK_FIELDS, SIP_TRUNK_INITIAL_FORM } from '../constants/SipTrunkConstants';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Checkbox, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Pagination,
  Select as MuiSelect,
  FormControl,
  InputLabel
} from '@mui/material';
import EditDocumentIcon from '@mui/icons-material/EditDocument';



const getTableColumns = () => [
  { key: 'check', label: 'Check' },
  ...SIP_TRUNK_FIELDS.map(f => ({ key: f.key, label: f.label })),
];

// Custom scrollbar styles (same as SIP Register)
const customScrollbarRowStyle = {
  width: '100%', margin: '0 auto', background: '#f4f6fa', display: 'flex', alignItems: 'center', height: 24, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, border: '2px solid #888', borderTop: 'none', padding: '0 4px', boxSizing: 'border-box',
};
const customScrollbarTrackStyle = {
  flex: 1, height: 12, background: '#e3e7ef', borderRadius: 8, position: 'relative', margin: '0 4px', overflow: 'hidden',
};
const customScrollbarThumbStyle = {
  position: 'absolute', height: 12, background: '#888', borderRadius: 8, cursor: 'pointer', top: 0,
};
const customScrollbarArrowStyle = {
  width: 18, height: 18, background: '#e3e7ef', border: '1px solid #bbb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#888', cursor: 'pointer', userSelect: 'none',
};

const SipTrunkPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(SIP_TRUNK_INITIAL_FORM);
  const [trunks, setTrunks] = useState([]);
  const [selected, setSelected] = useState([]); // array of indices
  const [editIndex, setEditIndex] = useState(null);

  // Pagination logic
  const itemsPerPage = 20;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(trunks.length / itemsPerPage));
  const pagedTrunks = trunks.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const handlePageChange = (newPage) => {
    setPage(Math.max(1, Math.min(totalPages, newPage)));
  };

  const handleOpenModal = (row = null, idx = null) => {
    if (row && idx !== null) {
      setForm({ ...row });
      setEditIndex(idx);
    } else {
      setForm({ ...SIP_TRUNK_INITIAL_FORM, index: trunks.length });
      setEditIndex(null);
    }
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const handleCheckbox = (key) => setForm(prev => ({ ...prev, [key]: !prev[key] }));
  const handleSave = () => {
    if (editIndex !== null) {
      // Edit existing row
      setTrunks(trunks => trunks.map((t, i) => i === editIndex ? { ...form } : t));
    } else {
      // Add new row
      setTrunks([...trunks, { ...form, index: trunks.length }]);
    }
    setShowModal(false);
    setEditIndex(null);
  };

  // Table selection logic
  const handleSelectRow = idx => {
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  };
  const handleCheckAll = () => setSelected(trunks.map((_, idx) => idx));
  const handleUncheckAll = () => setSelected([]);
  const handleInverse = () => setSelected(trunks.map((_, idx) => selected.includes(idx) ? null : idx).filter(i => i !== null));
  const handleDelete = () => {
    setTrunks(trunks.filter((_, idx) => !selected.includes(idx)));
    setSelected([]);
  };
  const handleClearAll = () => {
    setTrunks([]);
    setSelected([]);
    setPage(1);
  };

  const columns = getTableColumns();

  // Add refs and state for custom scrollbar
  const tableScrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({ left: 0, width: 0, scrollWidth: 0 });

  useEffect(() => {
    const el = tableScrollRef.current;
    if (el) {
      setScrollState({ left: el.scrollLeft, width: el.clientWidth, scrollWidth: el.scrollWidth });
    }
  }, [trunks, columns.length, page]);

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
  // Calculate thumb size and position
  const thumbWidth = scrollState.width && scrollState.scrollWidth
    ? Math.max(40, (scrollState.width / scrollState.scrollWidth) * (scrollState.width - 8))
    : 40;
  const thumbLeft = scrollState.width && scrollState.scrollWidth && scrollState.scrollWidth > scrollState.width
    ? ((scrollState.left / (scrollState.scrollWidth - scrollState.width)) * (scrollState.width - thumbWidth - 16))
    : 0;

  return (
    <div className={`bg-white min-h-[calc(100vh-128px)] flex flex-col items-center ${trunks.length === 0 ? 'justify-center' : 'justify-start'} box-border`}>
      {trunks.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="text-gray-800 text-2xl mb-6">No available SIP trunk!</div>
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
            onClick={handleOpenModal}
          >
            Add New
          </Button>
        </div>
      ) : (
        <>
          <div className="w-full max-w-7xl mx-auto bg-white rounded-lg mt-8 shadow-sm overflow-hidden">
            {/* Blue Bar Header - outside table container for seamless corners */}
            <div
              style={{
                width: '100%',
                height: 36,
                background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: 18,
                color: '#222',
                justifyContent: 'center',
                boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
                border: '2px solid #888',
                borderBottom: 'none',
                maxWidth: '100%',
              }}
            >
              SIP Trunk
            </div>
            <div
              style={{
                width: '100%',
                maxWidth: '100%',
                margin: '0 auto',
                background: '#f8fafd',
                border: '2px solid #888',
                borderRadius: 8,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderTop: 'none',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderBottom: 'none',
              }}
            >
              <div
                ref={tableScrollRef}
                onScroll={handleTableScroll}
                style={{
                  overflowX: 'auto',
                  overflowY: 'auto',
                  maxHeight: 240, // fits about 6 rows
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <table
                  style={{
                    width: '100%',
                    minWidth: `${(columns.length + 1) * 150}px`, // +1 for Modify
                    borderCollapse: 'collapse',
                  }}
                >
                  <thead>
                    <tr style={{ minHeight: 32 }}>
                      {columns.map(col => (
                        <th
                          key={col.key}
                          style={{
                            background: '#fff', color: '#222', fontWeight: 600, fontSize: 15, border: '1px solid #bbb', padding: '6px 8px', whiteSpace: 'nowrap', textAlign: 'center',
                            position: 'sticky', top: 0, zIndex: 2,
                          }}
                        >
                          {col.label}
                        </th>
                      ))}
                      <th style={{ background: '#fff', color: '#222', fontWeight: 600, fontSize: 15, border: '1px solid #bbb', padding: '6px 8px', whiteSpace: 'nowrap', textAlign: 'center', position: 'sticky', top: 0, zIndex: 2 }}>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedTrunks.map((trunk, idx) => {
                      const realIdx = (page - 1) * itemsPerPage + idx;
                      return (
                        <tr key={realIdx} style={{ minHeight: 32 }}>
                          <td style={{ border: '1px solid #bbb', padding: '6px 8px', fontSize: 14, background: '#fff', textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <input
                              type="checkbox"
                              checked={selected.includes(realIdx)}
                              onChange={() => handleSelectRow(realIdx)}
                            />
                          </td>
                          {SIP_TRUNK_FIELDS.map(field => (
                            <td
                              key={field.key}
                              style={{ border: '1px solid #bbb', padding: '6px 8px', fontSize: 14, background: '#fff', textAlign: 'center', whiteSpace: 'nowrap' }}
                            >
                              {field.type === 'checkbox'
                                ? (trunk[field.key] === true ? 'Yes' : trunk[field.key] === false ? 'No' : '--')
                                : (trunk[field.key] !== undefined && trunk[field.key] !== null && trunk[field.key] !== '' ? trunk[field.key] : '--')}
                            </td>
                          ))}
                          <td style={{ border: '1px solid #bbb', padding: '6px 8px', background: '#fff', textAlign: 'center' }}>
                            <button onClick={() => handleOpenModal(trunk, realIdx)} className="text-blue-600 hover:text-blue-800"><EditDocumentIcon fontSize="small" /></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Custom scrollbar row */}
            <div style={customScrollbarRowStyle}>
              <div style={customScrollbarArrowStyle} onClick={() => handleArrowClick('left')}>&#9664;</div>
              <div
                style={customScrollbarTrackStyle}
                onClick={handleScrollbarDrag}
              >
                <div
                  style={{
                    ...customScrollbarThumbStyle,
                    width: thumbWidth,
                    left: thumbLeft,
                  }}
                  draggable
                  onDrag={handleScrollbarDrag}
                />
              </div>
              <div style={customScrollbarArrowStyle} onClick={() => handleArrowClick('right')}>&#9654;</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full overflow-x-auto">
            <div className="flex flex-wrap items-center justify-between gap-2 w-full max-w-7xl mx-auto bg-gray-200 rounded-lg border border-gray-300 border-t-0 mt-0 p-2">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleCheckAll}>Check All</button>
                <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleUncheckAll}>Uncheck All</button>
                <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleInverse}>Inverse</button>
                <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleDelete}>Delete</button>
                <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleClearAll}>Clear All</button>
              </div>
              <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-6 py-2 min-w-[120px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={handleOpenModal}>Add New</button>
            </div>
          </div>

          {/* Pagination */}
          <div className="w-full overflow-x-auto">
            <div className="flex flex-wrap items-center gap-2 w-full max-w-7xl mx-auto bg-gray-200 rounded-lg border border-gray-300 border-t-0 mt-1 p-2 text-sm text-gray-700">
              <span>{trunks.length} items Total</span>
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
          </div>
        </>
      )}

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
          SIP Trunk
        </DialogTitle>
        <DialogContent className="pt-3 pb-0 px-2" style={{padding: '12px 8px 0 8px'}}>
          <div className="flex flex-col gap-2 w-full">
            {SIP_TRUNK_FIELDS.filter(field => field.key !== 'username' && field.key !== 'registerStatus').map(field => (
              <div
                key={field.key}
                className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1 gap-2"
                style={{ minHeight: 32 }}
              >
                <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:180, marginRight:10}}>
                  {field.label}:
                </label>
                <div className="flex-1">
                  {field.type === 'text' && field.key === 'index' && (
                    <TextField
                      type="text"
                      value={form[field.key]}
                      size="small"
                      fullWidth
                      variant="outlined"
                      inputProps={{ style: { fontSize: 14, padding: '3px 6px' }, readOnly: true }}
                    />
                  )}
                  {field.type === 'text' && field.key !== 'index' && (
                    <TextField
                      type="text"
                      value={form[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      size="small"
                      fullWidth
                      variant="outlined"
                      inputProps={{ style: { fontSize: 14, padding: '3px 6px' } }}
                    />
                  )}
                  {field.type === 'select' && (
                    <FormControl size="small" fullWidth>
                      <Select
                        value={form[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        variant="outlined"
                        sx={{ fontSize: 14 }}
                      >
                        {field.options.map(opt => (
                          <MenuItem key={opt} value={opt} sx={{ fontSize: 14 }}>{opt}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  {field.type === 'checkbox' && field.key === 'sipAgent' && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!form[field.key]}
                          onChange={() => handleCheckbox(field.key)}
                          size="small"
                        />
                      }
                      label={<span className="text-xs">Enable</span>}
                      className="text-xs"
                    />
                  )}
                  {field.type === 'checkbox' && field.key !== 'sipAgent' && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!form[field.key]}
                          onChange={() => handleCheckbox(field.key)}
                          size="small"
                        />
                      }
                      label={<span className="text-xs">{field.labelAfter || ''}</span>}
                      className="text-xs"
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
    </div>
  );
};

export default SipTrunkPage;
