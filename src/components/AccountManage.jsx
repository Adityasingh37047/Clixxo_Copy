import React, { useState } from 'react';
import {
  ACCOUNT_MANAGE_TABLE_COLUMNS,
  ACCOUNT_MANAGE_MODAL_FIELDS,
  ACCOUNT_MANAGE_INITIAL_FORM,
  ACCOUNT_MANAGE_BUTTONS,
} from '../constants/AccountManageConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import Button from '@mui/material/Button';

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
  width: 110, fontSize: 14, color: '#222', textAlign: 'left', marginRight: 10, whiteSpace: 'nowrap',
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
  width: '100%', maxWidth: '100%', margin: '0 auto', background: '#f8fafd', border: '1px solid #ccc', borderRadius: 8, boxShadow: 'none',
};
const blueBarStyle = {
  width: '100%', height: 36, background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginBottom: 0, display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 18, color: '#000', justifyContent: 'center', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};
const thStyle = {
  background: '#fff', color: '#222', fontWeight: 600, fontSize: 15, border: '1px solid #bbb', padding: '6px 8px', whiteSpace: 'nowrap',
};
const tdStyle = {
  border: '1px solid #bbb', padding: '6px 8px', fontSize: 14, background: '#fff', textAlign: 'center', whiteSpace: 'nowrap',
};
const tableButtonSx = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
  fontSize: 15,
  padding: '4px 18px',
  border: '1px solid #bbb',
  borderRadius: 1.5,
  boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
  fontWeight: 500,
  textTransform: 'none',
  minWidth: 90,
  '&:hover': {
    background: 'linear-gradient(to bottom, #bfc6d1 0%, #e3e7ef 100%)',
    color: '#222',
  },
};
const addNewButtonSx = {
  ...tableButtonSx,
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
    color: '#fff',
  },
};
const ITEMS_PER_PAGE = 20;

