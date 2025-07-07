import React, { useState, useRef, useEffect } from 'react';
import { IP_CALL_IN_CALLERID_FIELDS, IP_CALL_IN_CALLERID_TABLE_COLUMNS, IP_CALL_IN_CALLERID_INITIAL_FORM } from '../constants/IPCallInCallerIDConstants';
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
const paginationBarStyle = {
  display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#222', background: '#e3e7ef', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTop: '1px solid #bbb', padding: '2px 8px', marginTop: 0, minHeight: 32,
};
const paginationButtonStyle = {
  ...tableButtonStyle, fontSize: 13, padding: '2px 10px', minWidth: 0, borderRadius: 4,
};
const pageSelectStyle = {
  fontSize: 13, padding: '2px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff',
};
const customScrollbarRowStyle = {
  width: '100%', margin: '0 auto', background: '#f4f6fa', display: 'flex', alignItems: 'center', height: 24, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, border: '2px solid #888', borderTop: 'none', padding: '0 4px', boxSizing: 'border-box',
};
const customScrollbarTrackStyle = {
  flex: 1, height: 12, background: '#e3e7ef', borderRadius: 8, position: 'relative', margin: '0 4px', overflow: 'hidden',
};
const customScrollbarThumbStyle = {
  position: 'absolute', height: 12, background: '#888', borderRadius: 8, cursor: 'pointer', top: 0,
};
const customScrollbarArrowStyle = {
  width: 18, height: 18, background: '#e3e7ef', border: '1px solid #bbb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#888', cursor: 'pointer', userSelect: 'none',
};

const LOCAL_STORAGE_KEY = 'ipCallInCallerIdRules';

