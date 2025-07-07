import React, { useState, useRef, useEffect } from 'react';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import {
  PCM_TRUNK_INDEX_OPTIONS,
  PCM_TRUNK_PCM_NO_OPTIONS,
  PCM_TRUNK_TS_COUNT,
  PCM_TRUNK_INITIAL_FORM,
  PCM_TRUNK_ITEMS_PER_PAGE
} from '../constants/PcmTrunkConstants';

const LOCAL_STORAGE_KEY = 'pcm_trunks';
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
};
const modalStyle = {
  background: '#f8fafd', border: '2px solid #222', borderRadius: 6, width: 400, maxWidth: '95vw', marginTop: 80, boxShadow: '0 8px 32px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column',
};
const modalHeaderStyle = {
  background: 'linear-gradient(to bottom, #23272b 0%, #6e7a8a 100%)', color: '#fff', fontWeight: 600, fontSize: 18, padding: '10px 0', textAlign: 'center', borderTopLeftRadius: 4, borderTopRightRadius: 4,
};
const modalBodyStyle = {
  padding: '12px 16px 0 16px', display: 'flex', flexDirection: 'column', gap: 8,
};
const modalRowStyle = {
  display: 'flex', alignItems: 'center', marginBottom: 8, gap: 10,
};
const modalLabelStyle = {
  width: 110, fontSize: 14, color: '#222', textAlign: 'left', marginRight: 10, whiteSpace: 'nowrap',
};
const modalInputStyle = {
  width: 120, fontSize: 14, padding: '3px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff',
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
  ...modalButtonStyle, width: 120, marginRight: 12, fontSize: 16, padding: '7px 32px',
};
const batchAddButtonStyle = {
  ...modalButtonGrayStyle, width: 120, fontSize: 16, padding: '7px 32px',
};
const tableContainerStyle = {
  width: '100%', maxWidth: 1200, margin: '0 auto', background: '#fff', border: '2px solid #d3d3d3', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
};
const blueBarStyle = {
  width: '100%', height: 36, background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginBottom: 0, display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 18, color: '#2266aa', justifyContent: 'center', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};
const thStyle = {
  background: '#fff',
  color: '#222',
  fontWeight: 600,
  fontSize: 15,
  border: '1px solid #d3d3d3',
  padding: '4px 24px',
  whiteSpace: 'nowrap',
  height: 32,
};
const tdStyle = {
  border: '1px solid #d3d3d3',
  padding: '4px 24px',
  fontSize: 14,
  background: '#fff',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  height: 32,
};
const tableButtonStyle = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222', fontSize: 15, padding: '4px 18px', border: '1px solid #bbb', borderRadius: 6, boxShadow: '0 1px 2px rgba(0,0,0,0.10)', cursor: 'pointer', fontWeight: 500,
};
const addNewTableButtonStyle = {
  ...tableButtonStyle, background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', marginLeft: 12, minWidth: 120
};
const paginationButtonStyle = {
  ...tableButtonStyle, fontSize: 13, padding: '2px 10px', minWidth: 0, borderRadius: 4,
};
const pageSelectStyle = {
  fontSize: 13, padding: '2px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff',
};

