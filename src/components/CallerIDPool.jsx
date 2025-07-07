import React, { useState, useEffect } from 'react';
import { CALLERID_POOL_TABLE_COLUMNS, CALLERID_POOL_MODAL_FIELDS, CALLERID_POOL_INITIAL_FORM } from '../constants/CallerIDPoolConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

const tableContainerStyle = {
  background: '#fff',
  border: '1.5px solid #888',
  borderRadius: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  width: '100%',
  minHeight: 400,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};
const blueBarStyle = {
  width: '100%',
  height: 32,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: 17,
  color: '#111',
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
  borderBottom: '1.5px solid #888',
};
const thStyle = {
  background: '#fff', color: '#222', fontWeight: 700, fontSize: 16, border: '1.5px solid #888', padding: '6px 6px', whiteSpace: 'nowrap', textAlign: 'center', verticalAlign: 'middle',
};
const tdStyle = {
  border: '1.5px solid #888', padding: '6px 6px', fontSize: 15, background: '#fff', textAlign: 'center', verticalAlign: 'middle', whiteSpace: 'nowrap', height: 32,
};
const emptyRowStyle = {
  ...tdStyle,
  borderBottom: '1.5px solid #888',
  background: '#fff',
  height: 32,
};
const buttonStyle = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', borderRadius: 6, padding: '7px 32px', minWidth: 100, boxShadow: '0 2px 6px #0002', cursor: 'pointer', margin: '0 8px',
};
const grayButtonStyle = {
  ...buttonStyle, background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222',
};

// Modal styles for legacy look
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

const LOCAL_STORAGE_KEY_IP_PSTN = 'callerid_pool_rows_ip_pstn';
const LOCAL_STORAGE_KEY_PSTN_IP = 'callerid_pool_rows_pstn_ip';

