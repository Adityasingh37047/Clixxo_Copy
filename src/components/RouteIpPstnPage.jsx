import React, { useState, useRef, useEffect } from 'react';
import {
  ROUTE_IP_PSTN_FIELDS,
  ROUTE_IP_PSTN_INITIAL_FORM,
  ROUTE_IP_PSTN_TABLE_COLUMNS
} from '../constants/RouteIPtoPstnConstants';
import { FaPencilAlt } from 'react-icons/fa';
import { Button, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select as MuiSelect, MenuItem, FormControl } from '@mui/material';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

const LOCAL_STORAGE_KEY = 'routeIpPstnRules';

const blueBarStyle = {
  width: '100%', height: 36, background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginBottom: 0, display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 18, color: '#2266aa', justifyContent: 'center', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};
const tableContainerStyle = {
  width: '100%', maxWidth: '100%', margin: '0 auto', background: '#f8fafd', border: '2px solid #888', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
};
const tableStyle = {
  width: '100%', borderCollapse: 'collapse',
};
const thStyle = {
  background: '#fff', color: '#222', fontWeight: 600, fontSize: 15, border: '1px solid #bbb', padding: '6px 8px', whiteSpace: 'nowrap',
};
const tdStyle = {
  border: '1px solid #bbb', padding: '6px 8px', fontSize: 14, background: '#fff', textAlign: 'center', whiteSpace: 'nowrap',
};
const tableButtonStyle = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222', fontSize: 15, padding: '4px 18px', border: '1px solid #bbb', borderRadius: 6, boxShadow: '0 1px 2px rgba(0,0,0,0.10)', cursor: 'pointer', fontWeight: 500,
};
const addNewButtonStyle = {
  ...tableButtonStyle, background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff',
};
const paginationBarStyle = {
  display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#222', background: '#e3e7ef', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTop: '1px solid #bbb', padding: '2px 8px', marginTop: 0, minHeight: 32,
};
const paginationButtonStyle = {
  ...tableButtonStyle, fontSize: 13, padding: '2px 10px', minWidth: 0, borderRadius: 4,
};
const pageSelectStyle = {
  fontSize: 13, padding: '2px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff',
};
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
};
const modalStyle = {
  background: '#f8fafd', border: '2px solid #222', borderRadius: 6, width: 440, maxWidth: '95vw', marginTop: 80, boxShadow: '0 8px 32px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column',
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
  width: 160, fontSize: 14, color: '#222', textAlign: 'left', marginRight: 10, whiteSpace: 'nowrap',
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

const RouteIpPstnPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(ROUTE_IP_PSTN_INITIAL_FORM);
  const [rules, setRules] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(rules.length / itemsPerPage));
  const pagedRules = rules.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleOpenModal = (item = null, index = -1) => {
    setFormData(item ? { ...item, originalIndex: index } : ROUTE_IP_PSTN_INITIAL_FORM);
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

  const rootStyle = { 
    background: '#fff', 
    minHeight: 'calc(100vh - 128px)',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: rules.length === 0 ? 'center' : 'flex-start',
    position: 'relative',
    boxSizing: 'border-box'
  };

  return (
    <div style={rootStyle}>
      {rules.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center py-16">
          <div className="text-gray-800 text-2xl mb-6">No available routing rule!</div>
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
        <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          <div style={{ ...blueBarStyle, border: '2px solid #888', borderBottom: 'none', color: '#222', maxWidth: '100%' }}>IP-&gt;PSTN Routing Rule</div>
          <div style={{ border: '2px solid #888', borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, background: '#f8fafd', margin: 0, boxShadow: 'none' }}>
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1100px] border-collapse table-auto">
                        <thead>
                            <tr>
                    <th className="bg-white text-gray-800 font-semibold text-sm border border-gray-300 px-2 py-1 whitespace-nowrap">Check</th>
                    {ROUTE_IP_PSTN_TABLE_COLUMNS.map(c => (
                      <th key={c.key} className="bg-white text-gray-800 font-semibold text-sm border border-gray-300 px-2 py-1 whitespace-nowrap">{c.label}</th>
                    ))}
                    <th className="bg-white text-gray-800 font-semibold text-sm border border-gray-300 px-2 py-1 whitespace-nowrap">Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagedRules.map((item, idx) => {
                                const realIdx = (page - 1) * itemsPerPage + idx;
                                return (
                      <tr key={realIdx} style={{ borderBottom: '1px solid #bbb', height: 48 }}>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">
                          <Checkbox checked={selected.includes(realIdx)} onChange={() => handleSelectRow(idx)} size="small" />
                        </td>
                        {ROUTE_IP_PSTN_TABLE_COLUMNS.map(col => (
                          <td key={col.key} className="border border-gray-300 px-2 py-1 text-center bg-white">{item[col.key] || '--'}</td>
                        ))}
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">
                          <button onClick={() => handleOpenModal(item, realIdx)} className="text-blue-600 hover:text-blue-800">
                            <EditDocumentIcon fontSize="small" />
                          </button>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
          <div className="flex flex-wrap items-center justify-between gap-2 w-full max-w-7xl mx-auto bg-gray-200 rounded-lg border border-gray-300 border-t-0 mt-0 p-2">
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleCheckAll}>Check All</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleUncheckAll}>Uncheck All</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleInverse}>Inverse</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleDelete}>Delete</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleClearAll}>Clear All</button>
            </div>
            <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-6 py-2 min-w-[120px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={() => handleOpenModal()}>Add New</button>
                </div>
          <div className="w-full overflow-x-auto">
            <div className="flex flex-wrap items-center gap-2 w-full max-w-7xl mx-auto bg-gray-200 rounded-lg border border-gray-300 border-t-0 mt-1 p-2 text-sm text-gray-700">
                <span>{rules.length} items Total</span>
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
        </div>
      )}

      {isModalOpen && (
        <Dialog 
          open={isModalOpen} 
          onClose={handleCloseModal}
          maxWidth={false}
          className="z-50"
          PaperProps={{
            sx: { width: 440, maxWidth: '95vw', mx: 'auto', p: 0 }
          }}
        >
          <DialogTitle className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center font-semibold p-2 text-base">
            IP-&gt;PSTN Routing Rule
          </DialogTitle>
          <DialogContent className="pt-3 pb-0 px-2" style={{padding: '12px 8px 0 8px'}}>
            <div className="flex flex-col gap-2 w-full">
              {ROUTE_IP_PSTN_FIELDS.map(field => (
                <div
                  key={field.key}
                  className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1 gap-2"
                  style={{ minHeight: 32 }}
                >
                  <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left" style={{width:160, marginRight:10}}>
                    {field.label}
                  </label>
                  <div className="flex-1">
                    {field.type === 'select' ? (
                      <FormControl fullWidth size="small">
                        <MuiSelect
                          value={formData[field.key] || ''}
                          onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                          size="small"
                          fullWidth
                          variant="outlined"
                          sx={{ fontSize: 14 }}
                        >
                          {field.options.map(opt => (
                            <MenuItem key={opt} value={opt} sx={{ fontSize: 14 }}>{opt}</MenuItem>
                          ))}
                        </MuiSelect>
                      </FormControl>
                    ) : (
                      <TextField
                        type={field.type}
                        value={formData[field.key] || ''}
                        onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
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
      )}
  </div>
  );
};

export default RouteIpPstnPage;
