import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select as MuiSelect, MenuItem } from '@mui/material';
import { FaPencilAlt } from 'react-icons/fa';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

const Whitelist = () => {
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
      setCallerRows([...callerRows, { groupNo: modalData.groupNo, noInGroup: modalData.noInGroup, callerId: modalData.idValue }]);
    } else {
      setCalleeRows([...calleeRows, { groupNo: modalData.groupNo, noInGroup: modalData.noInGroup, calleeId: modalData.idValue }]);
    }
    setShowModal(false);
  };

  const handleCallerCheck = idx => setCallerChecked(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  const handleCalleeCheck = idx => setCalleeChecked(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  const handleCallerDelete = () => { setCallerRows(rows => rows.filter((_, idx) => !callerChecked.includes(idx))); setCallerChecked([]); };
  const handleCallerClear = () => { setCallerRows([]); setCallerChecked([]); };
  const handleCalleeDelete = () => { setCalleeRows(rows => rows.filter((_, idx) => !calleeChecked.includes(idx))); setCalleeChecked([]); };
  const handleCalleeClear = () => { setCalleeRows([]); setCalleeChecked([]); };

  return (
    <div className="bg-white min-h-screen p-2 md:p-6">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl mx-auto">
        {/* CallerID Table */}
        <div className="flex-1">
          <div className="flex items-center mb-3 gap-3">
            <label className="font-semibold text-base min-w-[80px]">CallerID:</label>
            <TextField value={callerSearch} onChange={e => setCallerSearch(e.target.value)} size="small" variant="outlined" className="flex-1" />
            <Button variant="contained" sx={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600 }}>Search</Button>
          </div>
          <div className="bg-white border-2 border-gray-300 rounded-lg shadow-sm w-full min-h-[400px] flex flex-col">
            <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center font-semibold text-[17px] text-[#222] justify-center border-b-2 border-gray-300">CallerID Whitelist</div>
            <div className="overflow-x-auto w-full" style={{ height: 400 }}>
              <table className="min-w-[420px] w-full border border-gray-300 border-collapse">
                <thead>
                  <tr>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">Check</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">Group No.</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">No. in Group</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">CallerID</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {callerRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white"><input type="checkbox" checked={callerChecked.includes(idx)} onChange={() => handleCallerCheck(idx)} /></td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.groupNo}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.noInGroup}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.callerId}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">
                        <EditDocumentIcon style={{ color: '#0e8fd6', cursor: 'pointer', margin: '0 auto' }} />
                      </td>
                    </tr>
                  ))}
                  {Array.from({ length: Math.max(0, 10 - callerRows.length) }).map((_, idx) => (
                    <tr key={`empty-caller-${idx}`}> 
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-between items-center mt-4">
            <div className="flex gap-2">
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" disabled={callerChecked.length === 0} onClick={handleCallerDelete}>Delete</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" disabled={callerRows.length === 0} onClick={handleCallerClear}>Clear All</button>
            </div>
            <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-6 py-2 min-w-[120px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={() => handleAddNew('caller')}>Add New</button>
          </div>
        </div>
        {/* CalleeID Table */}
        <div className="flex-1">
          <div className="flex items-center mb-3 gap-3">
            <label className="font-semibold text-base min-w-[80px]">CalleeID:</label>
            <TextField value={calleeSearch} onChange={e => setCalleeSearch(e.target.value)} size="small" variant="outlined" className="flex-1" />
            <Button variant="contained" sx={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontWeight: 600 }}>Search</Button>
          </div>
          <div className="bg-white border-2 border-gray-300 rounded-lg shadow-sm w-full min-h-[400px] flex flex-col">
            <div className="w-full h-8 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center font-semibold text-[17px] text-[#222] justify-center border-b-2 border-gray-300">CalleeID Whitelist</div>
            <div className="overflow-x-auto w-full" style={{ height: 400 }}>
              <table className="min-w-[420px] w-full border border-gray-300 border-collapse">
                <thead>
                  <tr>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">Check</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">Group No.</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">No. in Group</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">CalleeID</th>
                    <th className="bg-white text-gray-900 font-semibold text-[15px] border border-gray-300 px-2 py-1 text-center">Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {calleeRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white"><input type="checkbox" checked={calleeChecked.includes(idx)} onChange={() => handleCalleeCheck(idx)} /></td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.groupNo}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.noInGroup}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">{row.calleeId}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">
                        <EditDocumentIcon style={{ color: '#0e8fd6', cursor: 'pointer', margin: '0 auto' }} />
                      </td>
                    </tr>
                  ))}
                  {Array.from({ length: Math.max(0, 10 - calleeRows.length) }).map((_, idx) => (
                    <tr key={`empty-callee-${idx}`}> 
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                      <td className="border border-gray-300 px-2 py-1 text-center bg-white">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-between items-center mt-4">
            <div className="flex gap-2">
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" disabled={calleeChecked.length === 0} onClick={handleCalleeDelete}>Delete</button>
              <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" disabled={calleeRows.length === 0} onClick={handleCalleeClear}>Clear All</button>
            </div>
            <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-6 py-2 min-w-[120px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={() => handleAddNew('callee')}>Add New</button>
          </div>
        </div>
      </div>
      <div className="text-center text-red-600 text-base mt-8">
        Note: The one list, only the latest 200 pieces will be displayed. To check all the records, please backup the file.
      </div>
      {/* Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth={false} PaperProps={{ sx: { maxWidth: '95vw', width: 380, background: '#f4f6fa', borderRadius: 2, border: '1.5px solid #888' } }}>
        <DialogTitle className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center font-semibold p-3 text-base rounded-t-md">
          {modalType === 'caller' ? 'CallerIDs in Whitelist' : 'CalleeIDs in Whitelist'}
        </DialogTitle>
        <DialogContent className="pt-3 pb-0 px-2" style={{padding: '24px 24px 0 24px'}}>
          <div className="flex flex-col gap-0 w-full">
            <div className="flex items-center gap-2 mb-4">
              <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left w-[110px]">Group No.:</label>
              <MuiSelect value={modalData.groupNo} onChange={e => setModalData({ ...modalData, groupNo: e.target.value })} size="small" fullWidth variant="outlined" sx={{ fontSize: 14 }}>
                {[...Array(10).keys()].map(i => (
                  <MenuItem key={i} value={i} sx={{ fontSize: 14 }}>{i}</MenuItem>
                ))}
              </MuiSelect>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left w-[110px]">No. in Group:</label>
              <TextField type="text" value={modalData.noInGroup} onChange={e => setModalData({ ...modalData, noInGroup: e.target.value })} size="small" fullWidth variant="outlined" inputProps={{ style: { fontSize: 14, padding: '3px 6px' } }} />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="text-[14px] text-gray-700 font-medium whitespace-nowrap text-left w-[110px]">{modalType === 'caller' ? 'CallerID:' : 'CalleeID:'}</label>
              <TextField type="text" value={modalData.idValue} onChange={e => setModalData({ ...modalData, idValue: e.target.value })} size="small" fullWidth variant="outlined" inputProps={{ style: { fontSize: 14, padding: '3px 6px' } }} />
            </div>
          </div>
        </DialogContent>
        <DialogActions className="p-6 pt-2 justify-center gap-6">
          <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-8 py-2 min-w-[100px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={handleSave}>Save</button>
          <button className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-8 py-2 min-w-[100px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]" onClick={() => setShowModal(false)}>Cancel</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Whitelist; 