import React, { useState } from 'react';
import { NUM_RECEIVING_RULE_FIELDS, NUM_RECEIVING_RULE_INITIAL_FORM, NUM_RECEIVING_RULE_TABLE_COLUMNS } from '../constants/PcmNumReceivingRouleConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const PcmNumReceivingRulePage = () => {
  const [rules, setRules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(NUM_RECEIVING_RULE_INITIAL_FORM);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(rules.length / itemsPerPage));
  const pagedRules = rules.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleOpenModal = (item = null, index = -1) => {
    setFormData(item ? { ...item, originalIndex: index } : NUM_RECEIVING_RULE_INITIAL_FORM);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const { originalIndex, ...dataToSave } = formData;
    setRules(prev => {
      if (originalIndex !== undefined && originalIndex > -1) {
        const updated = [...prev];
        updated[originalIndex] = dataToSave;
        return updated;
      }
      return [...prev, { ...dataToSave }];
    });
    setIsModalOpen(false);
  };

  const handleSelectRow = idx => {
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  };
  const handleCheckAllRows = () => {
    setSelected(pagedRules.map((_, idx) => (page - 1) * itemsPerPage + idx));
  };
  const handleUncheckAllRows = () => {
    setSelected([]);
  };
  const handleInverse = () => {
    setSelected(pagedRules.map((_, idx) => (page - 1) * itemsPerPage + idx).filter(i => !selected.includes(i)));
  };
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

  // Only show the example row if there are no user rules
  let displayRules = rules;

  return (
    <div className="bg-white min-h-[calc(100vh-128px)] flex flex-col items-center box-border">
      <div className="w-full max-w-6xl mx-auto">
        <div className="rounded-t-lg h-9 flex items-center justify-center font-semibold text-[18px] text-[#222] shadow-sm mt-8"
          style={{background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)'}}>
          Number-receiving Rule
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[700px] bg-[#f8fafd] border-2 border-t-0 border-gray-400 rounded-b-lg shadow-sm">
              <thead>
              <tr>{NUM_RECEIVING_RULE_TABLE_COLUMNS.map(c => <th key={c.key} className="bg-white text-gray-800 font-semibold text-sm border border-gray-300 px-3 py-2 whitespace-nowrap">{c.label}</th>)}</tr>
              </thead>
              <tbody>
                {displayRules.length === 0 ? (
                <tr><td colSpan={NUM_RECEIVING_RULE_TABLE_COLUMNS.length} className="border border-gray-300 px-2 py-1 text-center">No data</td></tr>
                ) : displayRules.map((item, idx) => {
                const realIdx = (page - 1) * itemsPerPage + idx;
                  return (
                    <tr key={realIdx}>
                      {NUM_RECEIVING_RULE_TABLE_COLUMNS.map(col => {
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
                              <EditDocumentIcon style={{ fontSize: 24, color: '#0e8fd6', transition: 'color 0.2s, transform 0.2s' }} />
                            </Button>
                            </td>
                          );
                        }
                      if (col.key === 'index') {
                        // Show 0-based index for user data
                        return (
                          <td key={col.key} className="border border-gray-300 px-2 py-1 text-center">
                            {(page - 1) * itemsPerPage + idx}
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
            <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleInverse}>Inverse</button>
            <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleDelete}>Delete</button>
            <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleClearAll}>Clear All</button>
          </div>
          <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-6 py-2 min-w-[120px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={() => handleOpenModal()}>Add New</button>
        </div>
        {/* Pagination */}
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
        <div className="text-red-600 text-xs mt-8 text-center w-full">
          Rule: "x"(lowercase) indicates a random number, "*" indicates multiple random characters.
        </div>
      </div>
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="xs" fullWidth>
        <DialogTitle className="bg-gradient-to-b from-[#23272b] to-[#6e7a8a] text-white text-center font-semibold text-lg">Number-Receiving Rule</DialogTitle>
        <DialogContent className="bg-[#f8fafd] flex flex-col gap-2 py-4">
              {NUM_RECEIVING_RULE_FIELDS.map((field) => (
            <div key={field.name} className="flex flex-row items-center border border-gray-200 rounded px-2 py-1 gap-2 w-full bg-white mb-2">
              <label className="text-[15px] text-gray-700 font-medium whitespace-nowrap text-left min-w-[120px] mr-2">{field.label}:</label>
              <div className="flex-1 min-w-0">
                    {field.type === 'select' ? (
                  <Select
                    value={formData[field.name]}
                    onChange={e => handleInputChange(field.name, e.target.value)}
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
                    onChange={e => handleInputChange(field.name, e.target.value)}
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

export default PcmNumReceivingRulePage; 