const CallerIDPool = () => {
  // Top controls state
  const [prefix, setPrefix] = useState('');
  const [startDate, setStartDate] = useState('');
  const [usageCycle, setUsageCycle] = useState('0');
  const [outboundCallerId, setOutboundCallerId] = useState('0');
  const [designationMode, setDesignationMode] = useState('SIP Side Reject');
  const [destinationPcm, setDestinationPcm] = useState('PCM');

  // Table states
  const [rowsIpPstn, setRowsIpPstn] = useState([]);
  const [checkedIpPstn, setCheckedIpPstn] = useState([]);
  const [rowsPstnIp, setRowsPstnIp] = useState([]);
  const [checkedPstnIp, setCheckedPstnIp] = useState([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(CALLERID_POOL_INITIAL_FORM);
  const [editIndex, setEditIndex] = useState(null);
  const [modalTable, setModalTable] = useState('ip_pstn'); // 'ip_pstn' or 'pstn_ip'

  // Load from localStorage
  useEffect(() => {
    const savedIpPstn = localStorage.getItem(LOCAL_STORAGE_KEY_IP_PSTN);
    if (savedIpPstn) setRowsIpPstn(JSON.parse(savedIpPstn));
    const savedPstnIp = localStorage.getItem(LOCAL_STORAGE_KEY_PSTN_IP);
    if (savedPstnIp) setRowsPstnIp(JSON.parse(savedPstnIp));
  }, []);
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_IP_PSTN, JSON.stringify(rowsIpPstn));
  }, [rowsIpPstn]);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PSTN_IP, JSON.stringify(rowsPstnIp));
  }, [rowsPstnIp]);

  // Checkbox handlers
  const handleCheck = (table, idx) => {
    if (table === 'ip_pstn') {
      setCheckedIpPstn(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
    } else {
      setCheckedPstnIp(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
    }
  };
  const handleCheckAll = (table) => {
    if (table === 'ip_pstn') {
      if (checkedIpPstn.length === rowsIpPstn.length) setCheckedIpPstn([]);
      else setCheckedIpPstn(rowsIpPstn.map((_, idx) => idx));
    } else {
      if (checkedPstnIp.length === rowsPstnIp.length) setCheckedPstnIp([]);
      else setCheckedPstnIp(rowsPstnIp.map((_, idx) => idx));
    }
  };
  const handleInverse = (table) => {
    if (table === 'ip_pstn') {
      setCheckedIpPstn(rowsIpPstn.map((_, idx) => (checkedIpPstn.includes(idx) ? null : idx)).filter(i => i !== null));
    } else {
      setCheckedPstnIp(rowsPstnIp.map((_, idx) => (checkedPstnIp.includes(idx) ? null : idx)).filter(i => i !== null));
    }
  };

  // Delete and Clear All handlers
  const handleDelete = (table) => {
    if (table === 'ip_pstn') {
      setRowsIpPstn(rows => rows.filter((_, idx) => !checkedIpPstn.includes(idx)));
      setCheckedIpPstn([]);
    } else {
      setRowsPstnIp(rows => rows.filter((_, idx) => !checkedPstnIp.includes(idx)));
      setCheckedPstnIp([]);
    }
  };
  const handleClear = (table) => {
    if (table === 'ip_pstn') {
      setRowsIpPstn([]);
      setCheckedIpPstn([]);
    } else {
      setRowsPstnIp([]);
      setCheckedPstnIp([]);
    }
  };

  // Modal handlers
  const handleAddNew = (table) => {
    setModalData(CALLERID_POOL_INITIAL_FORM);
    setEditIndex(null);
    setModalTable(table);
    setShowModal(true);
  };
  const handleEdit = (table, idx) => {
    setModalData(table === 'ip_pstn' ? rowsIpPstn[idx] : rowsPstnIp[idx]);
    setEditIndex(idx);
    setModalTable(table);
    setShowModal(true);
  };
  const handleModalChange = (key, value) => {
    setModalData(data => ({ ...data, [key]: value }));
  };
  const handleModalSave = () => {
    const dataToSave = {
      ...modalData,
      callerIdRange: `${modalData.callerIdRangeStart || ''}${modalData.callerIdRangeEnd ? '--' + modalData.callerIdRangeEnd : ''}`,
    };
    if (modalTable === 'ip_pstn') {
      if (editIndex !== null) {
        setRowsIpPstn(rows => rows.map((row, idx) => idx === editIndex ? dataToSave : row));
      } else {
        setRowsIpPstn(rows => [...rows, dataToSave]);
      }
    } else {
      if (editIndex !== null) {
        setRowsPstnIp(rows => rows.map((row, idx) => idx === editIndex ? dataToSave : row));
      } else {
        setRowsPstnIp(rows => [...rows, dataToSave]);
      }
    }
    setShowModal(false);
    setEditIndex(null);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setEditIndex(null);
  };

  // Top section Set button handler (no-op for now)
  const handleSet = (e) => {
    e.preventDefault();
    // Implement logic as needed
  };

  // Table rendering helper
  const renderTable = (rows, checked, tableKey, title) => {
    // Adjust columns for PSTN->IP: change label to 'Source PCM'
    const columns = tableKey === 'pstn_ip'
      ? CALLERID_POOL_TABLE_COLUMNS.map(col =>
          col.key === 'destinationPcm' ? { ...col, label: 'Source PCM' } : col
        )
      : CALLERID_POOL_TABLE_COLUMNS;
    return (
      <div style={{ width: '49%' }}>
        <div style={tableContainerStyle}>
          <div style={blueBarStyle}>{title}</div>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 800, borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  {columns.map(col => (
                    <th key={col.key} style={{ ...thStyle, width: col.width }}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ ...tdStyle, width: columns[0].width }}>
                      <input type="checkbox" checked={checked.includes(idx)} onChange={() => handleCheck(tableKey, idx)} />
                    </td>
                    <td style={{ ...tdStyle, width: columns[1].width }}>{row.no}</td>
                    <td style={{ ...tdStyle, width: columns[2].width }}>{row.callerIdRange}</td>
                    <td style={{ ...tdStyle, width: columns[3].width }}>{row.outgoingCallResource}</td>
                    <td style={{ ...tdStyle, width: columns[4].width }}>{row.destinationPcm}</td>
                    <td style={{ ...tdStyle, width: columns[5].width, textAlign: 'center', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <EditDocumentIcon style={{ color: '#1976d2', fontSize: 22, cursor: 'pointer' }} onClick={() => handleEdit(tableKey, idx)} />
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Only empty rows for spacing, no message row */}
                {rows.length < 10 && Array.from({ length: 10 - rows.length }).map((_, i) => (
                  <tr key={rows.length + i}>
                    {columns.map((col, j) => (
                      <td key={j} style={{ ...emptyRowStyle, width: col.width, color: '#aaa' }}>&nbsp;</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Action buttons and count below the table container, not inside */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0 0 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>
              <button style={grayButtonStyle} disabled={checked.length === 0} onClick={() => handleDelete(tableKey)}>Delete</button>
              <button style={grayButtonStyle} disabled={rows.length === 0} onClick={() => handleClear(tableKey)}>Clear All</button>
            </div>
          </div>
          <button style={buttonStyle} onClick={() => handleAddNew(tableKey)}>Add New</button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 0 }}>
      {/* Top controls */}
      <form onSubmit={handleSet} style={{ background: '#fff', borderRadius: 8, padding: '18px 18px 10px 18px', marginBottom: 18, border: 'none', maxWidth: '100%', margin: '0 auto 18px auto' }}>
        {/* First row: left and right sections */}
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: 10 }}>
          {/* Left group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
              <span style={{ fontWeight: 500, fontSize: 15, textAlign: 'left', whiteSpace: 'nowrap', lineHeight: 1.15, display: 'inline-block' }}>
                Manipulate IP-&gt;PSTN CallerIDs<br />with Designated Prefix:
              </span>
              <input style={{ ...legacyModalInput, width: 120, marginBottom: 0, textAlign: 'left' }} value={prefix} onChange={e => setPrefix(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
              <span style={{ fontWeight: 500, fontSize: 15, textAlign: 'left', whiteSpace: 'nowrap', lineHeight: 1.15, display: 'inline-block' }}>Starting Date:</span>
              <input type="date" style={{ ...legacyModalInput, width: 140, marginBottom: 0, textAlign: 'left' }} value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
              <span style={{ fontWeight: 500, fontSize: 15, textAlign: 'left', whiteSpace: 'nowrap', lineHeight: 1.15, display: 'inline-block' }}>Usage Cycle (Day):</span>
              <input type="number" style={{ ...legacyModalInput, width: 80, marginBottom: 0, textAlign: 'left' }} value={usageCycle} onChange={e => setUsageCycle(e.target.value)} />
            </div>
          </div>
          {/* Right group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 24 }}>
            <span style={{ fontWeight: 500, fontSize: 15, textAlign: 'left', whiteSpace: 'nowrap', lineHeight: 1.15, display: 'inline-block' }}>Destination PCM:</span>
            <select style={{ ...legacyModalInput, width: 90, marginBottom: 0, textAlign: 'left' }} value={destinationPcm} onChange={e => setDestinationPcm(e.target.value)}>
              <option value="PCM">PCM</option>
              <option value="Any">Any</option>
            </select>
          </div>
        </div>
        {/* Second row: all left-aligned */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, width: '100%', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
            <span style={{ fontWeight: 500, fontSize: 15, textAlign: 'left', whiteSpace: 'nowrap', lineHeight: 1.15, display: 'inline-block' }}>
              IP-&gt;PSTN Outbound Calls<br />with Designated CallerID:
            </span>
            <input type="text" style={{ ...legacyModalInput, width: 120, marginBottom: 0, textAlign: 'left' }} value={outboundCallerId} onChange={e => setOutboundCallerId(e.target.value)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontWeight: 500, fontSize: 15, textAlign: 'left', whiteSpace: 'nowrap', lineHeight: 1.15, display: 'inline-block' }}>IP-&gt;PSTN Designation Mode:</span>
            <select style={{ ...legacyModalInput, width: 150, marginBottom: 0, textAlign: 'left' }} value={designationMode} onChange={e => setDesignationMode(e.target.value)}>
              <option value="SIP Side Reject">SIP Side Reject</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" style={{ ...buttonStyle, minWidth: 90, height: 36, marginLeft: 12 }}>Set</button>
        </div>
        {/* Centered red note below both rows */}
        <div style={{ color: 'red', fontWeight: 500, fontSize: 15, margin: '18px 0 0 0', textAlign: 'center', width: '100%' }}>
          Note: IP-&gt;PSTN Outbound Calls with Designated CallerID set to 0 means the feature is disabled; Usage Cycle set to 0 means not to clear counts.
        </div>
      </form>
      {/* Dual tables */}
      <div style={{ display: 'flex', gap: 18, justifyContent: 'center', width: '100%', maxWidth: '100%', margin: 0 }}>
        {renderTable(rowsIpPstn, checkedIpPstn, 'ip_pstn', 'IP->PSTN Manipulated CallerID Pool')}
        {renderTable(rowsPstnIp, checkedPstnIp, 'pstn_ip', 'PSTN->IP Manipulated CallerID Pool')}
      </div>
      {/* Modal */}
      {showModal && (
        <div style={legacyModalOverlay}>
          <div style={legacyModalBox}>
            <div style={legacyModalHeader}>CallerID</div>
            {CALLERID_POOL_MODAL_FIELDS.filter(f => f.key !== 'callerIdRange').map(field => (
              <div key={field.key} style={{ marginBottom: 8 }}>
                <div style={legacyModalLabel}>
                  {/* Change label for PCM field in PSTN->IP modal */}
                  {field.key === 'destinationPcm' && modalTable === 'pstn_ip'
                    ? 'Source PCM'
                    : field.label}
                </div>
                {field.type === 'select' ? (
                  <select
                    style={legacyModalInput}
                    value={modalData[field.key]}
                    onChange={e => handleModalChange(field.key, e.target.value)}
                  >
                    {field.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    style={legacyModalInput}
                    type={field.type}
                    value={modalData[field.key]}
                    onChange={e => handleModalChange(field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
            <div style={{ marginBottom: 8 }}>
              <div style={legacyModalLabel}>CallerID:</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  style={{ ...legacyModalInput, width: '48%' }}
                  type="text"
                  placeholder="Start"
                  value={modalData.callerIdRangeStart}
                  onChange={e => handleModalChange('callerIdRangeStart', e.target.value)}
                />
                <span style={{ alignSelf: 'center', fontWeight: 600 }}>--</span>
                <input
                  style={{ ...legacyModalInput, width: '48%' }}
                  type="text"
                  placeholder="End"
                  value={modalData.callerIdRangeEnd}
                  onChange={e => handleModalChange('callerIdRangeEnd', e.target.value)}
                />
              </div>
            </div>
            <div style={legacyModalButtonBar}>
              <button style={legacySaveButton} onClick={handleModalSave}>Save</button>
              <button style={legacyCloseButton} onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallerIDPool; 