import React, { useState, useRef, useEffect } from 'react';
import { FILTERING_RULE_COLUMNS, FILTERING_RULE_DROPDOWN_OPTIONS } from '../constants/FilteringRuleConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

const tableContainerStyle = {
  background: '#fff',
  borderRadius: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  width: '100%',
  minHeight: 400,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};
const contentAreaStyle = {
  border: '2px solid #444',
  borderTop: 'none',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  background: '#fff',
  width: '100%',
  position: 'relative',
  marginTop: 0,
  paddingTop: 0,
};
const blueBarStyle = {
  width: '100%',
  height: 32,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: 17,
  color: '#111',
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
  borderBottom: 'none',
};
const thStyle = {
  background: '#fff', color: '#222', fontWeight: 600, fontSize: 15, border: '1px solid #bbb', padding: '6px 8px', whiteSpace: 'nowrap', textAlign: 'center',
};
const tdStyle = {
  border: '1px solid #bbb', padding: '6px 8px', fontSize: 14, background: '#fff', textAlign: 'center', whiteSpace: 'nowrap', height: 40,
};
const emptyRowStyle = {
  ...tdStyle,
  borderBottom: '1px solid #bbb',
  background: '#fff',
  height: 40,
};
const buttonStyle = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', borderRadius: 6, padding: '7px 32px', minWidth: 100, boxShadow: '0 2px 6px #0002', cursor: 'pointer', margin: '0 8px',
};
const grayButtonStyle = {
  ...buttonStyle, background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222',
};
const legacyModalOverlay = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 1000,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
const legacyModalBox = {
  background: '#f4f6fa',
  borderRadius: 6,
  boxShadow: '0 4px 24px #0005',
  minWidth: 340,
  maxWidth: '90vw',
  padding: '0 24px 18px 24px',
  border: '2px solid #222',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
};
const legacyModalHeader = {
  background: 'linear-gradient(to bottom, #3b4a56 0%, #222 100%)',
  color: '#fff',
  fontWeight: 500,
  fontSize: 16,
  padding: '10px 0 8px 0',
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  textAlign: 'center',
  margin: '-2px -24px 18px -24px',
  letterSpacing: 0.2,
};
const legacyModalLabel = { fontWeight: 500, marginBottom: 2, fontSize: 14 };
const legacyModalInput = { width: '100%', fontSize: 14, padding: '4px 8px', borderRadius: 3, border: '1px solid #bbb', background: '#fafdff', marginBottom: 10, height: 28 };
const legacyModalButtonBar = { display: 'flex', justifyContent: 'center', gap: 18, marginTop: 8 };
const legacySaveButton = { background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 15, border: '1px solid #1976d2', borderRadius: 4, padding: '6px 32px', minWidth: 90, boxShadow: '0 2px 6px #0002', cursor: 'pointer' };
const legacyCloseButton = { background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222', fontWeight: 600, fontSize: 15, border: '1px solid #bbb', borderRadius: 4, padding: '6px 32px', minWidth: 90, boxShadow: '0 2px 6px #0002', cursor: 'pointer' };

const MIN_ROWS = 10;
const initialForm = {
  no: 0,
  callerIdWhitelist: 'none',
  calleeIdWhitelist: 'none',
  callerIdBlacklist: 'none',
  calleeIdBlacklist: 'none',
  callerIdPoolWhitelist: 'none',
  callerIdPoolBlacklist: 'none',
  calleeIdPoolWhitelist: 'none',
  calleeIdPoolBlacklist: 'none',
  originalCallerIdPoolWhitelist: 'none',
  originalCallerIdPoolBlacklist: 'none',
  description: 'default',
};

const FilteringRule = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState(initialForm);

  // Custom scrollbar state
  const tableScrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({ top: 0, height: 0, scrollHeight: 0 });

  const handleTableScroll = (e) => {
    setScrollState({
      top: e.target.scrollTop,
      height: e.target.clientHeight,
      scrollHeight: e.target.scrollHeight,
    });
  };

  useEffect(() => {
    if (tableScrollRef.current) {
      setScrollState({
        top: tableScrollRef.current.scrollTop,
        height: tableScrollRef.current.clientHeight,
        scrollHeight: tableScrollRef.current.scrollHeight,
      });
    }
  }, [rows.length]);

  const openModal = (rowIdx = null) => {
    setEditIndex(rowIdx);
    if (rowIdx !== null) {
      setForm(rows[rowIdx]);
    } else {
      setForm(initialForm);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditIndex(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = { ...form };
      setRows(updatedRows);
    } else {
      setRows([
        ...rows,
        { ...form, no: rows.length },
      ]);
    }
    closeModal();
  };

  const handleCheck = (idx) => {
    setRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, checked: !row.checked } : row))
    );
  };

  const handleDelete = () => {
    setRows(rows.filter((row) => !row.checked));
  };

  const handleClearAll = () => {
    setRows([]);
  };

  // Fill up to MIN_ROWS for grid look
  const displayRows = [
    ...rows,
    ...Array.from({ length: Math.max(0, MIN_ROWS - rows.length) }).map(() => null),
  ];

  // Custom scrollbar logic (same as Number Pool)
  const thumbArea = 400 - 40;
  const thumbHeight = scrollState.height && scrollState.scrollHeight ? Math.max(30, (scrollState.height / scrollState.scrollHeight) * thumbArea) : 30;
  const maxThumbTop = thumbArea - thumbHeight;
  const thumbTop = scrollState.height && scrollState.scrollHeight && scrollState.scrollHeight > scrollState.height ? ((scrollState.top / (scrollState.scrollHeight - scrollState.height)) * maxThumbTop) : 0;

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 8 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={tableContainerStyle}>
          <div style={blueBarStyle}>Filtering Rule</div>
          <div style={contentAreaStyle}>
            <div style={{ position: 'relative', height: 400, width: '100%' }}>
              <div
                ref={tableScrollRef}
                onScroll={handleTableScroll}
                style={{ height: 400, overflowY: 'auto', width: '100%', borderBottomLeftRadius: 8 }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', borderBottomLeftRadius: 8 }}>
                  <thead>
                    <tr>
                      {FILTERING_RULE_COLUMNS.map((col, i) => (
                        <th key={col.key} style={{ ...thStyle, width: i === 0 ? 40 : i === 1 ? 50 : i === FILTERING_RULE_COLUMNS.length - 2 ? 120 : i === FILTERING_RULE_COLUMNS.length - 1 ? 60 : 140 }}>{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayRows.map((row, idx) =>
                      row ? (
                        <tr key={row.no}>
                          <td style={{ ...tdStyle, width: 40 }}><input type="checkbox" checked={row.checked || false} onChange={() => handleCheck(idx)} /></td>
                          <td style={{ ...tdStyle, width: 50 }}>{row.no}</td>
                          <td style={{ ...tdStyle, width: 140 }}>{row.callerIdWhitelist}</td>
                          <td style={{ ...tdStyle, width: 140 }}>{row.calleeIdWhitelist}</td>
                          <td style={{ ...tdStyle, width: 140 }}>{row.callerIdBlacklist}</td>
                          <td style={{ ...tdStyle, width: 140 }}>{row.calleeIdBlacklist}</td>
                          <td style={{ ...tdStyle, width: 140 }}>{row.callerIdPoolWhitelist}</td>
                          <td style={{ ...tdStyle, width: 140 }}>{row.callerIdPoolBlacklist}</td>
                          <td style={{ ...tdStyle, width: 140 }}>{row.calleeIdPoolWhitelist}</td>
                          <td style={{ ...tdStyle, width: 140 }}>{row.calleeIdPoolBlacklist}</td>
                          <td style={{ ...tdStyle, width: 140 }}>{row.originalCallerIdPoolWhitelist}</td>
                          <td style={{ ...tdStyle, width: 140 }}>{row.originalCallerIdPoolBlacklist}</td>
                          <td style={{ ...tdStyle, width: 120 }}>{row.description}</td>
                          <td style={{ ...tdStyle, width: 60, textAlign: 'center', verticalAlign: 'middle', height: 48 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                              <EditDocumentIcon style={{ color: '#1976d2', fontSize: 22, cursor: 'pointer' }} onClick={() => openModal(idx)} />
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr key={idx}>
                          {FILTERING_RULE_COLUMNS.map((col, i) => (
                            <td key={col.key} style={{ ...emptyRowStyle, color: '#aaa' }}>&nbsp;</td>
                          ))}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0 0 0', maxWidth: 1400, margin: '0 auto' }}>
          <div>
            <button style={grayButtonStyle} onClick={handleDelete}>Delete</button>
            <button style={grayButtonStyle} onClick={handleClearAll}>Clear All</button>
          </div>
          <button style={buttonStyle} onClick={() => openModal()}>Add New</button>
        </div>
      </div>
      {modalOpen && (
        <div style={legacyModalOverlay}>
          <div style={{
            ...legacyModalBox,
            minWidth: 420,
            background: '#e9edf2',
            border: '2px solid #222',
            boxShadow: '0 4px 24px #0005',
            padding: '0 24px 18px 24px',
          }}>
            <div style={legacyModalHeader}>Filtering Rule</div>
            <div>
              {/* Modal form fields, each in its own block */}
              <div style={{ border: '1px solid #bfc6c9', borderRadius: 4, background: '#fff', marginBottom: 10, padding: '6px 8px', display: 'flex', alignItems: 'center' }}>
                <label style={{ ...legacyModalLabel, width: 180, marginBottom: 0 }}>No.:</label>
                <input name="no" value={form.no} onChange={handleFormChange} style={{ ...legacyModalInput, width: 120, marginBottom: 0, background: '#fafdff', border: '1px solid #bbb' }} />
              </div>
              {[
                { key: 'callerIdWhitelist', label: 'CallerID Whitelist:' },
                { key: 'calleeIdWhitelist', label: 'CalleeID Whitelist:' },
                { key: 'callerIdBlacklist', label: 'CallerID Blacklist:' },
                { key: 'calleeIdBlacklist', label: 'CalleeID Blacklist:' },
                { key: 'callerIdPoolWhitelist', label: 'CallerID Pool in Whitelist:' },
                { key: 'callerIdPoolBlacklist', label: 'CallerID Pool in Blacklist:' },
                { key: 'calleeIdPoolWhitelist', label: 'CalleeID Pool in Whitelist:' },
                { key: 'calleeIdPoolBlacklist', label: 'CalleeID Pool in Blacklist:' },
                { key: 'originalCallerIdPoolWhitelist', label: 'Original CallerID Pool in Whitelist:' },
                { key: 'originalCallerIdPoolBlacklist', label: 'Original CallerID Pool in Blacklist:' },
              ].map(field => (
                <div key={field.key} style={{ border: '1px solid #bfc6c9', borderRadius: 4, background: '#fff', marginBottom: 10, padding: '6px 8px', display: 'flex', alignItems: 'center' }}>
                  <label style={{ ...legacyModalLabel, width: 180, marginBottom: 0 }}>{field.label}</label>
                  <select name={field.key} value={form[field.key]} onChange={handleFormChange} style={{ ...legacyModalInput, width: 120, marginBottom: 0, background: '#fafdff', border: '1px solid #bbb' }}>
                    {FILTERING_RULE_DROPDOWN_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
              <div style={{ border: '1px solid #bfc6c9', borderRadius: 4, background: '#fff', marginBottom: 18, padding: '6px 8px', display: 'flex', alignItems: 'center' }}>
                <label style={{ ...legacyModalLabel, width: 180, marginBottom: 0 }}>Description:</label>
                <input name="description" value={form.description} onChange={handleFormChange} style={{ ...legacyModalInput, width: 120, marginBottom: 0, background: '#fafdff', border: '1px solid #bbb' }} />
              </div>
              <div style={legacyModalButtonBar}>
                <button style={legacySaveButton} onClick={handleSave}>Save</button>
                <button style={legacyCloseButton} onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilteringRule; 