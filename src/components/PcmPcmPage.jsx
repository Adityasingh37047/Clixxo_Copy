import React, { useState } from 'react';
import {
  TABLE_HEADERS,
  SIGNALING_PROTOCOL_OPTIONS,
  CLOCK_OPTIONS,
  CONNECTION_LINE_OPTIONS
} from '../constants/PcmPcmConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

const initialPcmData = [{
  pcmNo: 0,
  signalingProtocol: 'ISDN User Side',
  clock: 'Line-synchronization',
  controlMode: '--',
  signalingTimeSlot: 16,
  signalingLinkType: '--',
  connectionLine: 'Twisted Pair Cable',
  crc4: true,
  sipTrunkNo: -1
}];

const PcmPcmPage = () => {
  const [pcmData, setPcmData] = useState(initialPcmData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [modalForm, setModalForm] = useState({});

  const openModal = (idx) => {
    setEditIndex(idx);
    setModalForm({ ...pcmData[idx] });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditIndex(null);
  };
  const handleModalChange = (field, value) => {
    setModalForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleModalCheckbox = (field) => {
    setModalForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const handleSave = () => {
    setPcmData((prev) => prev.map((row, i) => (i === editIndex ? { ...modalForm } : row)));
    closeModal();
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 0, margin: 0 }}>
      <div style={{ maxWidth: 1800, margin: '0 auto', padding: '24px 0' }}>
        <div style={{
          width: '100%',
          background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          color: '#2266aa',
          fontWeight: 600,
          fontSize: 20,
          textAlign: 'center',
          padding: '6px 0',
          marginBottom: 0
        }}>
          PCM Settings
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr>
              {TABLE_HEADERS.map((h, i) => (
                <th key={i} style={{
                  border: '1px solid #bbb',
                  padding: '6px 8px',
                  background: '#f8fafd',
                  fontWeight: 600,
                  fontSize: 15,
                  textAlign: 'center'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pcmData.map((row, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>{row.pcmNo}</td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>{row.signalingProtocol}</td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>{row.clock}</td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>{row.controlMode}</td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>{row.signalingTimeSlot}</td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>{row.signalingLinkType}</td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>{row.connectionLine}</td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>{row.crc4 ? 'Enable' : 'Disable'}</td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>{row.sipTrunkNo}</td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>
                  <button
                    onClick={() => openModal(idx)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      borderRadius: 4,
                      transition: 'background 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#e3e7ef'}
                    onMouseOut={e => e.currentTarget.style.background = 'none'}
                  >
                    <EditDocumentIcon style={{ fontSize: 24, color: '#2266aa' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
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
          }}>
            <div style={{
              background: 'linear-gradient(to bottom, #23272b 0%, #6e7a8a 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 18,
              padding: '10px 0',
              textAlign: 'center',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}>Modify PCM Info</div>
            <div style={{ padding: '12px 8px 0 8px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f4f6fa', border: '1px solid #c0c6cc', borderRadius: 4, padding: '6px 8px', marginBottom: 2, minHeight: 32, gap: 10 }}>
                <div style={{ width: 170, fontSize: 14, color: '#222', textAlign: 'left', whiteSpace: 'nowrap' }}>PCM No.:</div>
                <input
                  type="text"
                  value={modalForm.pcmNo}
                  onChange={e => handleModalChange('pcmNo', e.target.value)}
                  style={{ flex: 1, fontSize: 14, padding: '3px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f4f6fa', border: '1px solid #c0c6cc', borderRadius: 4, padding: '6px 8px', marginBottom: 2, minHeight: 32, gap: 10 }}>
                <div style={{ width: 170, fontSize: 14, color: '#222', textAlign: 'left', whiteSpace: 'nowrap' }}>Signaling Protocol:</div>
                <select
                  value={modalForm.signalingProtocol}
                  onChange={e => handleModalChange('signalingProtocol', e.target.value)}
                  style={{ flex: 1, fontSize: 14, padding: '3px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff' }}
                >
                  {SIGNALING_PROTOCOL_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f4f6fa', border: '1px solid #c0c6cc', borderRadius: 4, padding: '6px 8px', marginBottom: 2, minHeight: 32, gap: 10 }}>
                <div style={{ width: 170, fontSize: 14, color: '#222', textAlign: 'left', whiteSpace: 'nowrap' }}>Signaling Time Slot:</div>
                <input
                  type="text"
                  value={modalForm.signalingTimeSlot}
                  onChange={e => handleModalChange('signalingTimeSlot', e.target.value)}
                  style={{ flex: 1, fontSize: 14, padding: '3px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f4f6fa', border: '1px solid #c0c6cc', borderRadius: 4, padding: '6px 8px', marginBottom: 2, minHeight: 32, gap: 10 }}>
                <div style={{ width: 170, fontSize: 14, color: '#222', textAlign: 'left', whiteSpace: 'nowrap' }}>Clock:</div>
                <select
                  value={modalForm.clock}
                  onChange={e => handleModalChange('clock', e.target.value)}
                  style={{ flex: 1, fontSize: 14, padding: '3px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff' }}
                >
                  {CLOCK_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f4f6fa', border: '1px solid #c0c6cc', borderRadius: 4, padding: '6px 8px', marginBottom: 2, minHeight: 32, gap: 10 }}>
                <div style={{ width: 170, fontSize: 14, color: '#222', textAlign: 'left', whiteSpace: 'nowrap' }}>Connection Line:</div>
                <select
                  value={modalForm.connectionLine}
                  onChange={e => handleModalChange('connectionLine', e.target.value)}
                  style={{ flex: 1, fontSize: 14, padding: '3px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff' }}
                >
                  {CONNECTION_LINE_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f4f6fa', border: '1px solid #c0c6cc', borderRadius: 4, padding: '6px 8px', marginBottom: 2, minHeight: 32, gap: 10 }}>
                <div style={{ width: 170, fontSize: 14, color: '#222', textAlign: 'left', whiteSpace: 'nowrap' }}>Option Sip Trunk ID:</div>
                <input
                  type="text"
                  value={modalForm.sipTrunkNo}
                  onChange={e => handleModalChange('sipTrunkNo', e.target.value)}
                  style={{ flex: 1, fontSize: 14, padding: '3px 6px', borderRadius: 3, border: '1px solid #bbb', background: '#fff' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f4f6fa', border: '1px solid #c0c6cc', borderRadius: 4, padding: '6px 8px', marginBottom: 2, minHeight: 32, gap: 10 }}>
                <input
                  type="checkbox"
                  checked={modalForm.crc4}
                  onChange={() => handleModalCheckbox('crc4')}
                  style={{ marginRight: 8 }}
                />
                <span style={{ fontSize: 14, color: '#222' }}>Enable CRC-4</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f4f6fa', border: '1px solid #c0c6cc', borderRadius: 4, padding: '6px 8px', marginBottom: 2, minHeight: 32, gap: 10 }}>
                <input
                  type="checkbox"
                  checked={modalForm.applyAll || false}
                  onChange={() => handleModalCheckbox('applyAll')}
                  style={{ marginRight: 8 }}
                />
                <span style={{ fontSize: 14, color: '#222' }}>Apply to All PCMs</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, padding: '18px 0' }}>
              <button onClick={handleSave} style={{ background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)', color: '#fff', fontSize: 16, padding: '6px 32px', border: 'none', borderRadius: 4, boxShadow: '0 2px 4px rgba(0,0,0,0.10)', cursor: 'pointer', minWidth: 90 }}>Save</button>
              <button onClick={closeModal} style={{ background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)', color: '#222', fontSize: 16, padding: '6px 32px', border: 'none', borderRadius: 4, boxShadow: '0 2px 4px rgba(0,0,0,0.10)', cursor: 'pointer', minWidth: 90 }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PcmPcmPage; 