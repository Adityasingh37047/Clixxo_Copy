import React, { useState, useRef, useEffect } from 'react';
import { CALLERID_RESERVE_POOL_FIELDS, CALLERID_RESERVE_POOL_TABLE_COLUMNS, CALLERID_RESERVE_POOL_INITIAL_FORM } from '../constants/CallerIDReservePoolConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

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
  width: 120, fontSize: 14, color: '#222', textAlign: 'left', marginRight: 10, whiteSpace: 'nowrap',
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
const redNoteStyle = {
  color: 'red', fontSize: 16, marginTop: 24, marginBottom: 8, textAlign: 'center',
};

const LOCAL_STORAGE_KEY = 'callerIdReservePool';

const CallerIDReservePool = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(CALLERID_RESERVE_POOL_INITIAL_FORM);
  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [selected, setSelected] = useState([]);

  const handleOpenModal = (item = null, index = -1) => {
    setFormData(item ? { ...item, originalIndex: index } : CALLERID_RESERVE_POOL_INITIAL_FORM);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = () => {
    const { originalIndex, ...dataToSave } = formData;
    setRows(prev => {
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

  const handleSelectRow = idx => {
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  };
  const handleCheckAll = () => setSelected(rows.map((_, idx) => idx));
  const handleUncheckAll = () => setSelected([]);
  const handleInverse = () => setSelected(rows.map((_, idx) => !selected.includes(idx) ? idx : null).filter(i => i !== null));
  const handleDelete = () => {
    setRows(rows.filter((_, idx) => !selected.includes(idx)));
    setSelected([]);
  };
  const handleClearAll = () => {
    setRows([]);
    setSelected([]);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  return (
    <div style={{ background: '#fff', minHeight: 'calc(100vh - 128px)', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: rows.length === 0 ? 'center' : 'flex-start', position: 'relative', boxSizing: 'border-box' }}>
      {rows.length === 0 ? (
        <div style={{ textAlign: 'center', marginBottom: '50vh' }}>
          <div style={{ color: '#222', fontSize: 22, marginBottom: 32 }}>
            No available CallerID Reserve!
          </div>
          <button
            style={{
              background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
              color: '#fff',
              fontSize: 16,
              padding: '7px 32px',
              border: 'none',
              borderRadius: 6,
              boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
              cursor: 'pointer',
            }}
            onClick={() => handleOpenModal()}
          >Add New</button>
          <div style={{ color: 'red', fontSize: 20, marginTop: 32 }}>
            Note: Don't change the number when using the number kept in pool!
          </div>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: 900 }}>
          <div style={blueBarStyle}>CallerID Reserve Pool</div>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ ...tableStyle, minWidth: 500 }}>
              <thead>
                <tr>
                  {CALLERID_RESERVE_POOL_TABLE_COLUMNS.map(col => (
                    <th key={col.key} style={thStyle}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    <td style={tdStyle}>
                      <input type="checkbox" checked={selected.includes(idx)} onChange={() => handleSelectRow(idx)} />
                    </td>
                    <td style={tdStyle}>{row.no}</td>
                    <td style={tdStyle}>{row.callerId}</td>
                    <td style={tdStyle}>
                      <EditDocumentIcon style={{ cursor: 'pointer', color: '#0e8fd6', display: 'block', margin: '0 auto' }} onClick={() => handleOpenModal(row, idx)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={tableButtonStyle} onClick={handleCheckAll}>Check All</button>
              <button style={tableButtonStyle} onClick={handleUncheckAll}>Uncheck All</button>
              <button style={tableButtonStyle} onClick={handleInverse}>Inverse</button>
              <button style={tableButtonStyle} onClick={handleDelete} disabled={selected.length === 0}>Delete</button>
              <button style={tableButtonStyle} onClick={handleClearAll}>Clear All</button>
            </div>
            <button style={addNewButtonStyle} onClick={() => handleOpenModal()}>Add New</button>
          </div>
          <div style={redNoteStyle}>Note: Don't change the number when using the number kept in pool!</div>
        </div>
      )}

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>CallerID</div>
            <div style={modalBodyStyle}>
              {CALLERID_RESERVE_POOL_FIELDS.map((field) => (
                <div key={field.name} style={modalRowStyle}>
                  <label style={modalLabelStyle}>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    style={modalInputStyle}
                    min={field.min}
                  />
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

export default CallerIDReservePool; 