import React, { useState, useRef, useEffect } from 'react';
import { PSTN_CALL_IN_CALLEEID_FIELDS, PSTN_CALL_IN_CALLEEID_TABLE_COLUMNS, PSTN_CALL_IN_CALLEEID_INITIAL_FORM } from '../constants/PSTNCallInCalleeIDConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select as MuiSelect, MenuItem, FormControl } from '@mui/material';

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
const paginationButtonSx = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
  fontWeight: 600,
  fontSize: 13,
  borderRadius: 1.5,
  minWidth: 60,
  boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
  textTransform: 'none',
  px: 1.25,
  py: 0.5,
  padding: '2px 10px',
  border: '1px solid #bbb',
  '&:hover': {
    background: 'linear-gradient(to bottom, #bfc6d1 0%, #e3e7ef 100%)',
    color: '#222',
  },
};

const PSTNCallInCalleeID = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(PSTN_CALL_IN_CALLEEID_INITIAL_FORM);
  const [rules, setRules] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(rules.length / itemsPerPage));
  const pagedRules = rules.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const tableScrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({ left: 0, width: 0, scrollWidth: 0 });

  const handleOpenModal = (item = null, index = -1) => {
    setFormData(item ? { ...item, originalIndex: index } : PSTN_CALL_IN_CALLEEID_INITIAL_FORM);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = () => {
    const { originalIndex, ...dataToSave } = formData;
    setRules(prev => {
      if (originalIndex !== undefined && originalIndex > -1) {
        const updated = [...prev];
        updated[originalIndex] = dataToSave;
        return updated;
      }
      return [...prev, dataToSave];
    });
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage) => setPage(Math.max(1, Math.min(totalPages, newPage)));

  const handleSelectRow = idx => {
    const realIdx = (page - 1) * itemsPerPage + idx;
    setSelected(sel => sel.includes(realIdx) ? sel.filter(i => i !== realIdx) : [...sel, realIdx]);
  };
  const handleCheckAll = () => setSelected(rules.map((_, idx) => idx));
  const handleUncheckAll = () => setSelected([]);
  const handleInverse = () => setSelected(rules.map((_, idx) => !selected.includes(idx) ? idx : null).filter(i => i !== null));
  const handleDelete = () => {
    setRules(rules.filter((_, idx) => !selected.includes(idx)));
    setSelected([]);
  };
  const handleClearAll = () => {
    setRules([]);
    setSelected([]);
    setPage(1);
  };

  const handleTableScroll = (e) => setScrollState({ left: e.target.scrollLeft, width: e.target.clientWidth, scrollWidth: e.target.scrollWidth });
  const handleScrollbarDrag = (e) => {
    const track = e.target.parentNode;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    if (tableScrollRef.current) tableScrollRef.current.scrollLeft = (scrollState.scrollWidth - scrollState.width) * percent;
  };
  const handleArrowClick = (dir) => {
    if (tableScrollRef.current) tableScrollRef.current.scrollLeft += (dir === 'left' ? -100 : 100);
  };

  useEffect(() => {
    if (tableScrollRef.current) {
      setScrollState({ left: tableScrollRef.current.scrollLeft, width: tableScrollRef.current.clientWidth, scrollWidth: tableScrollRef.current.scrollWidth });
    }
  }, [rules, page]);

  const thumbWidth = scrollState.width && scrollState.scrollWidth ? Math.max(40, (scrollState.width / scrollState.scrollWidth) * (scrollState.width - 8)) : 40;
  const thumbLeft = scrollState.width && scrollState.scrollWidth && scrollState.scrollWidth > scrollState.width ? ((scrollState.left / (scrollState.scrollWidth - scrollState.width)) * (scrollState.width - thumbWidth - 16)) : 0;

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-2 md:p-8">
      {rules.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
          <div className="text-gray-800 text-2xl md:text-[22px] font-semibold mb-8 text-center">No available number manipulation rule (PSTN Call In CalleeID)!</div>
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
        </div>
      ) : (
        <>
          <div className="w-full max-w-[1400px] mx-auto" style={{ border: '2px solid #bbb', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center font-semibold text-[17px] text-[#222] justify-center shadow border-b-0 rounded-t-lg">
              PSTN Call In CalleeID
            </div>
            <div className="overflow-x-auto w-full border-b border-gray-300" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: 'none' }}>
              <div
                ref={tableScrollRef}
                onScroll={handleTableScroll}
                style={{
                  overflowX: 'auto',
                  overflowY: 'auto',
                  maxHeight: 240,
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <table className="w-full min-w-[1400px] border border-gray-300 border-collapse whitespace-nowrap" style={{ tableLayout: 'auto', border: '1px solid #bbb' }}>
                  <thead>
                    <tr style={{ minHeight: 32 }}>{PSTN_CALL_IN_CALLEEID_TABLE_COLUMNS.map(c => <th key={c.key} className="bg-white text-[#222] font-semibold text-[15px] border border-gray-300 text-center" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{c.label}</th>)}</tr>
                  </thead>
                  <tbody>
                    {pagedRules.map((item, idx) => {
                      const realIdx = (page - 1) * itemsPerPage + idx;
                      return (
                        <tr key={realIdx} style={{ minHeight: 32 }}>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}><input type="checkbox" checked={selected.includes(realIdx)} onChange={() => handleSelectRow(idx)} /></td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{item.index}</td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{PSTN_CALL_IN_CALLEEID_FIELDS[1].options.find(opt => opt.value === item.callInitiator)?.label || item.callInitiator}</td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{item.callerIdPrefix}</td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{item.calleeIdPrefix}</td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{item.withOriginalCalleeId}</td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{item.strippedLeft}</td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{item.strippedRight}</td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{item.reservedRight}</td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{item.prefixToAdd}</td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{item.suffixToAdd}</td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}>{item.description}</td>
                          <td className="border border-gray-300 text-center bg-white" style={{ border: '1px solid #bbb', padding: '6px 8px', minHeight: 32, whiteSpace: 'nowrap' }}><EditDocumentIcon style={{ cursor: 'pointer', color: '#0e8fd6', display: 'block', margin: '0 auto' }} onClick={() => handleOpenModal(item, realIdx)} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Custom scrollbar row below the table */}
            <div style={{ width: '100%', margin: '0 auto', background: '#f4f6fa', display: 'flex', alignItems: 'center', height: 24, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, border: 'none', borderTop: 'none', padding: '0 4px', boxSizing: 'border-box' }}>
              <div style={{ width: 18, height: 18, background: '#e3e7ef', border: '1px solid #bbb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#888', cursor: 'pointer', userSelect: 'none' }} onClick={() => handleArrowClick('left')}>&#9664;</div>
              <div
                style={{ flex: 1, height: 12, background: '#e3e7ef', borderRadius: 8, position: 'relative', margin: '0 4px', overflow: 'hidden' }}
                onClick={handleScrollbarDrag}
              >
                <div
                  style={{
                    position: 'absolute',
                    height: 12,
                    background: '#888',
                    borderRadius: 8,
                    cursor: 'pointer',
                    top: 0,
                    width: thumbWidth,
                    left: thumbLeft,
                  }}
                  draggable
                  onDrag={handleScrollbarDrag}
                />
              </div>
              <div style={{ width: 18, height: 18, background: '#e3e7ef', border: '1px solid #bbb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#888', cursor: 'pointer', userSelect: 'none' }} onClick={() => handleArrowClick('right')}>&#9654;</div>
            </div>
          </div>
          {/* Action and pagination rows OUTSIDE the border, visually separated backgrounds and gap */}
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
          <div className="flex flex-wrap items-center gap-2 w-full px-2 py-2 text-[15px]" style={{ background: '#e3e7ef', marginTop: 8 }}>
            <span>{rules.length} Items Total</span>
            <span>{itemsPerPage} Items/Page</span>
            <span>{page}/{totalPages}</span>
            <Button variant="contained" disabled={page === 1} sx={paginationButtonSx} onClick={() => handlePageChange(1)}>First</Button>
            <Button variant="contained" disabled={page === 1} sx={paginationButtonSx} onClick={() => handlePageChange(page - 1)}>Previous</Button>
            <Button variant="contained" disabled={page === totalPages} sx={paginationButtonSx} onClick={() => handlePageChange(page + 1)}>Next</Button>
            <Button variant="contained" disabled={page === totalPages} sx={paginationButtonSx} onClick={() => handlePageChange(totalPages)}>Last</Button>
            <span>Go to Page</span>
            <MuiSelect
              size="small"
              value={page}
              sx={{ minWidth: 36, fontSize: 14, height: 32, ml: 1 }}
              onChange={e => handlePageChange(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>)}
            </MuiSelect>
            <span>{totalPages} Pages Total</span>
          </div>
        </>
      )}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth={false} PaperProps={{ sx: { maxWidth: '95vw', width: 440, background: '#f8fafd', borderRadius: 2, border: '2px solid #222' } }}>
        <DialogTitle className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center font-semibold p-3 text-base">PSTN-&gt;IP CalleeID Manipulation</DialogTitle>
        <DialogContent className="pt-3 pb-0 px-2" style={{padding: '12px 8px 0 8px'}}>
          <div className="flex flex-col gap-2 w-full">
            {PSTN_CALL_IN_CALLEEID_FIELDS.map((field) => (
              <div key={field.name} className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1 gap-2" style={{ minHeight: 32 }}>
                <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:180, marginRight:10}}>{field.label}</label>
                <div className="flex-1">
                  {field.type === 'select' ? (
                    <FormControl size="small" fullWidth>
                      <MuiSelect value={formData[field.name] || ''} onChange={e => handleInputChange({ target: { name: field.name, value: e.target.value } })} variant="outlined" sx={{ fontSize: 14 }}>
                        {field.options.map(opt => (
                          <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 14 }}>{opt.label}</MenuItem>
                        ))}
                      </MuiSelect>
                    </FormControl>
                  ) : (
                    <TextField type={field.type || 'text'} name={field.name} value={formData[field.name] || ''} onChange={handleInputChange} size="small" fullWidth variant="outlined" inputProps={{ style: { fontSize: 14, padding: '3px 6px' } }} />
                  )}
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

export default PSTNCallInCalleeID; 