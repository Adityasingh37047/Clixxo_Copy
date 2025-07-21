import React, { useState, useEffect, useRef } from 'react';
import { PCM_TRUNK_GROUP_FIELDS, PCM_TRUNK_GROUP_INITIAL_FORM, PCM_TRUNK_GROUP_TABLE_COLUMNS } from '../constants/PcmTrunkGroupConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
};
const modalStyle = {
  background: '#f8fafd',
  border: '2px solid #222',
  borderRadius: 6,
  width: 440,
  maxWidth: '95vw',
  maxHeight: 'calc(100vh - 120px)',
  marginTop: 80,
  overflowY: 'auto',
  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
  display: 'flex',
  flexDirection: 'column',
};
const modalHeaderStyle = {
  background: 'linear-gradient(to bottom, #23272b 0%, #6e7a8a 100%)', color: '#fff', fontWeight: 600, fontSize: 18, padding: '10px 0', textAlign: 'center', borderTopLeftRadius: 4, borderTopRightRadius: 4,
};
const modalBodyStyle = {
  padding: '12px 8px 0 8px', display: 'flex', flexDirection: 'column', gap: 8,
};
const modalRowStyle = {
  display: 'flex', alignItems: 'center', background: '#f4f6fa', border: '1px solid #c0c6cc', borderRadius: 4, padding: '6px 8px', marginBottom: 2, minHeight: 32, gap: 10,
};
const modalLabelStyle = {
  width: 180, fontSize: 14, color: '#222', textAlign: 'left', marginRight: 10, whiteSpace: 'nowrap',
};
const modalInputStyle = {
  width: '100%', fontSize: 14, padding: '3px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff',
};
const modalFooterStyle = {
  display: 'flex', justifyContent: 'center', gap: 24, padding: '18px 0',
};
const modalButtonStyle = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontSize: 16, padding: '6px 32px', border: 'none', borderRadius: 4, boxShadow: '0 2px 4px rgba(0,0,0,0.10)', cursor: 'pointer', minWidth: 90,
};
const modalButtonGrayStyle = {
  ...modalButtonStyle, background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222',
};
const addNewButtonStyle = {
  ...modalButtonStyle, marginTop: 24, minWidth: 120
};

const LOCAL_STORAGE_KEY = 'pcmTrunkGroups';

