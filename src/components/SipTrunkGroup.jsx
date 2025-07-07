import React, { useState, useRef, useEffect } from 'react';
import { SIP_TRUNK_GROUP_FIELDS, SIP_TRUNK_GROUP_INITIAL_FORM, SIP_TRUNK_GROUP_TABLE_COLUMNS } from '../constants/SipTrunkGroupConstants';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

const panelStyle = {
  background: '#fff',
  width: 950,
  maxWidth: '98vw',
  margin: '0 auto',
  marginTop: 0,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
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
  paddingLeft: 0,
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};
const formBodyStyle = {
  width: '100%',
  padding: '36px 40px 36px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: 28,
  background: '#fff',
};
const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  minHeight: 38,
  margin: '0 0 0 0',
  gap: 0,
};
const labelStyle = {
  width: 320,
  fontSize: 16,
  color: '#222',
  textAlign: 'right',
  marginRight: 32,
  whiteSpace: 'nowrap',
  fontWeight: 400,
};
const inputStyle = {
  flex: 1,
  fontSize: 16,
  padding: '10px 16px',
  borderRadius: 4,
  border: '1px solid #bbb',
  background: '#fff',
  boxSizing: 'border-box',
};
const checkboxRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};
const checkboxStyle = {
  width: 18,
  height: 18,
  accentColor: '#3bb6f5',
  border: '1.5px solid #3bb6f5',
  background: '#fff',
};
const footerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 48,
  padding: '36px 0 24px 0',
};
const buttonStyle = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontSize: 18,
  padding: '7px 38px',
  border: 'none',
  borderRadius: 6,
  boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
  cursor: 'pointer',
  minWidth: 120,
  transition: 'background 0.2s, box-shadow 0.2s',
};
const buttonGrayStyle = {
  ...buttonStyle,
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
};
const infoTextStyle = {
  color: 'red',
  fontSize: 15,
  margin: '18px 0 0 0',
  textAlign: 'left',
  lineHeight: 1.5,
  padding: '0 0 24px 0',
  maxWidth: 950,
  marginLeft: 'auto',
  marginRight: 'auto',
};

const LOCAL_STORAGE_KEY = 'sipTrunkGroups';

const tableContainerStyle = {
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  background: '#f8fafd',
  border: '2px solid #888',
  borderRadius: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
};
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
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