const PcmTrunkPage = () => {
  const [trunks, setTrunks] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(PCM_TRUNK_INITIAL_FORM);
  const [checkAll, setCheckAll] = useState(true);
  const [selected, setSelected] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(trunks.length / PCM_TRUNK_ITEMS_PER_PAGE));
  const pagedTrunks = trunks.slice((page - 1) * PCM_TRUNK_ITEMS_PER_PAGE, page * PCM_TRUNK_ITEMS_PER_PAGE);

  const handleOpenModal = (item = null, idx = -1) => {
    setForm(item ? { ...item } : PCM_TRUNK_INITIAL_FORM);
    setEditIndex(idx);
    setCheckAll(item ? item.ts.every(Boolean) : true);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleTSChange = idx => {
    const newTs = [...form.ts];
    newTs[idx] = !newTs[idx];
    setForm(prev => ({ ...prev, ts: newTs }));
    setCheckAll(newTs.every(Boolean));
  };

  const handleCheckAllTs = () => {
    const newVal = !checkAll;
    setCheckAll(newVal);
    setForm(prev => ({ ...prev, ts: Array(PCM_TRUNK_TS_COUNT).fill(newVal) }));
  };

  const handleSave = () => {
    setTrunks(prev => {
      let updated;
      if (editIndex > -1) {
        updated = [...prev];
        updated[(page - 1) * PCM_TRUNK_ITEMS_PER_PAGE + editIndex] = form;
      } else {
        updated = [...prev, form];
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setIsModalOpen(false);
    setEditIndex(-1);
  };

  // Table actions
  const handleSelectRow = idx => {
    const realIdx = (page - 1) * PCM_TRUNK_ITEMS_PER_PAGE + idx;
    setSelected(sel => sel.includes(realIdx) ? sel.filter(i => i !== realIdx) : [...sel, realIdx]);
  };
  const handleCheckAllRows = () => setSelected(trunks.map((_, idx) => idx));
  const handleUncheckAllRows = () => setSelected([]);
  const handleInverse = () => setSelected(trunks.map((_, idx) => !selected.includes(idx) ? idx : null).filter(i => i !== null));
  const handleDelete = () => {
    const newTrunks = trunks.filter((_, idx) => !selected.includes(idx));
    setTrunks(newTrunks);
    setSelected([]);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTrunks));
  };
  const handleClearAll = () => {
    setTrunks([]);
    setSelected([]);
    setPage(1);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };
  const handlePageChange = (newPage) => setPage(Math.max(1, Math.min(totalPages, newPage)));

  // UI
  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 0, margin: 0 }}>
      {trunks.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <div style={{ color: '#222', fontSize: 22, marginBottom: 32 }}>No available PCM trunk!</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <button
              style={{
                background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 16,
                border: '1.2px solid #1976d2',
                borderRadius: 6,
                padding: '7px 32px',
                minWidth: 120,
                boxShadow: '0 2px 6px #0002',
                cursor: 'pointer',
                marginRight: 0
              }}
              onClick={() => handleOpenModal()}
            >
              Add New
            </button>
            <button
              style={{
                background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 16,
                border: '1.2px solid #1976d2',
                borderRadius: 6,
                padding: '7px 32px',
                minWidth: 120,
                boxShadow: '0 2px 6px #0002',
                cursor: 'pointer',
                marginLeft: 0
              }}
            >
              Batch Add
            </button>
          </div>
        </div>
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ ...tableContainerStyle, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: 'none', maxWidth: 1200, width: '100%' }}>
            <div style={{ ...blueBarStyle, borderBottom: '2px solid #888' }}>PCM Trunks</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Check</th>
                  <th style={thStyle}>Index</th>
                  <th style={thStyle}>PCM NO.</th>
                  <th style={thStyle}>Including Ts</th>
                  <th style={thStyle}>Modify</th>
                </tr>
              </thead>
              <tbody>
                {pagedTrunks.map((trunk, idx) => (
                  <tr key={idx}>
                    <td style={tdStyle}><input type="checkbox" checked={selected.includes((page - 1) * PCM_TRUNK_ITEMS_PER_PAGE + idx)} onChange={() => handleSelectRow(idx)} /></td>
                    <td style={tdStyle}>{trunk.index}</td>
                    <td style={tdStyle}>{trunk.pcmNo}</td>
                    <td style={tdStyle}>{trunk.ts.map((checked, i) => checked ? i : null).filter(i => i !== null).join(',')}</td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <button
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 32, width: 32 }}
                          onClick={() => handleOpenModal(trunk, idx)}
                          className="edit-icon-btn"
                        >
                          <EditDocumentIcon style={{ fontSize: 28, color: '#0e8fd6', transition: 'color 0.2s, transform 0.2s' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#e3e7ef', borderRadius: 8, border: '1px solid #d3d3d3', borderTop: 'none', marginTop: 0, padding: '8px 8px 8px 8px' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={tableButtonStyle} onClick={handleCheckAllRows}>Check All</button>
              <button style={tableButtonStyle} onClick={handleUncheckAllRows}>Uncheck All</button>
              <button style={tableButtonStyle} onClick={handleInverse}>Inverse</button>
              <button style={tableButtonStyle} onClick={handleDelete}>Delete</button>
              <button style={tableButtonStyle} onClick={handleClearAll}>Clear All</button>
            </div>
            <button style={addNewTableButtonStyle} onClick={() => handleOpenModal()}>Add New</button>
          </div>
          <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', background: '#e3e7ef', borderRadius: 8, border: '1px solid #d3d3d3', borderTop: 'none', marginTop: 4, padding: '2px 8px 2px 8px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 32 }}>
            <span>{trunks.length} items Total</span>
            <span style={{marginLeft:'8px'}}>{PCM_TRUNK_ITEMS_PER_PAGE} Items/Page</span>
            <span style={{flexGrow: 1}}></span>
            <span>{page}/{totalPages}</span>
            <button style={paginationButtonStyle} onClick={() => handlePageChange(1)} disabled={page === 1}>First</button>
            <button style={paginationButtonStyle} onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
            <button style={paginationButtonStyle} onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
            <button style={paginationButtonStyle} onClick={() => handlePageChange(totalPages)} disabled={page === totalPages}>Last</button>
            <span>Go to Page</span>
            <select style={pageSelectStyle} value={page} onChange={e => handlePageChange(Number(e.target.value))}>
              {Array.from({ length: totalPages }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
            </select>
            <span>{totalPages} Pages Total</span>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>PCM Trunk</div>
            <div style={modalBodyStyle}>
              {/* Index Block */}
              <div style={{ background: '#fff', border: '1px solid #d3d3d3', borderRadius: 4, padding: '8px 12px', marginBottom: 10, width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 18 }}>
                <label style={{ fontWeight: 500, fontSize: 15, minWidth: 80, marginBottom: 0, marginRight: 8 }}>Index:</label>
                <select value={form.index} onChange={e => handleFormChange('index', Number(e.target.value))} style={{ ...modalInputStyle, maxWidth: 120, height: 32, padding: '2px 8px', fontSize: 15, marginBottom: 0, minWidth: 0 }}>
                  {PCM_TRUNK_INDEX_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              {/* PCM NO. Block */}
              <div style={{ background: '#fff', border: '1px solid #d3d3d3', borderRadius: 4, padding: '8px 12px', marginBottom: 10, width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 18 }}>
                <label style={{ fontWeight: 500, fontSize: 15, minWidth: 80, marginBottom: 0, marginRight: 8 }}>PCM NO.:</label>
                <select value={form.pcmNo} onChange={e => handleFormChange('pcmNo', Number(e.target.value))} style={{ ...modalInputStyle, maxWidth: 120, height: 32, padding: '2px 8px', fontSize: 15, marginBottom: 0, minWidth: 0 }}>
                  {PCM_TRUNK_PCM_NO_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              {/* Including Ts Block */}
              <div style={{ background: '#fff', border: '1px solid #d3d3d3', borderRadius: 4, padding: '8px 12px', marginBottom: 10, width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 12 }}>
                <label style={{ fontWeight: 500, fontSize: 15, minWidth: 80, marginBottom: 0 }}>Including Ts:</label>
                <input type="checkbox" checked={checkAll} onChange={handleCheckAllTs} style={{ marginRight: 8 }} />
                <span style={{ fontWeight: 500 }}>Check All</span>
              </div>
              {/* TS Checkboxes Block */}
              <div style={{ background: '#fff', border: '1px solid #d3d3d3', borderRadius: 4, padding: 8, marginBottom: 8, width: '100%', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
                {form.ts.map((checked, idx) => (
                  <label key={idx} style={{ display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 500, marginBottom: 0, padding: '2px 0', minHeight: 28, borderBottom: (idx % 4 === 3 && idx !== 31) ? '1px solid #eee' : 'none', borderRight: (idx % 4 !== 3) ? '1px solid #eee' : 'none', paddingLeft: 4 }}>
                    <input type="checkbox" checked={checked} onChange={() => handleTSChange(idx)} style={{ marginRight: 4 }} />
                    TS[{idx}]
                  </label>
                ))}
              </div>
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

export default PcmTrunkPage;

<style>{`
  .edit-icon-btn:hover svg {
    color: #1976d2 !important;
    transform: scale(1.18);
  }
`}</style> 