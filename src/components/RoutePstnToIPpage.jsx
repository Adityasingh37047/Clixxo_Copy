import React, { useState, useRef } from 'react';
import {
  ROUTE_PSTN_IP_FIELDS,
  ROUTE_PSTN_IP_INITIAL_FORM,
  ROUTE_PSTN_IP_TABLE_COLUMNS
} from '../constants/RoutePstnToIPConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select as MuiSelect, MenuItem } from '@mui/material';

const RoutePstnToIPPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(ROUTE_PSTN_IP_INITIAL_FORM);
  const [rules, setRules] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(rules.length / itemsPerPage));
  const pagedRules = rules.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const tableScrollRef = useRef(null);

  // Modal logic
  const handleOpenModal = (item = null, index = -1) => {
    setFormData(item ? { ...item, originalIndex: index } : ROUTE_PSTN_IP_INITIAL_FORM);
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
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  // Table selection logic
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
  const handlePageChange = (newPage) => setPage(Math.max(1, Math.min(totalPages, newPage)));

  return (
    <div className={`bg-white min-h-[calc(100vh-128px)] flex flex-col items-center ${rules.length === 0 ? 'justify-center' : 'justify-start'} box-border p-4 md:p-10`}>
      {/* Empty State */}
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
          >Add New</Button>
        </div>
      ) : (
        <div className="w-full">
          {/* Table Container */}
          <div className="w-full max-w-full mx-auto bg-[#f8fafd] border-2 border-gray-400 rounded-t-lg shadow-sm overflow-x-auto">
            <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg mb-0 flex items-center font-semibold text-lg text-[#222] justify-center shadow-[0_2px_8px_0_rgba(80,160,255,0.10)] border-b-2 border-gray-400">
              PSTN-&gt;IP Routing Rule
            </div>
            <div ref={tableScrollRef} className="overflow-x-auto scrollbar-hide">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 whitespace-nowrap">Check</th>
                    {ROUTE_PSTN_IP_TABLE_COLUMNS.map(c => (
                      <th key={c.key} className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 whitespace-nowrap">{c.label}</th>
                    ))}
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 whitespace-nowrap">Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedRules.map((item, idx) => {
                    const realIdx = (page - 1) * itemsPerPage + idx;
                    return (
                      <tr key={realIdx}>
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">
                          <input type="checkbox" checked={selected.includes(realIdx)} onChange={() => handleSelectRow(idx)} />
                        </td>
                        {ROUTE_PSTN_IP_TABLE_COLUMNS.map(col => (
                          <td key={col.key} className="border border-gray-300 px-2 py-1 text-center bg-white">{item[col.key] || '--'}</td>
                        ))}
                        <td className="border border-gray-300 px-2 py-1 text-center bg-white">
                          <Button
                            variant="text"
                            sx={{ minWidth: 0, p: 0.5, borderRadius: 1, background: 'transparent', '&:hover': { background: 'transparent' } }}
                            onClick={() => handleOpenModal(item, realIdx)}
                          >
                            <EditDocumentIcon sx={{ color: '#1976d2', fontSize: 22 }} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* Action Bar */}
          <div className="w-full max-w-full mx-auto flex flex-wrap justify-between items-center bg-[#e3e7ef] rounded-b-lg border border-t-0 border-gray-300 mt-0 px-2 py-2 gap-2">
            <div className="flex flex-wrap gap-2">
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleCheckAll}>Check All</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleUncheckAll}>Uncheck All</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleInverse}>Inverse</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleDelete}>Delete</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleClearAll}>Clear All</button>
            </div>
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
                px: 4,
                py: 1,
                boxShadow: '0 2px 8px #b3e0ff',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
                  color: '#fff',
                },
              }}
              onClick={() => handleOpenModal()}
            >Add New</Button>
          </div>
          {/* Pagination Bar */}
          <div className="w-full max-w-full mx-auto">
            <div className="flex flex-wrap items-center gap-2 w-full bg-gray-200 rounded-lg border border-gray-300 border-t-0 mt-1 p-2 text-sm text-gray-700">
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
      {/* Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth={false} className="z-50" PaperProps={{ sx: { width: 440, maxWidth: '95vw', mx: 'auto', p: 0 } }}>
        <DialogTitle className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center font-semibold p-2 text-base">
          PSTN-&gt;IP Routing Rule
        </DialogTitle>
        <DialogContent className="pt-3 pb-0 px-2" style={{padding: '12px 8px 0 8px'}}>
          <div className="flex flex-col gap-2 w-full">
            {ROUTE_PSTN_IP_FIELDS.map(field => (
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
                    <MuiSelect
                      value={formData[field.key] || ''}
                      onChange={e => handleInputChange(field.key, e.target.value)}
                      size="small"
                      fullWidth
                      variant="outlined"
                      sx={{ fontSize: 14 }}
                    >
                      {field.options.map(opt => (
                        <MenuItem key={opt} value={opt} sx={{ fontSize: 14 }}>{opt}</MenuItem>
                      ))}
                    </MuiSelect>
                  ) : (
                    <TextField
                      type={field.type}
                      value={formData[field.key] || ''}
                      onChange={e => handleInputChange(field.key, e.target.value)}
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
          >Save</Button>
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
          >Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoutePstnToIPPage; 