const IPCallInCallerID = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(IP_CALL_IN_CALLERID_INITIAL_FORM);
  const [rules, setRules] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(rules.length / itemsPerPage));
  const pagedRules = rules.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const tableScrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({ left: 0, width: 0, scrollWidth: 0 });

  const handleOpenModal = (item = null, index = -1) => {
    setFormData(item ? { ...item, originalIndex: index } : IP_CALL_IN_CALLERID_INITIAL_FORM);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = () => {
    const { originalIndex, ...dataToSave } = formData;
    setRules(prev => {
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

  const handlePageChange = (newPage) => setPage(Math.max(1, Math.min(totalPages, newPage)));

  const handleSelectRow = idx => {
    const realIdx = (page - 1) * itemsPerPage + idx;
    setSelected(sel => sel.includes(realIdx) ? sel.filter(i => i !== realIdx) : [...sel, realIdx]);
  };
  const handleCheckAll = () => setSelected(rules.map((_, idx) => idx));
  const handleUncheckAll = () => setSelected([]);
  const handleInverse = () => setSelected(rules.map((_, idx) => !selected.includes(idx) ? idx : null).filter(i => i !== null));
  const handleDelete = () => {
    setRules(rules.filter((_, idx) => !selected.includes(idx)));
    setSelected([]);
  };
  const handleClearAll = () => {
    setRules([]);
    setSelected([]);
    setPage(1);
  };

  const handleTableScroll = (e) => setScrollState({ left: e.target.scrollLeft, width: e.target.clientWidth, scrollWidth: e.target.scrollWidth });
  const handleScrollbarDrag = (e) => {
    const track = e.target.parentNode;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    if (tableScrollRef.current) tableScrollRef.current.scrollLeft = (scrollState.scrollWidth - scrollState.width) * percent;
  };
  const handleArrowClick = (dir) => {
    if (tableScrollRef.current) tableScrollRef.current.scrollLeft += (dir === 'left' ? -100 : 100);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rules));
  }, [rules]);

  useEffect(() => {
    if (tableScrollRef.current) {
      setScrollState({ left: tableScrollRef.current.scrollLeft, width: tableScrollRef.current.clientWidth, scrollWidth: tableScrollRef.current.scrollWidth });
    }
  }, [rules, page]);

  const rootStyle = {
    background: '#fff',
    minHeight: 'calc(100vh - 128px)',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: rules.length === 0 ? 'center' : 'flex-start',
    position: 'relative',
    boxSizing: 'border-box',
  };

  const thumbWidth = scrollState.width && scrollState.scrollWidth ? Math.max(40, (scrollState.width / scrollState.scrollWidth) * (scrollState.width - 8)) : 40;
  const thumbLeft = scrollState.width && scrollState.scrollWidth && scrollState.scrollWidth > scrollState.width ? ((scrollState.left / (scrollState.scrollWidth - scrollState.width)) * (scrollState.width - thumbWidth - 16)) : 0;

  return (
    <div style={rootStyle}>
      {rules.length === 0 ? (
        <div style={{ textAlign: 'center', marginBottom: '50vh' }}>
          <div style={{ color: '#222', fontSize: 22, marginBottom: 32 }}>
            No available number manipulation rule (IP Call In CallerID)!
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
        </div>
      ) : (
        <div style={{width:'100%'}}>
          <div style={{ ...tableContainerStyle, borderBottomLeftRadius:0, borderBottomRightRadius:0, borderBottom:'none' }}>
            <div style={{ ...blueBarStyle, borderBottom: '2px solid #888' }}>IP Call In CallerID</div>
            <div ref={tableScrollRef} onScroll={handleTableScroll} style={{overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              <table style={{...tableStyle, minWidth: IP_CALL_IN_CALLERID_TABLE_COLUMNS.length * 170 }}>
                <thead>
                  <tr>{IP_CALL_IN_CALLERID_TABLE_COLUMNS.map(c => <th key={c.key} style={thStyle}>{c.label}</th>)}</tr>
                </thead>
                <tbody>
                  {pagedRules.map((item, idx) => {
                    const realIdx = (page - 1) * itemsPerPage + idx;
                    return (
                      <tr key={realIdx}>
                        <td style={tdStyle}><input type="checkbox" checked={selected.includes(realIdx)} onChange={() => handleSelectRow(idx)} /></td>
                        <td style={tdStyle}>{item.index}</td>
                        <td style={tdStyle}>{IP_CALL_IN_CALLERID_FIELDS[1].options.find(opt => opt.value === item.callInitiator)?.label || item.callInitiator}</td>
                        <td style={tdStyle}>{item.callerIdPrefix}</td>
                        <td style={tdStyle}>{item.calleeIdPrefix}</td>
                        <td style={tdStyle}>{item.withOriginalCalleeId}</td>
                        <td style={tdStyle}>{item.strippedLeft}</td>
                        <td style={tdStyle}>{item.strippedRight}</td>
                        <td style={tdStyle}>{item.reservedRight}</td>
                        <td style={tdStyle}>{item.prefixToAdd}</td>
                        <td style={tdStyle}>{item.suffixToAdd}</td>
                        <td style={tdStyle}>{item.description}</td>
                        <td style={tdStyle}><EditDocumentIcon style={{ cursor: 'pointer', color: '#0e8fd6', display: 'block', margin: '0 auto' }} onClick={() => handleOpenModal(item, realIdx)} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ ...customScrollbarRowStyle, maxWidth: '100%' }}>
            <div style={customScrollbarArrowStyle} onClick={() => handleArrowClick('left')}>&#9664;</div>
            <div style={customScrollbarTrackStyle} onClick={handleScrollbarDrag} >
              <div style={{ ...customScrollbarThumbStyle, width: thumbWidth, left: thumbLeft }} draggable onDrag={handleScrollbarDrag} />
            </div>
            <div style={customScrollbarArrowStyle} onClick={() => handleArrowClick('right')}>&#9654;</div>
          </div>
          <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', borderRadius: 8, border: '1px solid #bbb', borderTop: 'none', marginTop: 0, padding: '8px 8px 8px 8px' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={tableButtonStyle} onClick={handleCheckAll}>Check All</button>
              <button style={tableButtonStyle} onClick={handleUncheckAll}>Uncheck All</button>
              <button style={tableButtonStyle} onClick={handleInverse}>Inverse</button>
              <button style={tableButtonStyle} onClick={handleDelete}>Delete</button>
              <button style={tableButtonStyle} onClick={handleClearAll}>Clear All</button>
            </div>
            <button style={{ ...addNewButtonStyle, position: 'static', margin: 0 }} onClick={() => handleOpenModal()}>Add New</button>
          </div>
          <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', background: 'transparent', borderRadius: 8, border: 'none', borderTop: 'none', marginTop: 4, padding: '2px 8px 2px 8px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 32, justifyContent: 'flex-start' }}>
            <span>{rules.length} Items Total</span>
            <span style={{marginLeft:'8px'}}>{itemsPerPage} Items/Page</span>
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
            <div style={modalHeaderStyle}>IP-&gt;PSTN CallerID Manipulation</div>
            <div style={modalBodyStyle}>
              {IP_CALL_IN_CALLERID_FIELDS.map((field) => (
                <div key={field.name} style={modalRowStyle}>
                  <label style={modalLabelStyle}>{field.label}</label>
                  <div style={{flex: 1}}>
                    {field.type === 'select' ? (
                      <select name={field.name} value={formData[field.name] || ''} onChange={handleInputChange} style={modalInputStyle}>
                        {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    ) : (
                      <input type={field.type} name={field.name} value={formData[field.name] || ''} onChange={handleInputChange} style={modalInputStyle} />
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

export default IPCallInCallerID; 