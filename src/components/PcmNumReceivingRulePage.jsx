import React, { useState, useRef, useEffect } from 'react';
import { NUM_RECEIVING_RULE_FIELDS, NUM_RECEIVING_RULE_INITIAL_FORM, NUM_RECEIVING_RULE_TABLE_COLUMNS } from '../constants/PcmNumReceivingRouleConstants';
import { FaPencilAlt } from 'react-icons/fa';

const LOCAL_STORAGE_KEY = 'numReceivingRules';

const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
};
const modalStyle = {
  background: '#f8fafd', border: '2px solid #222', borderRadius: 6, width: 340, maxWidth: '95vw', maxHeight: 'calc(100vh - 120px)', marginTop: 80, overflowY: 'auto', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column',
};
const modalHeaderStyle = {
  background: 'linear-gradient(to bottom, #23272b 0%, #6e7a8a 100%)', color: '#fff', fontWeight: 600, fontSize: 18, padding: '10px 0', textAlign: 'center', borderTopLeftRadius: 4, borderTopRightRadius: 4,
};
const modalBodyStyle = {
  padding: '12px 8px 0 8px', display: 'flex', flexDirection: 'column', gap: 8,
};
const modalRowStyle = {
  display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #c0c6cc', borderRadius: 4, padding: '6px 8px', marginBottom: 2, minHeight: 32, gap: 16,
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
const tableContainerStyle = {
  width: '100%', maxWidth: '100%', margin: '0 auto', background: '#f8fafd', border: '2px solid #888', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
};
const blueBarStyle = {
  width: '100%', height: 36, background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginBottom: 0, display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 18, color: '#2266aa', justifyContent: 'center', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
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
const paginationButtonStyle = {
  ...tableButtonStyle, fontSize: 13, padding: '2px 10px', minWidth: 0, borderRadius: 4,
};
const pageSelectStyle = {
  fontSize: 13, padding: '2px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff',
};

const PcmNumReceivingRulePage = () => {
  const [rules, setRules] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    // Example row as initial data
    return [{ index: 199, rule: '.', description: 'example' }];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(NUM_RECEIVING_RULE_INITIAL_FORM);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(rules.length / itemsPerPage));
  const pagedRules = rules.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rules));
  }, [rules]);

  const handleOpenModal = (item = null, index = -1) => {
    setFormData(item ? { ...item, originalIndex: index } : NUM_RECEIVING_RULE_INITIAL_FORM);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  // In the render, always show the example row as the first row, and always render a disabled checkbox for it
  const exampleRow = { index: 199, rule: '.', description: 'example' };
  let displayRules = [];
  if (page === 1) {
    // Example row first, then all paged user rows
    displayRules = [exampleRow, ...pagedRules];
  } else {
    displayRules = pagedRules;
  }

  return (
    <div style={{ background: '#fff', minHeight: 'calc(100vh - 128px)', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', boxSizing: 'border-box' }}>
      <div style={{width:'100%'}}>
        <div style={{ ...tableContainerStyle, borderBottomLeftRadius:0, borderBottomRightRadius:0, borderBottom:'none' }}>
          <div style={{ ...blueBarStyle, borderBottom: '2px solid #888' }}>Number-receiving Rule</div>
          <div style={{overflowX: 'visible'}}>
            <table style={{...tableStyle, minWidth: NUM_RECEIVING_RULE_TABLE_COLUMNS.length * 150 }}>
              <thead>
                <tr>{NUM_RECEIVING_RULE_TABLE_COLUMNS.map(c => <th key={c.key} style={thStyle}>{c.label}</th>)}</tr>
              </thead>
              <tbody>
                {displayRules.length === 0 ? (
                  <tr><td colSpan={NUM_RECEIVING_RULE_TABLE_COLUMNS.length} style={tdStyle}>No data</td></tr>
                ) : displayRules.map((item, idx) => {
                  // The example row is always the first row and is not selectable or editable
                  const isExample = page === 1 && idx === 0;
                  const realIdx = isExample ? 'example' : (page - 1) * itemsPerPage + (idx - (page === 1 ? 1 : 0));
                  return (
                    <tr key={realIdx}>
                      {NUM_RECEIVING_RULE_TABLE_COLUMNS.map(col => {
                        if (col.key === 'check') {
                          return (
                            <td key={col.key} style={tdStyle}>
                              {isExample ? (
                                <input type="checkbox" disabled />
                              ) : (
                                <input type="checkbox" checked={selected.includes(realIdx)} onChange={() => handleSelectRow(realIdx)} />
                              )}
                            </td>
                          );
                        }
                        if (col.key === 'modify') {
                          return (
                            <td key={col.key} style={tdStyle}>
                              {!isExample && (
                                <button onClick={() => handleOpenModal(item, realIdx)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                  <FaPencilAlt size={16} />
                                </button>
                              )}
                            </td>
                          );
                        }
                        return (
                          <td key={col.key} style={tdStyle}>
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
        </div>
        <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#e3e7ef', borderRadius: 8, border: '1px solid #bbb', borderTop: 'none', marginTop: 0, padding: '8px 8px 8px 8px' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={tableButtonStyle} onClick={handleCheckAllRows}>Check All</button>
            <button style={tableButtonStyle} onClick={handleUncheckAllRows}>Uncheck All</button>
            <button style={tableButtonStyle} onClick={() => setSelected(pagedRules.map((_, idx) => (page - 1) * itemsPerPage + idx).filter(i => !selected.includes(i)))}>Inverse</button>
            <button style={tableButtonStyle} onClick={() => { setRules(rules.filter((_, idx) => !selected.includes(idx))); setSelected([]); }}>Delete</button>
            <button style={tableButtonStyle} onClick={() => { setRules([]); setSelected([]); setPage(1); }}>Clear All</button>
          </div>
          <button style={{ ...addNewButtonStyle, position: 'static', margin: 0 }} onClick={() => handleOpenModal()}>Add New</button>
        </div>
        <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', background: '#e3e7ef', borderRadius: 8, border: '1px solid #bbb', borderTop: 'none', marginTop: 4, padding: '2px 8px 2px 8px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 32 }}>
          <span>{rules.length} items Total</span>
          <span style={{marginLeft:'8px'}}>{itemsPerPage} Items/Page</span>
          <span style={{flexGrow: 1}}></span>
          <span>{page}/{totalPages}</span>
          <button style={paginationButtonStyle} onClick={() => setPage(1)} disabled={page === 1}>First</button>
          <button style={paginationButtonStyle} onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
          <button style={paginationButtonStyle} onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
          <button style={paginationButtonStyle} onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last</button>
          <span>Go to Page</span>
          <select style={pageSelectStyle} value={page} onChange={e => setPage(Number(e.target.value))}>
            {Array.from({ length: totalPages }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
          </select>
          <span>{totalPages} Pages Total</span>
        </div>
        <div style={{ color: '#ff0000', fontSize: '12px', marginTop: '32px', textAlign: 'center', width: '100%' }}>
          Rule: "x"(lowercase) indicates a random number, "*" indicates multiple random characters.
        </div>
      </div>
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>Number-Receiving Rule</div>
            <div style={modalBodyStyle}>
              {NUM_RECEIVING_RULE_FIELDS.map((field) => (
                <div key={field.name} style={modalRowStyle}>
                  <label style={modalLabelStyle}>{field.label}:</label>
                  <div style={{ flex: 1 }}>
                    {field.type === 'select' ? (
                      <select name={field.name} value={formData[field.name]} onChange={handleInputChange} style={modalInputStyle}>
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input type={field.type} name={field.name} value={formData[field.name] || ''} onChange={handleInputChange} style={modalInputStyle} placeholder={field.placeholder || ''} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={modalFooterStyle}>
              <button onClick={handleSave} style={modalButtonStyle}>Save</button>
              <button onClick={handleCloseModal} style={modalButtonGrayStyle}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PcmNumReceivingRulePage; 