const PcmTrunkGroupPage = () => {
  const tableScrollRef = useRef(null);
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(PCM_TRUNK_GROUP_INITIAL_FORM);
  const [checkAll, setCheckAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(groups.length / itemsPerPage));
  const pagedGroups = groups.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(groups));
  }, [groups]);

  const handleOpenModal = (item = null, index = -1) => {
    setFormData(item ? { ...item, originalIndex: index } : PCM_TRUNK_GROUP_INITIAL_FORM);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // PCM Trunks (checkboxes)
  const handleTrunkCheckbox = (idx) => {
    setFormData((prev) => {
      const trunkStr = idx.toString();
      let newTrunks = prev.pcmTrunks.includes(trunkStr)
        ? prev.pcmTrunks.filter((t) => t !== trunkStr)
        : [...prev.pcmTrunks, trunkStr];
      return { ...prev, pcmTrunks: newTrunks };
    });
  };
  const handleCheckAll = () => {
    setCheckAll(true);
    setFormData((prev) => ({ ...prev, pcmTrunks: Array.from({ length: 1 }, (_, i) => i.toString()) })); // Only 0 for now
  };
  const handleUncheckAll = () => {
    setCheckAll(false);
    setFormData((prev) => ({ ...prev, pcmTrunks: [] }));
  };

  const handleSave = () => {
    const { originalIndex, ...dataToSave } = formData;
    setGroups(prev => {
      if (originalIndex !== undefined && originalIndex > -1) {
        const updated = [...prev];
        updated[originalIndex] = dataToSave;
        return updated;
      }
      return [...prev, { ...dataToSave }];
    });
    setIsModalOpen(false);
  };

  const rootStyle = {
    background: '#fff',
    minHeight: 'calc(100vh - 128px)',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: groups.length === 0 ? 'center' : 'flex-start',
    position: 'relative',
    boxSizing: 'border-box',
  };

  const addNewButtonStyleSip = {
    background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
    color: '#fff',
    fontSize: 16,
    padding: '7px 32px',
    border: 'none',
    borderRadius: 6,
    boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
    cursor: 'pointer',
    minWidth: 120,
    marginTop: 0,
  };

  const handleSelectRow = idx => {
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };
  const thStyle = {
    background: '#fff',
    color: '#222',
    fontWeight: 600,
    fontSize: 15,
    border: '1px solid #bbb',
    padding: '6px 8px',
    whiteSpace: 'nowrap',
  };
  const tdStyle = {
    border: '1px solid #bbb',
    padding: '6px 8px',
    fontSize: 14,
    background: '#fff',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  };

  // Add table scroll handler (for future custom scroll logic, matches SIP pages)
  const handleTableScroll = (e) => {
    // You can add custom scroll logic here if needed
  };

  // Add styles for table container, blue bar, scrollbar, buttons, and pagination (copied from SIP Register page)
  const tableContainerStyle = {
    width: '100%', maxWidth: '100%', margin: '0 auto', background: '#f8fafd', border: '2px solid #888', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  };
  const blueBarStyle = {
    width: '100%', height: 36, background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginBottom: 0, display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 18, color: '#2266aa', justifyContent: 'center', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
  };
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
  const tableButtonStyle = {
    background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222', fontSize: 15, padding: '4px 18px', border: '1px solid #bbb', borderRadius: 6, boxShadow: '0 1px 2px rgba(0,0,0,0.10)', cursor: 'pointer', fontWeight: 500,
  };
  const addNewButtonStyle = {
    ...tableButtonStyle, background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff',
  };
  const paginationButtonStyle = {
    ...tableButtonStyle, fontSize: 13, padding: '2px 10px', minWidth: 0, borderRadius: 4,
  };
  const pageSelectStyle = {
    fontSize: 13, padding: '2px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff',
  };

  // Fix Check All and Uncheck All to work on visible rows
  const handleCheckAllRows = () => {
    setSelected(pagedGroups.map((_, idx) => (page - 1) * itemsPerPage + idx));
  };
  const handleUncheckAllRows = () => {
    setSelected([]);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-128px)] flex flex-col items-center box-border">
      {groups.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center w-full h-full min-h-[calc(100vh-128px)]">
          <div className="text-gray-800 text-2xl mb-6">No available PCM trunk group!</div>
          <div className="flex flex-row gap-4">
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
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto">
          <div className="rounded-t-lg border-b-2 border-[#888] h-9 flex items-center justify-center font-semibold text-[18px] text-[#222] shadow-sm mt-8"
            style={{background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)'}}>
            PCM Trunk Group
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[900px] bg-[#f8fafd] border-2 border-gray-400 rounded-b-lg shadow-sm">
                <thead>
                <tr>
                  {PCM_TRUNK_GROUP_TABLE_COLUMNS.map(c => (
                    <th key={c.key} className="bg-white text-gray-800 font-semibold text-sm border border-gray-300 px-3 py-2 whitespace-nowrap">{c.label}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                  {pagedGroups.map((item, idx) => {
                    const realIdx = (page - 1) * itemsPerPage + idx;
                    return (
                      <tr key={realIdx}>
                        {PCM_TRUNK_GROUP_TABLE_COLUMNS.map(col => {
                          if (col.key === 'check') {
                            return (
                            <td key={col.key} className="border border-gray-300 px-2 py-1 text-center">
                                <input type="checkbox" checked={selected.includes(realIdx)} onChange={() => handleSelectRow(realIdx)} />
                              </td>
                            );
                          }
                          if (col.key === 'modify') {
                            return (
                            <td key={col.key} className="border border-gray-300 px-2 py-1 text-center">
                              <Button onClick={() => handleOpenModal(item, realIdx)} sx={{ minWidth: 0, p: 0, borderRadius: 1 }}>
                                <EditDocumentIcon style={{ fontSize: 28, color: '#0e8fd6', transition: 'color 0.2s, transform 0.2s' }} />
                              </Button>
                              </td>
                            );
                          }
                          if (col.key === 'pcmTrunks') {
                            return (
                            <td key={col.key} className="border border-gray-300 px-2 py-1 text-center">
                                {item.pcmTrunks && item.pcmTrunks.length > 0 ? item.pcmTrunks.join(', ') : '--'}
                              </td>
                            );
                          }
                          return (
                          <td key={col.key} className="border border-gray-300 px-2 py-1 text-center">
                              {item[col.key] !== undefined && item[col.key] !== '' ? item[col.key] : '--'}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          {/* Table controls */}
          <div className="flex flex-wrap justify-between items-center bg-[#e3e7ef] rounded-b-lg border border-t-0 border-gray-300 px-2 py-2 gap-2">
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleCheckAllRows}>Check All</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleUncheckAllRows}>Uncheck All</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={() => setSelected(pagedGroups.map((_, idx) => (page - 1) * itemsPerPage + idx).filter(i => !selected.includes(i)))}>Inverse</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={() => { setGroups(groups.filter((_, idx) => !selected.includes(idx))); setSelected([]); }}>Delete</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={() => { setGroups([]); setSelected([]); setPage(1); }}>Clear All</button>
            </div>
            <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-6 py-2 min-w-[120px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={() => handleOpenModal()}>Add New</button>
          </div>
          {/* Pagination */}
          <div className="flex flex-wrap items-center gap-2 w-full max-w-7xl mx-auto bg-gray-200 rounded-lg border border-gray-300 border-t-0 mt-1 p-2 text-sm text-gray-700">
            <span>{groups.length} items Total</span>
            <span>{itemsPerPage} Items/Page</span>
            <span>{page}/{totalPages}</span>
            <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400" onClick={() => setPage(1)} disabled={page === 1}>First</button>
            <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
            <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400" onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last</button>
            <span>Go to Page</span>
            <select className="text-xs rounded border border-gray-300 px-2 py-1 min-w-[48px]" value={page} onChange={e => setPage(Number(e.target.value))}>
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <span>{totalPages} Pages Total</span>
          </div>
        </div>
      )}
      {/* Modal Dialog */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="xs" fullWidth>
        <DialogTitle className="bg-gradient-to-b from-[#23272b] to-[#6e7a8a] text-white text-center font-semibold text-lg">PCM Trunk Group</DialogTitle>
        <DialogContent className="bg-[#f8fafd] flex flex-col gap-2 py-4">
              {PCM_TRUNK_GROUP_FIELDS.map((field) => (
            <div key={field.name} className="flex flex-row items-center border border-gray-200 rounded px-2 py-1 gap-2 w-full bg-white mb-2">
              <label className="text-[15px] text-gray-700 font-medium whitespace-nowrap text-left min-w-[160px] mr-2">{field.label}:</label>
              <div className="flex-1 min-w-0">
                    {field.type === 'select' ? (
                  <Select
                    value={formData[field.name]}
                    onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    size="small"
                    fullWidth
                    variant="outlined"
                    className="bg-white"
                    sx={{ maxWidth: '100%', minWidth: 0 }}
                  >
                    {field.options.map(option => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                  </Select>
                    ) : (
                  <TextField
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    size="small"
                    fullWidth
                    variant="outlined"
                    className="bg-white"
                    sx={{ maxWidth: '100%', minWidth: 0 }}
                    placeholder={field.placeholder || ''}
                  />
                    )}
                  </div>
                </div>
              ))}
          {/* PCM Trunks Block */}
          <div className="flex flex-col border border-gray-200 rounded bg-white p-2 mb-2 w-full">
            <div className="flex flex-row items-center justify-between mb-2">
              <span className="font-medium text-[15px] text-gray-700 min-w-[160px]">PCM Trunks:</span>
              <label className="flex items-center text-[14px] font-medium">
                <input type="checkbox" checked={formData.pcmTrunks && formData.pcmTrunks.length === 1 && formData.pcmTrunks[0] === '0'} onChange={e => e.target.checked ? setFormData(prev => ({ ...prev, pcmTrunks: ['0'] })) : setFormData(prev => ({ ...prev, pcmTrunks: [] }))} className="mr-2" /> Check All
                    </label>
                  </div>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center text-[14px] font-medium mb-0 py-1 min-h-[28px] border-b border-r border-gray-100 last:border-b-0 last:border-r-0 pl-1">
                      <input
                        type="checkbox"
                        checked={formData.pcmTrunks && formData.pcmTrunks.includes('0')}
                        onChange={() => handleTrunkCheckbox(0)}
                  className="mr-2"
                      />
                      0
                    </label>
                  </div>
                </div>
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

export default PcmTrunkGroupPage; 