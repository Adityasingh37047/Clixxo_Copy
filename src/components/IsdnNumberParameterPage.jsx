import React, { useState } from 'react';
import {
  NUMBER_TYPE_TABLE_COLUMNS,
  NUMBER_TYPE_OPTIONS,
  NUMBER_TYPE_MODAL_FIELDS,
  NUMBER_TYPE_MODAL_INITIAL_FORM
} from '../constants/IsdnNumberParamaterConstants';

const LOCAL_STORAGE_KEY_CALLING = 'calling_party_number_type';
const LOCAL_STORAGE_KEY_CALLED = 'called_party_number_type';

const tableContainerStyle = {
  background: '#f8fafd',
  border: '2px solid #d3d3d3',
  borderRadius: 8,
  minWidth: 0,
  width: 1550,
  maxWidth: 1550,
  margin: 0,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  display: 'flex',
  flexDirection: 'column',
  height: 420,
};
const thStyle = {
  background: '#fff',
  color: '#222',
  fontWeight: 600,
  fontSize: 14,
  border: '1px solid #d3d3d3',
  padding: '2px 4px',
  whiteSpace: 'nowrap',
  height: 28,
  wordBreak: 'normal',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
const tdStyle = {
  border: '1px solid #d3d3d3',
  padding: '2px 4px',
  fontSize: 13,
  background: '#fff',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  height: 28,
  wordBreak: 'normal',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
const tableButtonStyle = {
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222', fontSize: 15, padding: '4px 18px', border: '1px solid #bbb', borderRadius: 6, boxShadow: '0 1px 2px rgba(0,0,0,0.10)', cursor: 'pointer', fontWeight: 500,
};
const addNewTableButtonStyle = {
  ...tableButtonStyle, background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', marginLeft: 12, minWidth: 120
};

function NumberTypeTable({ title, data, setData, modalState, setModalState }) {
  const [selected, setSelected] = useState([]);
  const handleSelectRow = idx => setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  const handleDelete = () => {
    const newData = data.filter((_, idx) => !selected.includes(idx));
    setData(newData);
    setSelected([]);
  };
  const handleClearAll = () => {
    setData([]);
    setSelected([]);
  };
  return (
    <div style={tableContainerStyle}>
      <div style={{
        width: '100%',
        background: 'linear-gradient(to bottom, #7cc0f1, #3d92d0)',
        color: '#222',
        fontWeight: 600,
        fontSize: 20,
        textAlign: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottom: '2px solid #d3d3d3',
        padding: '6px 0',
        letterSpacing: 0.2,
        marginBottom: 0
      }}>{title}</div>
      <div style={{ overflowY: 'auto', overflowX: 'auto', flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '90px' }} />
            <col style={{ width: '80px' }} />
            <col style={{ minWidth: '120px', width: '1fr' }} />
            <col style={{ minWidth: '120px', width: '1fr' }} />
            <col style={{ width: '130px' }} />
            <col style={{ width: '180px', textAlign: 'center' }} />
            <col style={{ width: '90px' }} />
          </colgroup>
          <thead>
            <tr>
              {NUMBER_TYPE_TABLE_COLUMNS.map(col => (
                <th
                  key={col.key}
                  style={{
                    ...thStyle,
                    whiteSpace: col.key === 'setRedirecting' ? 'normal' : thStyle.whiteSpace,
                    lineHeight: col.key === 'setRedirecting' ? '1.1' : thStyle.lineHeight,
                    fontSize: col.key === 'setRedirecting' ? 13 : thStyle.fontSize,
                    textAlign: col.key === 'setRedirecting' ? 'center' : thStyle.textAlign,
                    width: col.key === 'setRedirecting' ? 180 : undefined,
                  }}
                >
                  {col.key === 'setRedirecting'
                    ? (<span>Set if Redirecting<br/>Number Available</span>)
                    : col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td style={{ ...tdStyle, background: idx === 0 ? '#fff' : tdStyle.background }}><input type="checkbox" checked={selected.includes(idx)} onChange={() => handleSelectRow(idx)} /></td>
                <td style={{ ...tdStyle, background: idx === 0 ? '#fff' : tdStyle.background }}>{row.no}</td>
                <td style={{ ...tdStyle, background: idx === 0 ? '#fff' : tdStyle.background }}>{row.callerIdPrefix}</td>
                <td style={{ ...tdStyle, background: idx === 0 ? '#fff' : tdStyle.background }}>{row.calleeIdPrefix}</td>
                <td style={{ ...tdStyle, background: idx === 0 ? '#fff' : tdStyle.background }}>{NUMBER_TYPE_OPTIONS.find(opt => opt.value === row.type)?.label || ''}</td>
                <td style={{ ...tdStyle, background: idx === 0 ? '#fff' : tdStyle.background }}>{row.setRedirecting ? 'Yes' : 'No'}</td>
                <td style={{ ...tdStyle, background: idx === 0 ? '#fff' : tdStyle.background }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => setModalState({ open: true, editIdx: idx, form: row })}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M14.85 2.85a1.2 1.2 0 0 1 1.7 1.7l-1.1 1.1-1.7-1.7 1.1-1.1Zm-2.1 2.1-8.1 8.1V15h2.95l8.1-8.1-2.95-2.95ZM3 13.5l8.1-8.1 2.95 2.95-8.1 8.1H3v-2.95Z" fill="#0e8fd6"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#e3e7ef', borderRadius: 8, border: '1px solid #d3d3d3', borderTop: 'none', marginTop: 0, padding: '8px 8px 8px 8px' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={tableButtonStyle} onClick={handleDelete}>Delete</button>
          <button style={tableButtonStyle} onClick={handleClearAll}>Clear All</button>
        </div>
        <button style={addNewTableButtonStyle} onClick={() => setModalState({ open: true, editIdx: -1, form: NUMBER_TYPE_MODAL_INITIAL_FORM })}>Add New</button>
      </div>
    </div>
  );
}

function NumberTypeModal({ open, form, setForm, onSave, onClose }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.10)' }}>
      <div style={{ background: '#fff', border: '2px solid #222', borderRadius: 6, width: 340, maxWidth: '95vw', marginTop: 80, boxShadow: '0 8px 32px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'linear-gradient(to bottom, #23272b 0%, #6e7a8a 100%)', color: '#fff', fontWeight: 600, fontSize: 18, padding: '10px 0', textAlign: 'center', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>Calling Party Number Type</div>
        <div style={{ padding: '16px 18px 0 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {NUMBER_TYPE_MODAL_FIELDS.map(field => (
            <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <label style={{ fontWeight: 500, fontSize: 15 }}>{field.label}</label>
              {field.type === 'select' ? (
                <select value={form[field.name]} onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))} style={{ fontSize: 15, padding: '4px 8px', borderRadius: 4, border: '1px solid #bbb', background: '#fff' }}>
                  {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              ) : field.type === 'checkbox' ? (
                <input type="checkbox" checked={form[field.name]} onChange={e => setForm(f => ({ ...f, [field.name]: e.target.checked }))} />
              ) : (
                <input type={field.type} value={form[field.name]} onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))} style={{ fontSize: 15, padding: '4px 8px', borderRadius: 4, border: '1px solid #bbb', background: '#fff' }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, padding: '18px 0' }}>
          <button onClick={onSave} style={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 15, border: '1.2px solid #1976d2', borderRadius: 6, padding: '6px 32px', boxShadow: '0 2px 6px #0002', cursor: 'pointer' }}>Save</button>
          <button onClick={onClose} style={{ background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222', fontWeight: 600, fontSize: 15, border: '1.2px solid #bbb', borderRadius: 6, padding: '6px 32px', boxShadow: '0 2px 6px #0002', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </div>
  );
}

const IsdnNumberParameterPage = () => {
  const [enabled, setEnabled] = useState(true);
  const [callingData, setCallingData] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CALLING);
    return saved ? JSON.parse(saved) : [];
  });
  const [calledData, setCalledData] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CALLED);
    return saved ? JSON.parse(saved) : [];
  });
  // Modal state for both tables
  const [callingModal, setCallingModal] = useState({ open: false, editIdx: -1, form: NUMBER_TYPE_MODAL_INITIAL_FORM });
  const [calledModal, setCalledModal] = useState({ open: false, editIdx: -1, form: NUMBER_TYPE_MODAL_INITIAL_FORM });

  // Modal handlers
  const handleModalSave = (which) => {
    if (which === 'calling') {
      setCallingData(prev => {
        let updated;
        if (callingModal.editIdx > -1) {
          updated = [...prev];
          updated[callingModal.editIdx] = callingModal.form;
        } else {
          updated = [...prev, callingModal.form];
        }
        localStorage.setItem(LOCAL_STORAGE_KEY_CALLING, JSON.stringify(updated));
        return updated;
      });
      setCallingModal({ open: false, editIdx: -1, form: NUMBER_TYPE_MODAL_INITIAL_FORM });
    } else {
      setCalledData(prev => {
        let updated;
        if (calledModal.editIdx > -1) {
          updated = [...prev];
          updated[calledModal.editIdx] = calledModal.form;
        } else {
          updated = [...prev, calledModal.form];
        }
        localStorage.setItem(LOCAL_STORAGE_KEY_CALLED, JSON.stringify(updated));
        return updated;
      });
      setCalledModal({ open: false, editIdx: -1, form: NUMBER_TYPE_MODAL_INITIAL_FORM });
    }
  };

  // Modal close
  const handleModalClose = (which) => {
    if (which === 'calling') setCallingModal({ open: false, editIdx: -1, form: NUMBER_TYPE_MODAL_INITIAL_FORM });
    else setCalledModal({ open: false, editIdx: -1, form: NUMBER_TYPE_MODAL_INITIAL_FORM });
  };

  // Persist data on change
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CALLING, JSON.stringify(callingData));
  }, [callingData]);
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CALLED, JSON.stringify(calledData));
  }, [calledData]);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 0, margin: 0 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 0 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ fontWeight: 500, fontSize: 16, marginRight: 16 }}>Judge CallerID/CalleeID Prefix before Number Manipulation:</span>
          <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} style={{ width: 16, height: 16, marginRight: 10 }} />
          <span style={{ fontWeight: 500, fontSize: 15, marginRight: 24 }}>Enable</span>
          <button style={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 16, border: '1.2px solid #1976d2', borderRadius: 6, padding: '6px 32px', boxShadow: '0 2px 6px #0002', cursor: 'pointer', marginLeft: 12 }}>Set</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
          <NumberTypeTable title="Calling Party Number Type" data={callingData} setData={setCallingData} modalState={callingModal} setModalState={setCallingModal} />
          <NumberTypeTable title="Called Party Number Type" data={calledData} setData={setCalledData} modalState={calledModal} setModalState={setCalledModal} />
        </div>
        <NumberTypeModal open={callingModal.open} form={callingModal.form} setForm={f => setCallingModal(m => ({ ...m, form: typeof f === 'function' ? f(m.form) : f }))} onSave={() => handleModalSave('calling')} onClose={() => handleModalClose('calling')} />
        <NumberTypeModal open={calledModal.open} form={calledModal.form} setForm={f => setCalledModal(m => ({ ...m, form: typeof f === 'function' ? f(m.form) : f }))} onSave={() => handleModalSave('called')} onClose={() => handleModalClose('called')} />
      </div>
    </div>
  );
};

export default IsdnNumberParameterPage;
