import React, { useState, useRef, useEffect } from 'react';
import { IP_ROUTING_TABLE_COLUMNS, IP_ROUTING_TABLE_MODAL_FIELDS, IP_ROUTING_TABLE_INITIAL_ROW } from '../constants/IPRoutingTableConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { Button } from '@mui/material';

const tableContainerStyle = {
  background: '#fff',
  borderRadius: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  width: '100%',
  minHeight: 400,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  paddingTop:'20px',
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

const buttonSx = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontSize: 18,
  px: 6,
  py: 1.5,
  borderRadius: 2,
  minWidth: 120,
  boxShadow: '0 2px 8px #b3e0ff',
  fontWeight: 500,
  mr: 2,
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
  },
};

const grayButtonSx = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
  fontSize: 18,
  px: 6,
  py: 1.5,
  borderRadius: 2,
  minWidth: 120,
  boxShadow: '0 2px 8px #b3e0ff',
  fontWeight: 500,
  mr: 2,
  '&:hover': {
    background: 'linear-gradient(to bottom, #bfc6d1 0%, #e3e7ef 100%)',
  },
};

const IPRoutingTable = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ ...IP_ROUTING_TABLE_INITIAL_ROW });

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
      setForm({ ...rows[rowIdx] });
    } else {
      setForm({ ...IP_ROUTING_TABLE_INITIAL_ROW, no: rows.length });
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
        { ...form, checked: false, no: rows.length },
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

  return (
    <div className="w-full max-w-[1400px] mx-auto p-2 md:p-6 flex flex-col items-center min-h-[calc(100vh-80px)]">
      <div style={tableContainerStyle}>
        <div style={blueBarStyle}>IP Routing Table</div>
        <div style={contentAreaStyle} className="overflow-x-auto">
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table className="min-w-full" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  {IP_ROUTING_TABLE_COLUMNS.map((col) => (
                    <th key={col.key} style={{ ...thStyle, minWidth: col.width }}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody ref={tableScrollRef} onScroll={handleTableScroll} style={{ maxHeight: 400, overflowY: 'auto' }}>
                {displayRows.map((row, idx) =>
                  row ? (
                    <tr key={idx}>
                      <td style={tdStyle}>
                        <input type="checkbox" checked={row.checked || false} onChange={() => handleCheck(idx)} />
                      </td>
                      <td style={tdStyle}>{row.no}</td>
                      <td style={tdStyle}>{row.destination}</td>
                      <td style={tdStyle}>{row.gateway}</td>
                      <td style={tdStyle}>{row.subnetMask}</td>
                      <td style={tdStyle}>{row.networkPort}</td>
                      <td style={tdStyle}>
                        <EditDocumentIcon style={{ color: '#1976d2', fontSize: 22, cursor: 'pointer' }} onClick={() => openModal(idx)} />
                      </td>
                    </tr>
                  ) : (
                    <tr key={idx}>
                      {IP_ROUTING_TABLE_COLUMNS.map((col) => (
                        <td key={col.key} style={emptyRowStyle}></td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 py-2 gap-4 bg-[#f4f6fa] border-t border-gray-300">
          <div className="flex gap-2">
            <Button variant="contained" sx={grayButtonSx} onClick={handleDelete}>Delete</Button>
            <Button variant="contained" sx={grayButtonSx} onClick={handleClearAll}>ClearAll</Button>
          </div>
          <Button variant="contained" sx={buttonSx} onClick={() => openModal(null)}>Add New</Button>
        </div>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div style={legacyModalOverlay}>
          <div style={legacyModalBox}>
            <div style={legacyModalHeader}>Routing Table</div>
            {IP_ROUTING_TABLE_MODAL_FIELDS.map((field) => (
              <div key={field.key} style={{ marginBottom: 8 }}>
                <label style={legacyModalLabel}>{field.label}:</label>
                {field.type === 'text' || field.type === 'number' ? (
                  <input
                    type={field.type}
                    name={field.key}
                    value={form[field.key]}
                    onChange={handleFormChange}
                    style={legacyModalInput}
                  />
                ) : null}
                {field.type === 'select' ? (
                  <select
                    name={field.key}
                    value={form[field.key]}
                    onChange={handleFormChange}
                    style={legacyModalInput}
                  >
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : null}
              </div>
            ))}
            <div style={legacyModalButtonBar}>
              <button style={legacySaveButton} onClick={handleSave}>Save</button>
              <button style={legacyCloseButton} onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPRoutingTable; 