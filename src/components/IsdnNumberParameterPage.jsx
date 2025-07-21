import React, { useState } from 'react';
import {
  NUMBER_TYPE_TABLE_COLUMNS,
  NUMBER_TYPE_OPTIONS,
  NUMBER_TYPE_MODAL_FIELDS,
  NUMBER_TYPE_MODAL_INITIAL_FORM
} from '../constants/IsdnNumberParamaterConstants';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

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
    <div className="bg-[#f8fafd] border-2 border-gray-300 rounded-lg min-w-0 w-full flex flex-col h-[420px] shadow-sm">
      <div className="w-full bg-gradient-to-b from-[#b3e0ff] to-[#3d92d0] text-[#222] font-semibold text-lg text-center rounded-t-lg border-b-2 border-gray-300 py-2">
        {title}
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full min-w-[1100px] border-collapse table-auto">
          <colgroup>
            <col className="w-[90px]" />
            <col className="w-[80px]" />
            <col className="min-w-[120px] w-[1fr]" />
            <col className="min-w-[120px] w-[1fr]" />
            <col className="w-[130px]" />
            <col className="w-[180px] text-center" />
            <col className="w-[90px]" />
          </colgroup>
          <thead>
            <tr>
              {NUMBER_TYPE_TABLE_COLUMNS.map(col => (
                <th
                  key={col.key}
                  className={`bg-white text-gray-800 font-semibold text-sm border border-gray-300 px-2 py-1 whitespace-nowrap ${col.key === 'setRedirecting' ? 'whitespace-normal text-center' : ''}`}
                  style={{ fontSize: col.key === 'setRedirecting' ? 13 : 14 }}
                >
                  {col.key === 'setRedirecting'
                    ? (<span>Set if Redirecting<br />Number Available</span>)
                    : col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #bbb', height: 48 }}>
                <td className="border border-gray-300 px-2 py-1 text-center bg-white"><Checkbox checked={selected.includes(idx)} onChange={() => handleSelectRow(idx)} size="small" /></td>
                <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.no}</td>
                <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.callerIdPrefix}</td>
                <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.calleeIdPrefix}</td>
                <td className="border border-gray-300 px-2 py-1 text-center bg-white">{NUMBER_TYPE_OPTIONS.find(opt => opt.value === row.type)?.label || ''}</td>
                <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.setRedirecting ? 'Yes' : 'No'}</td>
                <td className="border border-gray-300 px-2 py-1 text-center bg-white">
                  <Button onClick={() => setModalState({ open: true, editIdx: idx, form: row })} sx={{ minWidth: 0, p: 0, borderRadius: 1 }}>
                    <EditDocumentIcon style={{ fontSize: 24, color: '#0e8fd6', transition: 'color 0.2s, transform 0.2s' }} />
                  </Button>
                </td>
              </tr>
            ))}
            {Array.from({ length: Math.max(0, 10 - data.length) }).map((_, i) => (
              <tr key={`empty-${i}`} style={{ borderBottom: '1px solid #bbb', background: '#fff', height: 48 }}>
                {NUMBER_TYPE_TABLE_COLUMNS.map((col, j) => (
                  <td key={j} className="border border-gray-300 px-2 py-1 text-center" style={{ color: '#aaa', background: '#fff' }}>&nbsp;</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center bg-[#e3e7ef] rounded-b-lg border border-t-0 border-gray-300 mt-0 px-2 py-2">
        <div className="flex gap-2">
          <button
            className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200"
            onClick={handleDelete}
          >Delete</button>
          <button
            className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200"
            onClick={handleClearAll}
          >Clear All</button>
        </div>
        <Button variant="contained" sx={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 1.5, minWidth: 120, boxShadow: '0 2px 8px #b3e0ff', textTransform: 'none', '&:hover': { background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)', color: '#fff', }, }} onClick={() => setModalState({ open: true, editIdx: -1, form: NUMBER_TYPE_MODAL_INITIAL_FORM })}>Add New</Button>
      </div>
    </div>
  );
}

function NumberTypeModal({ open, form, setForm, onSave, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="bg-gradient-to-b from-[#23272b] to-[#6e7a8a] text-white text-center font-semibold text-lg">Calling Party Number Type</DialogTitle>
      <DialogContent className="bg-[#f8fafd] flex flex-col gap-3 py-4">
          {NUMBER_TYPE_MODAL_FIELDS.map(field => (
          <div key={field.name} className="flex flex-row items-center border border-gray-200 rounded px-2 py-1 gap-2 w-full bg-white mb-1">
            <label className="text-[15px] text-gray-700 font-medium whitespace-nowrap text-left min-w-[120px] mr-2">{field.label}</label>
            <div className="flex-1 min-w-0">
              {field.type === 'select' ? (
                <Select
                  size="small"
                  value={form[field.name]}
                  onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                  fullWidth
                >
                  {field.options.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
                </Select>
              ) : field.type === 'checkbox' ? (
                <Checkbox checked={form[field.name]} onChange={e => setForm(f => ({ ...f, [field.name]: e.target.checked }))} />
              ) : (
                <TextField
                  type={field.type}
                  size="small"
                  value={form[field.name]}
                  onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                  fullWidth
                />
              )}
            </div>
            </div>
          ))}
      </DialogContent>
      <DialogActions className="flex justify-center gap-6 pb-4">
        <Button
          variant="contained"
          sx={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 1.5, minWidth: 100, boxShadow: '0 2px 8px #b3e0ff', textTransform: 'none', '&:hover': { background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)', color: '#fff', }, }}
          onClick={onSave}
        >
          Save
        </Button>
        <Button
          variant="contained"
          sx={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 1.5, minWidth: 100, boxShadow: '0 2px 8px #b3e0ff', textTransform: 'none', '&:hover': { background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)', color: '#fff', }, }}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const IsdnNumberParameterPage = () => {
  const [enabled, setEnabled] = useState(true);
  const [callingData, setCallingData] = useState([]);
  const [calledData, setCalledData] = useState([]);
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

  return (
    <div className="bg-white min-h-screen p-0 m-0 w-full">
      <div className="w-full pt-8 px-2">
        <div className="flex flex-wrap items-center mb-6 gap-4 px-2">
          <span className="font-semibold text-base mr-2">Judge CallerID/CalleeID Prefix before Number Manipulation:</span>
          <Checkbox checked={enabled} onChange={e => setEnabled(e.target.checked)} size="small" />
          <span className="font-medium text-sm mr-4">Enable</span>
          <Button variant="contained" sx={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600, fontSize: 16, borderRadius: 1.5, minWidth: 100, boxShadow: '0 2px 8px #b3e0ff', textTransform: 'none', '&:hover': { background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)', color: '#fff', }, }}>Set</Button>
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-6 px-0">
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
