import React, { useState } from 'react';
import { CALLERID_POOL_TABLE_COLUMNS, CALLERID_POOL_MODAL_FIELDS, CALLERID_POOL_INITIAL_FORM } from '../constants/CallerIDPoolConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { Button, TextField, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel } from '@mui/material';

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
    const columns = tableKey === 'pstn_ip'
      ? CALLERID_POOL_TABLE_COLUMNS.map(col =>
          col.key === 'destinationPcm' ? { ...col, label: 'Source PCM' } : col
        )
      : CALLERID_POOL_TABLE_COLUMNS;
    return (
      <div className="w-full md:w-[49%] flex flex-col gap-2">
        <div className="bg-white border-2 border-gray-400 rounded-lg shadow flex flex-col overflow-hidden">
          <div className="bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] h-10 flex items-center justify-center font-semibold text-lg text-black border-b-2 border-gray-400">
            {title}
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {columns.map(col => (
                    <th key={col.key} className="bg-white text-gray-800 font-semibold text-xs border border-gray-300 px-2 py-2 text-center" style={{ minWidth: col.key === 'callerIdRange' ? '120px' : col.key === 'outgoingCallResource' ? '100px' : '60px' }}>
                      <div className="break-words leading-tight">{col.label}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-2 py-2 text-center"><input type="checkbox" checked={checked.includes(idx)} onChange={() => handleCheck(tableKey, idx)} /></td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{row.no}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center text-xs">{row.callerIdRange}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{row.outgoingCallResource}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{row.destinationPcm}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      <EditDocumentIcon style={{ color: '#1976d2', fontSize: 22, cursor: 'pointer' }} onClick={() => handleEdit(tableKey, idx)} />
                    </td>
                  </tr>
                ))}
                {rows.length < 10 && Array.from({ length: 10 - rows.length }).map((_, i) => (
                  <tr key={rows.length + i}>
                    {columns.map((col, j) => (
                      <td key={j} className="border border-gray-300 px-2 py-2 text-center text-gray-300">&nbsp;</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-2">
          <div className="flex gap-2">
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
                color: '#222',
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 1.5,
                minWidth: 90,
                boxShadow: '0 2px 8px #bfc6d1',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(to bottom, #bfc6d1 0%, #e3e7ef 100%)',
                  color: '#222',
                },
              }}
              onClick={() => handleDelete(tableKey)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
                color: '#222',
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 1.5,
                minWidth: 90,
                boxShadow: '0 2px 8px #bfc6d1',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(to bottom, #bfc6d1 0%, #e3e7ef 100%)',
                  color: '#222',
                },
              }}
              onClick={() => handleClear(tableKey)}
            >
              Clear All
            </Button>
          </div>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 16,
              borderRadius: 1.5,
              minWidth: 100,
              boxShadow: '0 2px 8px #b3e0ff',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
                color: '#fff',
              },
            }}
            onClick={() => handleAddNew(tableKey)}
          >
            Add New
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen w-full p-0 m-0">
      {/* Top controls */}
      <form onSubmit={handleSet} className="bg-white rounded-lg p-4 md:p-6 mb-4 border-none w-full mx-auto">
        {/* First row - Manipulate IP->PSTN CallerIDs section */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center justify-between gap-6 min-w-fit">
            <span className="font-medium text-sm whitespace-nowrap">Manipulate IP-&gt;PSTN CallerIDs with Designated Prefix:</span>
            <TextField size="small" value={prefix} onChange={e => setPrefix(e.target.value)} className="w-36" variant="outlined" />
          </div>
          <div className="flex items-center justify-between gap-6 min-w-fit">
            <span className="font-medium text-sm whitespace-nowrap">Starting Date:</span>
            <TextField type="date" size="small" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-40" variant="outlined" />
          </div>
          <div className="flex items-center justify-between gap-6 min-w-fit">
            <span className="font-medium text-sm whitespace-nowrap">Usage Cycle (Day):</span>
            <TextField type="number" size="small" value={usageCycle} onChange={e => setUsageCycle(e.target.value)} className="w-28" variant="outlined" />
          </div>
          <div className="flex items-center justify-between gap-6 min-w-fit">
            <span className="font-medium text-sm whitespace-nowrap">Destination PCM:</span>
            <FormControl size="small" className="w-32">
              <Select value={destinationPcm} onChange={e => setDestinationPcm(e.target.value)} variant="outlined">
                <MenuItem value="PCM">PCM</MenuItem>
                <MenuItem value="Any">Any</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        
        {/* Second row - IP->PSTN Outbound Calls section */}
        <div className="flex flex-wrap items-center gap-15 mb-4">
          <div className="flex items-center justify-between gap-6 min-w-fit">
            <span className="font-medium text-sm whitespace-nowrap">IP-&gt;PSTN Outbound Calls with Designated CallerID:</span>
            <TextField size="small" value={outboundCallerId} onChange={e => setOutboundCallerId(e.target.value)} className="w-28" variant="outlined" />
          </div>
          <div className="flex items-center justify-between gap-6 min-w-fit">
            <span className="font-medium text-sm whitespace-nowrap">IP-&gt;PSTN Designation Mode:</span>
            <FormControl size="small" className="w-40">
              <Select value={designationMode} onChange={e => setDesignationMode(e.target.value)} variant="outlined">
                <MenuItem value="SIP Side Reject">SIP Side Reject</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center gap-6">
            <Button
              type="submit"
              className="min-w-[80px] h-9 bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold rounded-md shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]"
            >
              <span className="text-white text-sm ">Set</span>
            </Button>
          </div>
        </div>
        
        <div className="text-red-600 font-medium text-sm text-center w-full">
          Note: IP-&gt;PSTN Outbound Calls with Designated CallerID set to 0 means the feature is disabled; Usage Cycle set to 0 means not to clear counts.
        </div>
      </form>
      {/* Dual tables */}
      <div className="flex flex-col gap-6 w-full mx-auto md:flex-row md:gap-3 md:justify-between">
        {renderTable(rowsIpPstn, checkedIpPstn, 'ip_pstn', 'IP->PSTN Manipulated CallerID Pool')}
        {renderTable(rowsPstnIp, checkedPstnIp, 'pstn_ip', 'PSTN->IP Manipulated CallerID Pool')}
      </div>
      {/* Modal */}
      <Dialog open={showModal} onClose={handleModalClose} maxWidth="xs" fullWidth>
        <DialogTitle className="bg-gradient-to-b from-[#3b4a56] to-[#222] text-white text-center font-medium text-lg">CallerID</DialogTitle>
        <DialogContent className="bg-[#f4f6fa] flex flex-col gap-2 py-4">
          {CALLERID_POOL_MODAL_FIELDS.filter(f => f.key !== 'callerIdRange').map(field => (
            <div key={field.key} className="mb-2">
              <div className="font-medium text-sm mb-1">
                {field.key === 'destinationPcm' && modalTable === 'pstn_ip' ? 'Source PCM' : field.label}
              </div>
              {field.type === 'select' ? (
                <FormControl size="small" className="w-full">
                  <Select
                    value={modalData[field.key]}
                    onChange={e => handleModalChange(field.key, e.target.value)}
                    variant="outlined"
                  >
                    {field.options.map(opt => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  size="small"
                  type={field.type}
                  value={modalData[field.key]}
                  onChange={e => handleModalChange(field.key, e.target.value)}
                  className="w-full"
                  variant="outlined"
                />
              )}
            </div>
          ))}
          <div className="mb-2">
            <div className="font-medium text-sm mb-1">CallerID:</div>
            <div className="flex gap-2 w-full">
              <TextField
                size="small"
                type="text"
                placeholder="Start"
                value={modalData.callerIdRangeStart}
                onChange={e => handleModalChange('callerIdRangeStart', e.target.value)}
                className="w-1/2"
                variant="outlined"
              />
              <span className="self-center font-semibold">--</span>
              <TextField
                size="small"
                type="text"
                placeholder="End"
                value={modalData.callerIdRangeEnd}
                onChange={e => handleModalChange('callerIdRangeEnd', e.target.value)}
                className="w-1/2"
                variant="outlined"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center gap-6 pb-4">
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 15,
              borderRadius: 1.5,
              minWidth: 90,
              boxShadow: '0 2px 8px #b3e0ff',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
                color: '#fff',
              },
            }}
            onClick={handleModalSave}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 15,
              borderRadius: 1.5,
              minWidth: 90,
              boxShadow: '0 2px 8px #b3e0ff',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
                color: '#fff',
              },
            }}
            onClick={handleModalClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CallerIDPool; 