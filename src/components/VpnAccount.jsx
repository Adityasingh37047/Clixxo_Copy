import React, { useState, useEffect } from 'react';
import {
  VPN_ACCOUNT_TABLE_COLUMNS,
  VPN_ACCOUNT_FIELDS,
  VPN_ACCOUNT_INITIAL_FORM
} from '../constants/VpnAccountConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

const localStorageKey = 'vpnAccounts';

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle = {
  background: '#e6eaf0',
  borderRadius: 8,
  boxShadow: '0 2px 16px #2228',
  minWidth: 400,
  minHeight: 220,
  padding: '0 0 24px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '2px solid #222',
};

const modalHeaderStyle = {
  width: '100%',
  background: 'linear-gradient(to bottom, #444d57 0%, #222 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: 20,
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  padding: '12px 0',
  textAlign: 'center',
  marginBottom: 18,
};

const modalRowStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0',
  width: 340,
  justifyContent: 'space-between',
};

const modalLabelStyle = {
  fontWeight: 500,
  fontSize: 16,
  color: '#222',
  width: 110,
  textAlign: 'right',
  marginRight: 12,
};

const modalInputStyle = {
  width: 200,
  fontSize: 16,
  padding: '6px 10px',
  borderRadius: 4,
  border: '1px solid #bbb',
  background: '#fff',
};

const modalButtonBarStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 24,
  marginTop: 18,
};

const modalButtonStyle = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontSize: 18,
  padding: '7px 32px',
  border: 'none',
  borderRadius: 6,
  boxShadow: '0 2px 8px #b3e0ff',
  cursor: 'pointer',
  fontWeight: 500,
  minWidth: 90,
};

const closeButtonStyle = {
  ...modalButtonStyle,
  background: '#bfc3c8',
  color: '#222',
  boxShadow: 'none',
};

const addButtonStyle = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontSize: 18,
  padding: '7px 32px',
  border: 'none',
  borderRadius: 6,
  boxShadow: '0 2px 8px #b3e0ff',
  cursor: 'pointer',
  fontWeight: 500,
  marginTop: 12,
};

const blueBarStyle = {
  width: '100%',
  height: 36,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  marginBottom: 0,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 18,
  color: '#2266aa',
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};

const tableContainerStyle = {
  width: '100%',
  maxWidth: 900,
  margin: '0 auto',
  background: '#f8fafd',
  border: '2px solid #888',
  borderRadius: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: 500,
};

const thStyle = {
  background: '#fff',
  color: '#222',
  fontWeight: 600,
  fontSize: 15,
  border: '1px solid #bbb',
  padding: '6px 8px',
  whiteSpace: 'nowrap',
};

const tdStyle = {
  border: '1px solid #bbb',
  padding: '6px 8px',
  fontSize: 14,
  background: '#fff',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

const tableButtonStyle = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
  fontSize: 15,
  padding: '4px 18px',
  border: '1px solid #bbb',
  borderRadius: 6,
  boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
  cursor: 'pointer',
  fontWeight: 500,
};

const addNewButtonStyle = {
  ...tableButtonStyle,
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
};

const tableCheckboxStyle = {
  width: 20,
  height: 20,
};

const VpnAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(VPN_ACCOUNT_INITIAL_FORM);
  const [editIndex, setEditIndex] = useState(null);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) setAccounts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    setChecked([]);
  }, [accounts.length]);

  const handleAddNew = () => {
    setForm(VPN_ACCOUNT_INITIAL_FORM);
    setEditIndex(null);
    setShowModal(true);
  };

  const handleEdit = (idx) => {
    setForm(accounts[idx]);
    setEditIndex(idx);
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    let newAccounts;
    if (editIndex !== null) {
      newAccounts = accounts.map((acc, idx) => idx === editIndex ? form : acc);
    } else {
      newAccounts = [...accounts, form];
    }
    setAccounts(newAccounts);
    localStorage.setItem(localStorageKey, JSON.stringify(newAccounts));
    setShowModal(false);
    setEditIndex(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const isAllChecked = accounts.length > 0 && checked.length === accounts.length;
  const isIndeterminate = checked.length > 0 && checked.length < accounts.length;

  const handleCheck = (idx) => {
    setChecked((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleCheckAll = () => {
    setChecked(accounts.map((_, idx) => idx));
  };

  const handleUncheckAll = () => {
    setChecked([]);
  };

  const handleInverse = () => {
    setChecked(accounts.map((_, idx) => (checked.includes(idx) ? null : idx)).filter((i) => i !== null));
  };

  const handleDelete = () => {
    const newAccounts = accounts.filter((_, idx) => !checked.includes(idx));
    setAccounts(newAccounts);
    localStorage.setItem(localStorageKey, JSON.stringify(newAccounts));
    setChecked([]);
  };

  const handleClearAll = () => {
    setAccounts([]);
    localStorage.removeItem(localStorageKey);
    setChecked([]);
  };

  return (
    <div style={{ background: '#fff', minHeight: 'calc(100vh - 128px)', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {accounts.length === 0 ? (
        <>
          <div style={{ color: '#222', fontWeight: 600, fontSize: 22, marginTop: 32, marginBottom: 12 }}>No Available Information!</div>
          <button style={addNewButtonStyle} onClick={handleAddNew}>Add New</button>
        </>
      ) : (
        <div style={tableContainerStyle}>
          <div style={blueBarStyle}>VPN Account</div>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>
                    <input
                      type="checkbox"
                      style={tableCheckboxStyle}
                      checked={isAllChecked}
                      ref={el => { if (el) el.indeterminate = isIndeterminate; }}
                      onChange={() => (isAllChecked ? handleUncheckAll() : handleCheckAll())}
                    />
                  </th>
                  {VPN_ACCOUNT_TABLE_COLUMNS.map((col) => (
                    <th key={col.key} style={thStyle}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {accounts.map((row, idx) => (
                  <tr key={idx}>
                    <td style={tdStyle}>
                      <input
                        type="checkbox"
                        style={tableCheckboxStyle}
                        checked={checked.includes(idx)}
                        onChange={() => handleCheck(idx)}
                      />
                    </td>
                    {VPN_ACCOUNT_TABLE_COLUMNS.map((col) => (
                      col.key === 'modify' ? (
                        <td key={col.key} style={tdStyle}><EditDocumentIcon style={{ cursor: 'pointer', color: '#0e8fd6', display: 'block', margin: '0 auto' }} onClick={() => handleEdit(idx)} /></td>
                      ) : (
                        <td key={col.key} style={tdStyle}>{row[col.key]}</td>
                      )
                    ))}
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
              <button style={tableButtonStyle} onClick={handleDelete} disabled={checked.length === 0}>Delete</button>
              <button style={tableButtonStyle} onClick={handleClearAll}>Clear All</button>
            </div>
            <button style={addNewButtonStyle} onClick={handleAddNew}>Add New</button>
          </div>
        </div>
      )}
      {showModal && (
        <div style={modalOverlayStyle}>
          <form style={modalStyle} onSubmit={handleModalSave}>
            <div style={modalHeaderStyle}>VPN Account</div>
            {VPN_ACCOUNT_FIELDS.map((field) => (
              <div style={modalRowStyle} key={field.name}>
                <div style={modalLabelStyle}>{field.label}</div>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  min={field.min}
                  onChange={handleModalChange}
                  style={modalInputStyle}
                  required
                />
              </div>
            ))}
            <div style={modalButtonBarStyle}>
              <button type="submit" style={modalButtonStyle}>Save</button>
              <button type="button" style={closeButtonStyle} onClick={handleModalClose}>Close</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VpnAccount; 