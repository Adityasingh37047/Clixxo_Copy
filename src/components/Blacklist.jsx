import React, { useState, useRef } from 'react';
import { BLACKLIST_TABLE_COLUMNS, BLACKLIST_CALLEE_TABLE_COLUMNS } from '../constants/BlacklistConstants';
import { FaPencilAlt } from 'react-icons/fa';

const tableContainerStyle = {
  background: '#fff',
  border: '2px solidrgb(163, 189, 216)',
  borderRadius: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  width: '100%',
  minHeight: 400,
  display: 'flex',
  flexDirection: 'column',
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
  borderBottom: '2px solid #b0c4d9',
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

const Blacklist = () => {
  const [callerRows, setCallerRows] = useState([]);
  const [calleeRows, setCalleeRows] = useState([]);
  const [callerSearch, setCallerSearch] = useState('');
  const [calleeSearch, setCalleeSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('caller');
  const [modalData, setModalData] = useState({ groupNo: '0', noInGroup: '1', idValue: '' });
  const [callerChecked, setCallerChecked] = useState([]);
  const [calleeChecked, setCalleeChecked] = useState([]);

  const handleAddNew = (type) => {
    setModalType(type);
    setModalData({ groupNo: '0', noInGroup: '1', idValue: '' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalType === 'caller') {
      setCallerRows([
        ...callerRows,
        {
          groupNo: modalData.groupNo,
          noInGroup: modalData.noInGroup,
          callerId: modalData.idValue,
        },
      ]);
    } else {
      setCalleeRows([
        ...calleeRows,
        {
          groupNo: modalData.groupNo,
          noInGroup: modalData.noInGroup,
          calleeId: modalData.idValue,
        },
      ]);
    }
    setShowModal(false);
  };

  // Checkbox handlers
  const handleCallerCheck = idx => {
    setCallerChecked(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };
  const handleCalleeCheck = idx => {
    setCalleeChecked(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };
  // Delete and Clear All handlers
  const handleCallerDelete = () => {
    setCallerRows(rows => rows.filter((_, idx) => !callerChecked.includes(idx)));
    setCallerChecked([]);
  };
  const handleCallerClear = () => {
    setCallerRows([]);
    setCallerChecked([]);
  };
  const handleCalleeDelete = () => {
    setCalleeRows(rows => rows.filter((_, idx) => !calleeChecked.includes(idx)));
    setCalleeChecked([]);
  };
  const handleCalleeClear = () => {
    setCalleeRows([]);
    setCalleeChecked([]);
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 8 }}>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        {/* CallerID Blacklist Table */}
        <div style={{ width: '50%' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, gap: 12 }}>
            <label style={{ fontWeight: 500, fontSize: 16, minWidth: 80 }}>CallerID:</label>
            <input value={callerSearch} onChange={e => setCallerSearch(e.target.value)} style={{ flex: 1, fontSize: 16, padding: '4px 8px', borderRadius: 4, border: '1px solid #bbb' }} />
            <button style={buttonStyle}>Search</button>
          </div>
          <div style={tableContainerStyle}>
            <div style={blueBarStyle}>CallerID Blacklist</div>
            <div className="custom-scroll-x" style={{ height: 400, overflowY: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, width: 40 }}>Check</th>
                    <th style={{ ...thStyle, width: 70 }}>Group No.</th>
                    <th style={{ ...thStyle, width: 90 }}>No. in Group</th>
                    <th style={{ ...thStyle, width: 120 }}>CallerID</th>
                    <th style={{ ...thStyle, width: 60 }}>Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ...callerRows.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ ...tdStyle, width: 40 }}><input type="checkbox" checked={callerChecked.includes(idx)} onChange={() => handleCallerCheck(idx)} /></td>
                        <td style={{ ...tdStyle, width: 70 }}>{row.groupNo}</td>
                        <td style={{ ...tdStyle, width: 90 }}>{row.noInGroup}</td>
                        <td style={{ ...tdStyle, width: 120 }}>{row.callerId}</td>
                        <td style={{ ...tdStyle, width: 60, textAlign: 'center', verticalAlign: 'middle', height: 48 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <FaPencilAlt style={{ color: '#1976d2', fontSize: 22, cursor: 'pointer' }} />
                          </div>
                        </td>
                      </tr>
                    )),
                    ...Array.from({ length: Math.max(0, 10 - callerRows.length) }).map((_, i) => (
                      <tr key={callerRows.length + i}>
                        <td style={{ ...emptyRowStyle, width: 40, color: '#aaa' }}>&nbsp;</td>
                        <td style={{ ...emptyRowStyle, width: 70, color: '#aaa' }}>&nbsp;</td>
                        <td style={{ ...emptyRowStyle, width: 90, color: '#aaa' }}>&nbsp;</td>
                        <td style={{ ...emptyRowStyle, width: 120, color: '#aaa' }}>&nbsp;</td>
                        <td style={{ ...emptyRowStyle, width: 60, color: '#aaa' }}>&nbsp;</td>
                      </tr>
                    ))
                  ]}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0 0 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div>
                <button style={grayButtonStyle} disabled={callerChecked.length === 0} onClick={handleCallerDelete}>Delete</button>
                <button style={grayButtonStyle} disabled={callerRows.length === 0} onClick={handleCallerClear}>Clear All</button>
              </div>
              <span style={{ marginTop: 4, color: '#888', fontSize: 14 }}>0 items Total</span>
            </div>
            <button style={buttonStyle} onClick={() => handleAddNew('caller')}>Add New</button>
          </div>
        </div>
        {/* CalleeID Blacklist Table */}
        <div style={{ width: '50%' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, gap: 12 }}>
            <label style={{ fontWeight: 500, fontSize: 16, minWidth: 80 }}>CalleeID:</label>
            <input value={calleeSearch} onChange={e => setCalleeSearch(e.target.value)} style={{ flex: 1, fontSize: 16, padding: '4px 8px', borderRadius: 4, border: '1px solid #bbb' }} />
            <button style={buttonStyle}>Search</button>
          </div>
          <div style={tableContainerStyle}>
            <div style={blueBarStyle}>CalleeID Blacklist</div>
            <div className="custom-scroll-x" style={{ height: 400, overflowY: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, width: 40 }}>Check</th>
                    <th style={{ ...thStyle, width: 70 }}>Group No.</th>
                    <th style={{ ...thStyle, width: 90 }}>No. in Group</th>
                    <th style={{ ...thStyle, width: 120 }}>CalleeID</th>
                    <th style={{ ...thStyle, width: 60 }}>Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ...calleeRows.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ ...tdStyle, width: 40 }}><input type="checkbox" checked={calleeChecked.includes(idx)} onChange={() => handleCalleeCheck(idx)} /></td>
                        <td style={{ ...tdStyle, width: 70 }}>{row.groupNo}</td>
                        <td style={{ ...tdStyle, width: 90 }}>{row.noInGroup}</td>
                        <td style={{ ...tdStyle, width: 120 }}>{row.calleeId}</td>
                        <td style={{ ...tdStyle, width: 60, textAlign: 'center', verticalAlign: 'middle', height: 48 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <FaPencilAlt style={{ color: '#1976d2', fontSize: 22, cursor: 'pointer' }} />
                          </div>
                        </td>
                      </tr>
                    )),
                    ...Array.from({ length: Math.max(0, 10 - calleeRows.length) }).map((_, i) => (
                      <tr key={calleeRows.length + i}>
                        <td style={{ ...emptyRowStyle, width: 40, color: '#aaa' }}>&nbsp;</td>
                        <td style={{ ...emptyRowStyle, width: 70, color: '#aaa' }}>&nbsp;</td>
                        <td style={{ ...emptyRowStyle, width: 90, color: '#aaa' }}>&nbsp;</td>
                        <td style={{ ...emptyRowStyle, width: 120, color: '#aaa' }}>&nbsp;</td>
                        <td style={{ ...emptyRowStyle, width: 60, color: '#aaa' }}>&nbsp;</td>
                      </tr>
                    ))
                  ]}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0 0 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div>
                <button style={grayButtonStyle} disabled={calleeChecked.length === 0} onClick={handleCalleeDelete}>Delete</button>
                <button style={grayButtonStyle} disabled={calleeRows.length === 0} onClick={handleCalleeClear}>Clear All</button>
              </div>
              <span style={{ marginTop: 4, color: '#888', fontSize: 14 }}>0 items Total</span>
            </div>
            <button style={buttonStyle} onClick={() => handleAddNew('callee')}>Add New</button>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', color: 'red', fontSize: 15, marginTop: 24 }}>
        Note: The one list, only the latest 200 pieces will be displayed. To check all the records, please backup the file.
      </div>
      {/* Modal for Add New CallerID or CalleeID (legacy style) */}
      {showModal && (
        <div style={legacyModalOverlay}>
          <div style={legacyModalBox}>
            <div style={legacyModalHeader}>
              {modalType === 'caller' ? 'CallerIDs in Blacklist' : 'CalleeIDs in Blacklist'}
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={legacyModalLabel}>Group No.:</label>
              <select value={modalData.groupNo} onChange={e => setModalData({ ...modalData, groupNo: e.target.value })} style={legacyModalInput}>
                {[...Array(10).keys()].map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={legacyModalLabel}>No. in Group:</label>
              <input type="text" value={modalData.noInGroup} onChange={e => setModalData({ ...modalData, noInGroup: e.target.value })} style={legacyModalInput} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={legacyModalLabel}>{modalType === 'caller' ? 'CallerID:' : 'CalleeID:'}</label>
              <input type="text" value={modalData.idValue} onChange={e => setModalData({ ...modalData, idValue: e.target.value })} style={legacyModalInput} />
            </div>
            <div style={legacyModalButtonBar}>
              <button style={legacySaveButton} onClick={handleSave}>Save</button>
              <button style={legacyCloseButton} onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blacklist; 