const AccountManage = () => {
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(ACCOUNT_MANAGE_INITIAL_FORM);
  const [editIdx, setEditIdx] = useState(null);
  const [page, setPage] = useState(1);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(accounts.length / ITEMS_PER_PAGE));
  const pagedAccounts = accounts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Table row selection logic
  const handleSelectRow = idx => {
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  };
  const handleCheckAllRows = () => setSelected(accounts.map((_, idx) => idx));
  const handleUncheckAllRows = () => setSelected([]);
  const handleInverse = () => setSelected(accounts.map((_, idx) => idx).filter(i => !selected.includes(i)));
  const handleDelete = () => {
    setAccounts(accounts.filter((_, idx) => !selected.includes(idx)));
    setSelected([]);
  };
  const handleClearAll = () => {
    setAccounts([]);
    setSelected([]);
  };

  // Modal logic
  const handleOpenModal = (item = null, idx = null) => {
    if (item) {
      setFormData({
        index: item.id,
        userName: item.user,
        password: item.password,
        authority: item.permission,
      });
      setEditIdx(idx);
    } else {
      setFormData({ ...ACCOUNT_MANAGE_INITIAL_FORM, index: accounts.length });
      setEditIdx(null);
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    const newAccount = {
      id: formData.index,
      user: formData.userName,
      password: formData.password,
      permission: formData.authority,
    };
    setAccounts(prev => {
      if (editIdx !== null) {
        const updated = [...prev];
        updated[editIdx] = newAccount;
        return updated;
      }
      return [...prev, newAccount];
    });
    setIsModalOpen(false);
  };

  // When accounts change, reset page if needed
  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [accounts, totalPages]);

  return (
    <div style={{ background: '#fff', minHeight: 'calc(100vh - 128px)', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', boxSizing: 'border-box' }}>
      <div style={{width:'100%', maxWidth:1200}}>
        {/* Table */}
        <div style={{ ...tableContainerStyle, borderBottomLeftRadius:0, borderBottomRightRadius:0, borderBottom:'none', background: '#fff', border: '1px solid #ccc', borderRadius: 8, overflowX: 'auto' }}>
          <div style={{ ...blueBarStyle, borderBottom: '2px solid #888' }}>Info</div>
          <div style={{overflowX: 'auto', width: '100%'}}>
            <table style={{width:'100%', minWidth:600, borderCollapse:'collapse'}}>
              <thead>
                <tr>
                  {ACCOUNT_MANAGE_TABLE_COLUMNS.map(col => (
                    <th key={col.key} style={thStyle}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pagedAccounts.length === 0 ? (
                  <tr><td colSpan={ACCOUNT_MANAGE_TABLE_COLUMNS.length} style={tdStyle}>No data</td></tr>
                ) : pagedAccounts.map((item, idx) => {
                  const realIdx = (page - 1) * ITEMS_PER_PAGE + idx;
                  return (
                    <tr key={realIdx}>
                      {/* Choose */}
                      <td style={tdStyle}>
                        <input type="checkbox" checked={selected.includes(realIdx)} onChange={() => handleSelectRow(realIdx)} />
                      </td>
                      {/* Id */}
                      <td style={tdStyle}>{item.id}</td>
                      {/* User */}
                      <td style={tdStyle}>{item.user}</td>
                      {/* Permission */}
                      <td style={tdStyle}>{item.permission}</td>
                      {/* Modify */}
                      <td style={tdStyle}>
                        <button onClick={() => handleOpenModal(item, realIdx)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                          <EditDocumentIcon style={{ fontSize: 20 }} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Table Buttons */}
        <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', background: '#e3e7ef', borderRadius: 8, border: '1px solid #ccc', borderTop: 'none', marginTop: 0, padding: '8px 8px 8px 8px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button sx={tableButtonSx} onClick={handleCheckAllRows}>{ACCOUNT_MANAGE_BUTTONS.checkAll}</Button>
            <Button sx={tableButtonSx} onClick={handleUncheckAllRows}>{ACCOUNT_MANAGE_BUTTONS.uncheckAll}</Button>
            <Button sx={tableButtonSx} onClick={handleInverse}>{ACCOUNT_MANAGE_BUTTONS.inverse}</Button>
            <Button sx={tableButtonSx} onClick={handleDelete}>{ACCOUNT_MANAGE_BUTTONS.delete}</Button>
            <Button sx={tableButtonSx} onClick={handleClearAll}>{ACCOUNT_MANAGE_BUTTONS.clearAll}</Button>
          </div>
          <Button sx={addNewButtonSx} onClick={() => handleOpenModal()}>{ACCOUNT_MANAGE_BUTTONS.addNew}</Button>
        </div>
        {/* Pagination (working, legacy style, left-aligned) */}
        <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', background: '#e3e7ef', borderRadius: 8, border: '1px solid #ccc', borderTop: 'none', marginTop: 4, padding: '2px 8px 2px 8px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, minHeight: 32, fontSize: 17, justifyContent: 'flex-start', overflowX: 'auto' }}>
          <span>{accounts.length} Items Total</span>
          <span style={{marginLeft:'8px'}}>20 Items/Page</span>
          <span style={{marginLeft:'8px'}}>{page}/{totalPages}</span>
          {/* Pagination text controls */}
          <span
            style={{
              color: page === 1 ? '#aaa' : '#2266aa',
              cursor: page === 1 ? 'default' : 'pointer',
              margin: '0 4px',
              userSelect: 'none',
              fontWeight: 500,
            }}
            onClick={() => page !== 1 && setPage(1)}
          >First</span>
          <span
            style={{
              color: page === 1 ? '#aaa' : '#2266aa',
              cursor: page === 1 ? 'default' : 'pointer',
              margin: '0 4px',
              userSelect: 'none',
              fontWeight: 500,
            }}
            onClick={() => page !== 1 && setPage(page - 1)}
          >Previous</span>
          <span
            style={{
              color: page === totalPages ? '#aaa' : '#2266aa',
              cursor: page === totalPages ? 'default' : 'pointer',
              margin: '0 4px',
              userSelect: 'none',
              fontWeight: 500,
            }}
            onClick={() => page !== totalPages && setPage(page + 1)}
          >Next</span>
          <span
            style={{
              color: page === totalPages ? '#aaa' : '#2266aa',
              cursor: page === totalPages ? 'default' : 'pointer',
              margin: '0 4px',
              userSelect: 'none',
              fontWeight: 500,
            }}
            onClick={() => page !== totalPages && setPage(totalPages)}
          >Last</span>
          <span style={{marginLeft:'8px'}}>Go to Page</span>
          <select style={{ fontSize: 15, padding: '2px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff' }} value={page} onChange={e => setPage(Number(e.target.value))}>
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
          <span style={{marginLeft:'8px'}}>{totalPages} Pages Total</span>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>User Information</div>
            <div style={modalBodyStyle}>
              {ACCOUNT_MANAGE_MODAL_FIELDS.map(field => (
                <div key={field.name} style={modalRowStyle}>
                  <label style={modalLabelStyle}>{field.label}:</label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      style={modalInputStyle}
                    >
                      {field.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      style={modalInputStyle}
                      disabled={field.disabled}
                    />
                  )}
                </div>
              ))}
            </div>
            <div style={modalFooterStyle}>
              <button style={modalButtonStyle} onClick={handleSave}>{ACCOUNT_MANAGE_BUTTONS.save}</button>
              <button style={modalButtonGrayStyle} onClick={handleCloseModal}>{ACCOUNT_MANAGE_BUTTONS.close}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add this style for plain gray buttons
const plainBtnStyle = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
  fontSize: 15,
  padding: '4px 18px',
  border: '1px solid #bbb',
  borderRadius: 6,
  boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
  fontWeight: 500,
  textTransform: 'none',
  minWidth: 60,
  cursor: 'pointer',
  opacity: 1,
  marginLeft: 2,
  marginRight: 2,
  transition: 'background 0.2s',
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
};

export default AccountManage; 