// --- Add classic SIP Register table styles ---
const tableButtonStyle = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
  fontSize: 16,
  padding: '6px 28px',
  border: '1px solid #bbb',
  borderRadius: 6,
  boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
  cursor: 'pointer',
  minWidth: 90,
  marginRight: 4,
  marginLeft: 0,
  transition: 'background 0.2s, box-shadow 0.2s',
};
const addNewButtonStyle = {
  ...tableButtonStyle, background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', minWidth: 120, marginLeft: 12
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

const SipTrunkGroup = () => {
  const [formData, setFormData] = useState(SIP_TRUNK_GROUP_INITIAL_FORM);
  const [sipTrunksChecked, setSipTrunksChecked] = useState(false);
  const [checkAllChecked, setCheckAllChecked] = useState(false);
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(groups.length / itemsPerPage));
  const pagedGroups = groups.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const [showTable, setShowTable] = useState(false);
  const tableScrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({ left: 0, width: 0, scrollWidth: 0 });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked ? ['0'] : [] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSipTrunksCheckbox = (e) => {
    setSipTrunksChecked(e.target.checked);
    setFormData((prev) => ({ ...prev, sipTrunks: e.target.checked ? ['0'] : [] }));
  };

  const handleCheckAllCheckbox = (e) => {
    setCheckAllChecked(e.target.checked);
    setFormData((prev) => ({ ...prev, sipTrunks: e.target.checked ? ['0'] : [] }));
  };

  const handleSave = () => {
    const { originalIndex, ...dataToSave } = formData;
    setGroups(prev => {
      if (originalIndex !== undefined && originalIndex > -1) {
        const updated = [...prev];
        updated[originalIndex] = dataToSave;
        return updated;
      }
      return [...prev, dataToSave];
    });
    setFormData(SIP_TRUNK_GROUP_INITIAL_FORM);
    setSipTrunksChecked(false);
    setCheckAllChecked(false);
    setEditIndex(-1);
    setShowTable(true);
  };

  const handleAddNew = () => {
    setFormData(SIP_TRUNK_GROUP_INITIAL_FORM);
    setSipTrunksChecked(false);
    setCheckAllChecked(false);
    setEditIndex(-1);
    setShowTable(false);
  };

  const handleEdit = (idx) => {
    setFormData(groups[idx]);
    setSipTrunksChecked(groups[idx].sipTrunks && groups[idx].sipTrunks.length > 0);
    setCheckAllChecked(groups[idx].sipTrunks && groups[idx].sipTrunks.length > 0);
    setEditIndex(idx);
  };

  // Table selection logic
  const handleSelectRow = idx => {
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  };
  const handleCheckAll = () => setSelected(pagedGroups.map((_, idx) => (page - 1) * itemsPerPage + idx));
  const handleUncheckAll = () => setSelected([]);
  const handleInverse = () => setSelected(pagedGroups.map((_, idx) => {
    const realIdx = (page - 1) * itemsPerPage + idx;
    return selected.includes(realIdx) ? null : realIdx;
  }).filter(i => i !== null));
  const handleDelete = () => {
    setGroups(groups.filter((_, idx) => !selected.includes(idx)));
    setSelected([]);
  };
  const handleClearAll = () => {
    setGroups([]);
    setSelected([]);
    setPage(1);
  };
  const handlePageChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= totalPages) setPage(val);
  };
  const handleSingleDelete = (idx) => {
    setGroups(groups.filter((_, i) => i !== idx));
    if (editIndex === idx) handleAddNew();
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
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(groups));
    // Auto-switch to form if table is empty and showTable is true
    if (groups.length === 0 && showTable) setShowTable(false);
  }, [groups, showTable]);

  useEffect(() => {
    if (tableScrollRef.current) {
      setScrollState({ left: tableScrollRef.current.scrollLeft, width: tableScrollRef.current.clientWidth, scrollWidth: tableScrollRef.current.scrollWidth });
    }
  }, [groups, page, showTable]);

  const thumbWidth = scrollState.width && scrollState.scrollWidth ? Math.max(40, (scrollState.width / scrollState.scrollWidth) * (scrollState.width - 8)) : 40;
  const thumbLeft = scrollState.width && scrollState.scrollWidth && scrollState.scrollWidth > scrollState.width ? ((scrollState.left / (scrollState.scrollWidth - scrollState.width)) * (scrollState.width - thumbWidth - 16)) : 0;

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
        <div style={blueBarStyle}>SIP Trunk Group</div>
        {!showTable ? (
          <div style={{ border: '2px solid #888', borderRadius: 8, marginTop: 32, padding: 32, background: '#fff', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            {SIP_TRUNK_GROUP_FIELDS.filter(f => f.name !== 'sipTrunks').map((field) => (
              <div key={field.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                <label style={{ width: 220, fontSize: 16, color: '#222', textAlign: 'right', marginRight: 32 }}>{field.label}:</label>
                {field.type === 'select' ? (
                  <select name={field.name} value={formData[field.name]} onChange={handleInputChange} style={{ flex: 1, fontSize: 16, padding: '8px 12px', borderRadius: 4, border: '1px solid #bbb', background: '#fff' }}>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : (
                  <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleInputChange} style={{ flex: 1, fontSize: 16, padding: '8px 12px', borderRadius: 4, border: '1px solid #bbb', background: '#fff' }} />
                )}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: 220, fontSize: 16, color: '#222', textAlign: 'right', marginRight: 32 }}>SIP Trunks:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    name="sipTrunks"
                    checked={sipTrunksChecked}
                    onChange={handleSipTrunksCheckbox}
                    style={checkboxStyle}
                  />
                  <span style={{ marginLeft: 6 }}>0</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
                <input
                  type="checkbox"
                  id="checkAllSipTrunks"
                  checked={checkAllChecked}
                  onChange={handleCheckAllCheckbox}
                  style={checkboxStyle}
                />
                <label htmlFor="checkAllSipTrunks" style={{ marginLeft: 6, fontSize: 16, color: '#444' }}>Check All</label>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 32 }}>
              <button style={buttonStyle} onClick={handleSave}>Save</button>
              <button style={buttonStyle} onClick={() => setShowTable(true)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ ...tableContainerStyle, borderBottomLeftRadius:0, borderBottomRightRadius:0, borderBottom:'none' }}>
              <div ref={tableScrollRef} onScroll={handleTableScroll} style={{overflowX: 'auto', scrollbarWidth: 'none', '-ms-overflow-style': 'none'}}>
                <table style={{...tableStyle, minWidth: SIP_TRUNK_GROUP_TABLE_COLUMNS.length * 150 }}>
                  <thead>
                    <tr>
                      {SIP_TRUNK_GROUP_TABLE_COLUMNS.map(col => (
                        <th key={col.key} style={thStyle}>{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pagedGroups.length === 0 ? (
                      <tr><td colSpan={SIP_TRUNK_GROUP_TABLE_COLUMNS.length} style={tdStyle}>No data</td></tr>
                    ) : pagedGroups.map((item, idx) => {
                      const realIdx = (page - 1) * itemsPerPage + idx;
                      return (
                        <tr key={realIdx}>
                          {SIP_TRUNK_GROUP_TABLE_COLUMNS.map(col => {
                            if (col.key === 'check') {
                              return (
                                <td key={col.key} style={tdStyle}>
                                  <input type="checkbox" checked={selected.includes(realIdx)} onChange={() => handleSelectRow(realIdx)} />
                                </td>
                              );
                            }
                            if (col.key === 'modify') {
                              return (
                                <td key={col.key} style={tdStyle}>
                                  <FaPencilAlt style={{ cursor: 'pointer', color: '#0e8fd6' }} onClick={() => handleEdit(realIdx)} />
                                </td>
                              );
                            }
                            let value = item[col.key];
                            if (col.key === 'sipTrunks') value = Array.isArray(value) ? value.join(', ') : value;
                            return <td key={col.key} style={tdStyle}>{value}</td>;
                          })}
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
            <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#e3e7ef', borderRadius: 8, border: '1px solid #bbb', borderTop: 'none', marginTop: 0, padding: '8px 8px 8px 8px' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={tableButtonStyle} onClick={handleCheckAll}>Check All</button>
                <button style={tableButtonStyle} onClick={handleUncheckAll}>Uncheck All</button>
                <button style={tableButtonStyle} onClick={handleInverse}>Inverse</button>
                <button style={tableButtonStyle} onClick={handleDelete}>Delete</button>
                <button style={tableButtonStyle} onClick={handleClearAll}>Clear All</button>
              </div>
              <button style={{ ...addNewButtonStyle, position: 'static', margin: 0 }} onClick={handleAddNew}>Add New</button>
            </div>
            <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', background: '#e3e7ef', borderRadius: 8, border: '1px solid #bbb', borderTop: 'none', marginTop: 4, padding: '2px 8px 2px 8px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 32 }}>
              <span>{groups.length} items Total</span>
              <span style={{marginLeft:'8px'}}>{itemsPerPage} Items/Page</span>
              <span style={{flexGrow: 1}}></span>
              <span>{page}/{totalPages}</span>
              <button style={paginationButtonStyle} onClick={() => setPage(1)} disabled={page === 1}>First</button>
              <button style={paginationButtonStyle} onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
              <button style={paginationButtonStyle} onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
              <button style={paginationButtonStyle} onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last</button>
              <span>Go to Page</span>
              <select style={pageSelectStyle} value={page} onChange={e => setPage(Number(e.target.value))}>
                {Array.from({ length: totalPages }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              </select>
              <span>{totalPages} Pages Total</span>
            </div>
          </>
        )}
      </div>
      <div style={infoTextStyle}>
        Call Barring Settings: Unwanted Area Code, Unwanted Operator, Unwanted Number Type. To configure more than one item, separate by ';'. For example, in case of a single item, you set 010,0,0; in case of multiple items, you set N,3,2;A,1,1;ZJ,2,2...<br/>
        Settings of Unwanted Area Code: Certain Area Code, All Area Codes(A), Province, North Telecom(N), South Telecom(S)<br/>
        Settings of Unwanted Operator: Whole Network(0), TeleCom(1), Mobile(2), Unicom(3)<br/>
        Settings of Unwanted Number Type: Mobile and Landline Phone(0), Landline Phone(1), Mobile Phone(2)
      </div>
    </div>
  );
};

export default SipTrunkGroup;
