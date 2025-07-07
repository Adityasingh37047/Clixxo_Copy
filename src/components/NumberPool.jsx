import React, { useState, useRef, useEffect } from 'react';
import { NUMBER_POOL_COLUMNS, NUMBER_POOL_GROUPS } from '../constants/NumberPoolConstants';
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

const NumberPool = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ groupNo: 0, noInGroup: 1, numberRangeStart: '', numberRangeEnd: '' });

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
      const row = rows[rowIdx];
      // Split numberRange if possible
      let start = '', end = '';
      if (row.numberRange && row.numberRange.includes('--')) {
        [start, end] = row.numberRange.split('--');
      }
      setForm({ groupNo: row.groupNo, noInGroup: row.noInGroup, numberRangeStart: start, numberRangeEnd: end });
    } else {
      setForm({ groupNo: 0, noInGroup: 1, numberRangeStart: '', numberRangeEnd: '' });
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
    const numberRange = form.numberRangeStart && form.numberRangeEnd ? `${form.numberRangeStart}--${form.numberRangeEnd}` : '';
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = {
        ...updatedRows[editIndex],
        groupNo: Number(form.groupNo),
        noInGroup: Number(form.noInGroup),
        numberRange,
      };
      setRows(updatedRows);
    } else {
      setRows([
        ...rows,
        {
          id: Date.now(),
          checked: false,
          groupNo: Number(form.groupNo),
          noInGroup: Number(form.noInGroup),
          numberRange,
        },
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

  // Calculate thumb size and position
  // Thumb can only move between the arrows (20px top and bottom)
  const thumbArea = 400 - 40; // 400px height - 20px for each arrow
  const thumbHeight = scrollState.height && scrollState.scrollHeight ? Math.max(30, (scrollState.height / scrollState.scrollHeight) * thumbArea) : 30;
  const maxThumbTop = thumbArea - thumbHeight;
  const thumbTop = scrollState.height && scrollState.scrollHeight && scrollState.scrollHeight > scrollState.height ? ((scrollState.top / (scrollState.scrollHeight - scrollState.height)) * maxThumbTop) : 0;

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 8 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={tableContainerStyle}>
          <div style={blueBarStyle}>Number Pool</div>
          <div style={contentAreaStyle}>
            <div style={{ position: 'relative', height: 400, width: '100%' }}>
              <div
                ref={tableScrollRef}
                onScroll={handleTableScroll}
                style={{ height: 400, overflowY: 'auto', width: '100%', paddingRight: 18, borderBottomLeftRadius: 8 }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto', borderBottomLeftRadius: 8 }}>
                  <thead>
                    <tr>
                      {NUMBER_POOL_COLUMNS.map((col, i) => (
                        <th key={col.key} style={{ ...thStyle, width: i === 0 ? 40 : i === 1 ? 70 : i === 2 ? 90 : i === 3 ? 120 : 60 }}>{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayRows.map((row, idx) =>
                      row ? (
                        <tr key={row.id}>
                          <td style={{ ...tdStyle, width: 40 }}><input type="checkbox" checked={row.checked} onChange={() => handleCheck(idx)} /></td>
                          <td style={{ ...tdStyle, width: 70 }}>{row.groupNo}</td>
                          <td style={{ ...tdStyle, width: 90 }}>{row.noInGroup}</td>
                          <td style={{ ...tdStyle, width: 120 }}>{row.numberRange}</td>
                          <td style={{ ...tdStyle, width: 60, textAlign: 'center', verticalAlign: 'middle', height: 48 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                              <EditDocumentIcon style={{ color: '#1976d2', fontSize: 22, cursor: 'pointer' }} onClick={() => openModal(idx)} />
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr key={idx}>
                          <td style={{ ...emptyRowStyle, width: 40, color: '#aaa' }}>&nbsp;</td>
                          <td style={{ ...emptyRowStyle, width: 70, color: '#aaa' }}>&nbsp;</td>
                          <td style={{ ...emptyRowStyle, width: 90, color: '#aaa' }}>&nbsp;</td>
                          <td style={{ ...emptyRowStyle, width: 120, color: '#aaa' }}>&nbsp;</td>
                          <td style={{ ...emptyRowStyle, width: 60, color: '#aaa' }}>&nbsp;</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              {/* Custom vertical scrollbar */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 2,
                width: 16,
                height: 400,
                background: '#e3e7ef',
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
              }}>
                {/* Up arrow */}
                <div
                  style={{
                    width: 16,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                  onClick={() => {
                    if (tableScrollRef.current) {
                      tableScrollRef.current.scrollTop -= 40;
                    }
                  }}
                >
                  <svg width="12" height="8" viewBox="0 0 12 8"><polygon points="6,2 11,7 1,7" fill="#444" /></svg>
                </div>
                {/* Scrollbar thumb */}
                <div
                  style={{
                    position: 'absolute',
                    left: 3,
                    width: 10,
                    height: thumbHeight,
                    top: 20 + thumbTop,
                    background: '#888',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseDown={e => {
                    const startY = e.clientY;
                    const startTop = scrollState.top;
                    const thumbArea = 400 - 40; // 20px for each arrow
                    const maxThumbTop = thumbArea - thumbHeight;
                    const maxScroll = scrollState.scrollHeight - scrollState.height;
                    const onMove = moveEvent => {
                      if (!tableScrollRef.current) return;
                      const delta = moveEvent.clientY - startY;
                      let newThumbTop = Math.min(Math.max(0, thumbTop + delta), maxThumbTop);
                      let newScrollTop = (newThumbTop / maxThumbTop) * maxScroll;
                      tableScrollRef.current.scrollTop = newScrollTop;
                    };
                    const onUp = () => {
                      window.removeEventListener('mousemove', onMove);
                      window.removeEventListener('mouseup', onUp);
                    };
                    window.addEventListener('mousemove', onMove);
                    window.addEventListener('mouseup', onUp);
                  }}
                />
                {/* Down arrow */}
                <div
                  style={{
                    width: 16,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                  onClick={() => {
                    if (tableScrollRef.current) {
                      tableScrollRef.current.scrollTop += 40;
                    }
                  }}
                >
                  <svg width="12" height="8" viewBox="0 0 12 8"><polygon points="1,1 11,1 6,7" fill="#444" /></svg>
                </div>
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
            minWidth: 380,
            background: '#e9edf2',
            border: '2px solid #222',
            boxShadow: '0 4px 24px #0005',
            padding: '0 24px 18px 24px',
          }}>
            <div style={{
              ...legacyModalHeader,
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
            }}>Number Pool</div>
            <div>
              {/* Group block */}
              <div style={{
                border: '1px solid #bfc6c9',
                borderRadius: 4,
                background: '#fff',
                marginBottom: 12,
                padding: '6px 8px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <label style={{ ...legacyModalLabel, width: 120, marginBottom: 0 }}>Group:</label>
                <select name="groupNo" value={form.groupNo} onChange={handleFormChange} style={{ ...legacyModalInput, width: 180, marginBottom: 0, background: '#fafdff', border: '1px solid #bbb' }}>
                  {NUMBER_POOL_GROUPS.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
              {/* No. in Group block */}
              <div style={{
                border: '1px solid #bfc6c9',
                borderRadius: 4,
                background: '#fff',
                marginBottom: 12,
                padding: '6px 8px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <label style={{ ...legacyModalLabel, width: 120, marginBottom: 0 }}>No. in Group:</label>
                <input name="noInGroup" type="number" min="1" value={form.noInGroup} onChange={handleFormChange} style={{ ...legacyModalInput, width: 180, marginBottom: 0, background: '#fafdff', border: '1px solid #bbb' }} />
              </div>
              {/* Number Range block, two bordered rows */}
              <div style={{
                border: '1px solid #bfc6c9',
                borderRadius: '4px 4px 0 0',
                background: '#fff',
                marginBottom: 0,
                padding: '6px 8px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <label style={{ ...legacyModalLabel, width: 120, marginBottom: 0 }}>Number Range:</label>
                <input name="numberRangeStart" value={form.numberRangeStart} onChange={handleFormChange} style={{ ...legacyModalInput, width: 180, marginBottom: 0, background: '#fafdff', border: '1px solid #bbb' }} />
              </div>
              <div style={{
                border: '1px solid #bfc6c9',
                borderTop: 'none',
                borderRadius: '0 0 4px 4px',
                background: '#fff',
                marginBottom: 18,
                padding: '6px 8px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ display: 'inline-block', width: 120 }}></span>
                <span style={{ display: 'inline-block', minWidth: 18, textAlign: 'center', fontWeight: 600, fontSize: 18, color: '#888', marginRight: 8 }}>--</span>
                <input name="numberRangeEnd" value={form.numberRangeEnd} onChange={handleFormChange} style={{ ...legacyModalInput, width: 180, marginBottom: 0, background: '#fafdff', border: '1px solid #bbb' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 18 }}>
                <button onClick={handleSave} style={{
                  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 15,
                  border: '1px solid #1976d2',
                  borderRadius: 4,
                  padding: '6px 32px',
                  minWidth: 90,
                  boxShadow: '0 2px 6px #0002',
                  cursor: 'pointer',
                }}>Save</button>
                <button onClick={closeModal} style={{
                  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
                  color: '#222',
                  fontWeight: 600,
                  fontSize: 15,
                  border: '1px solid #bbb',
                  borderRadius: 4,
                  padding: '6px 32px',
                  minWidth: 90,
                  boxShadow: '0 2px 6px #0002',
                  cursor: 'pointer',
                }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberPool; 