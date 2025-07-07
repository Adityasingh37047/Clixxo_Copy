import React, { useState } from 'react';
import {
  PCM_MAINTENANCE_HEADERS,
  PCM_LOOPBACK_HEADERS,
  PCM0_HEADERS,
  PCM0_STATUS_ROW,
  PCM0_CHECK_ROW,
  PCM_MAINTENANCE_BUTTONS,
  PCM_LOOPBACK_BUTTONS,
  PCM0_BUTTONS
} from '../constants/PcmCircuitMaintenanceConstants';

const blueBarStyle = {
  width: '100%',
  height: 28,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  marginBottom: 0,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 16,
  color: '#2266aa',
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};
const tableStyle = {
  width: 1200,
  minWidth: 1200,
  maxWidth: 1200,
  borderCollapse: 'collapse',
  margin: '0 auto',
  background: '#fff',
  border: '1px solid #ccc'
};
const thStyle = {
  border: '1px solid #bbb',
  padding: '4px 8px',
  background: '#f8fafd',
  fontWeight: 600,
  fontSize: 15,
  textAlign: 'center',
  height: 32
};
const tdStyle = {
  height: 40,
  border: '1px solid #ccc',
  padding: '0 16px'
};
const centerCellStyle = {
  ...tdStyle,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
const labelCellStyle = {
  ...tdStyle,
  width: 260,
  fontWeight: 600,
  textAlign: 'center'
};
const buttonCellStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 32,
  border: 'none',
  padding: 0,
  background: 'transparent'
};
const buttonStyle = {
  padding: '4px 8px',
  border: '1px solid #ccc',
  borderRadius: 3,
  background: 'linear-gradient(to bottom, #f8f8f8 0%, #e8e8e8 100%)',
  cursor: 'pointer',
  fontSize: '12px',
  width: '100px',
  height: '24px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0
};
const buttonBlueStyle = {
  ...buttonStyle,
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
};
const buttonContainerStyle = {
  display: 'flex',
  gap: 4,
  justifyContent: 'center',
  width: '100%',
  padding: '4px 0',
  background: 'linear-gradient(to bottom, #fff 0%, #f5f5f5 100%)'
};

// For wider buttons (Physical Connect/Disconnect)
const wideButtonStyle = {
  ...buttonStyle,
  width: '140px'
};

// PCM0 table cell styles for compact view
const pcm0LabelCellStyle = {
  ...tdStyle,
  width: 90,
  minWidth: 90,
  maxWidth: 90,
  fontWeight: 600,
  textAlign: 'center',
  fontSize: 15,
  background: '#f8fafd',
  padding: 0
};
const pcm0ChannelCellStyle = {
  ...tdStyle,
  width: 32,
  minWidth: 32,
  maxWidth: 32,
  textAlign: 'center',
  padding: 0
};
const pcm0HeaderCellStyle = {
  ...thStyle,
  width: 32,
  minWidth: 32,
  maxWidth: 32,
  textAlign: 'center',
  fontSize: 15,
  padding: 0
};
const pcm0HeaderLabelCellStyle = {
  ...thStyle,
  width: 90,
  minWidth: 90,
  maxWidth: 90,
  textAlign: 'center',
  fontSize: 15,
  background: '#f8fafd',
  padding: 0
};

const PcmCircuitMaintenancePage = () => {
  // State for checkboxes and table data
  const [maintenanceChecked, setMaintenanceChecked] = useState(false);
  const [loopbackChecked, setLoopbackChecked] = useState(false);
  const [pcm0Checked, setPcm0Checked] = useState(Array(32).fill(false));

  // PCM Maintenance section
  const renderPcmMaintenance = () => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ ...blueBarStyle, width: 1200, minWidth: 1200, maxWidth: 1200, margin: 0 }}>PCM Maintenance</div>
      <table style={{ ...tableStyle, borderTop: 'none' }}>
        <tbody>
          <tr>
            <td style={labelCellStyle}>PCM No.</td>
            <td style={centerCellStyle}>0</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>PCM Status</td>
            <td style={centerCellStyle}>
              <div style={{ width: 24, height: 24, background: 'red', border: '1px solid #bbb', borderRadius: 3, margin: 0 }} />
            </td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Check</td>
            <td style={centerCellStyle}>
              <input type="checkbox" checked={maintenanceChecked} onChange={() => setMaintenanceChecked(v => !v)} />
            </td>
          </tr>
        </tbody>
      </table>
      <div style={buttonContainerStyle}>
        {PCM_MAINTENANCE_BUTTONS.map((label, i) => {
          const isAction = ['Block', 'Unblock', 'Physical Connect', 'Physical Disconnect'].includes(label);
          const isWideButton = ['Physical Connect', 'Physical Disconnect'].includes(label);
          const currentStyle = isWideButton ? wideButtonStyle : buttonStyle;
          
          if (!maintenanceChecked && isAction) {
            return (
              <button
                key={label}
                style={{ ...currentStyle, opacity: 0.4, pointerEvents: 'none' }}
                disabled
              >
                {label}
              </button>
            );
          }
          return (
            <button
              key={label}
              style={currentStyle}
              disabled={false}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );

  // PCM LoopBack Config section
  const renderPcmLoopback = () => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ ...blueBarStyle, width: 1200, minWidth: 1200, maxWidth: 1200, margin: 0 }}>PCM LoopBack Config</div>
      <table style={{ ...tableStyle, borderTop: 'none' }}>
        <tbody>
          <tr>
            <td style={labelCellStyle}>PCM No.</td>
            <td style={centerCellStyle}>0</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>PCM LoopBack Status</td>
            <td style={centerCellStyle}>
              <div style={{ width: 24, height: 24, background: '#ccc', border: '1px solid #bbb', borderRadius: 3, margin: 0 }} />
            </td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Check</td>
            <td style={centerCellStyle}>
              <input type="checkbox" checked={loopbackChecked} onChange={() => setLoopbackChecked(v => !v)} />
            </td>
          </tr>
        </tbody>
      </table>
      <div style={buttonContainerStyle}>
        {PCM_LOOPBACK_BUTTONS.map((label, i) => {
          const isAction = ['Local LoopBack', 'Remote LoopBack', 'UnLoopBack'].includes(label);
          const isWideButton = ['Local LoopBack', 'Remote LoopBack', 'UnLoopBack'].includes(label);
          const currentStyle = isWideButton ? wideButtonStyle : buttonStyle;
          
          if (!loopbackChecked && isAction) {
            return (
              <button
                key={label}
                style={{ ...currentStyle, opacity: 0.4, pointerEvents: 'none' }}
                disabled
              >
                {label}
              </button>
            );
          }
          return (
            <button
              key={label}
              style={currentStyle}
              disabled={false}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );

  // PCM0 section
  const handlePcm0Check = idx => {
    setPcm0Checked(prev => prev.map((v, i) => (i === idx ? !v : v)));
  };
  const allChecked = pcm0Checked.every(Boolean);
  const noneChecked = pcm0Checked.every(v => !v);
  const handleCheckAll = () => setPcm0Checked(Array(32).fill(true));
  const handleUncheckAll = () => setPcm0Checked(Array(32).fill(false));
  const handleInverse = () => setPcm0Checked(prev => prev.map(v => !v));

  // Update PCM0_HEADERS in the component
  const PCM0_HEADERS = Array(32).fill('').map((_, i) => {
    if (i === 0) return 'Channel No.';
    return i.toString();
  });

  const PCM0_STATUS_ROW = Array(32).fill('').map((_, i) => {
    if (i === 0) return 'Status';
    return 'gray';
  });

  const PCM0_CHECK_ROW = Array(32).fill('').map((_, i) => {
    if (i === 0) return 'Check';
    return '';
  });

  const renderPcm0 = () => (
    <div style={{ marginBottom: 18 }}>
      <div style={blueBarStyle}>PCM 0</div>
      <table style={{ ...tableStyle, borderTop: 'none' }}>
        <thead>
          <tr>
            <th style={pcm0HeaderLabelCellStyle}>Channel No.</th>
            {Array.from({ length: 31 }, (_, i) => (
              <th key={i+1} style={pcm0HeaderCellStyle}>{i+1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={pcm0LabelCellStyle}>Status</td>
            {Array.from({ length: 31 }, (_, i) => (
              <td key={i+1} style={pcm0ChannelCellStyle}>
                <div style={{ width: 18, height: 18, background: '#ccc', borderRadius: 3, margin: '0 auto', opacity: 0.7 }} />
              </td>
            ))}
          </tr>
          <tr>
            <td style={pcm0LabelCellStyle}>Check</td>
            {Array.from({ length: 31 }, (_, i) => (
              <td key={i+1} style={pcm0ChannelCellStyle}>
                <input 
                  type="checkbox" 
                  checked={pcm0Checked[i] || false} 
                  onChange={() => handlePcm0Check(i)} 
                  style={{ margin: 0 }}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleCheckAll}>Check All</button>
        <button style={buttonStyle} onClick={handleUncheckAll}>Uncheck All</button>
        <button style={buttonStyle} onClick={handleInverse}>Inverse</button>
        <button
          style={allChecked || pcm0Checked.some(Boolean) ? buttonStyle : { ...buttonStyle, opacity: 0.4, pointerEvents: 'none' }}
          disabled={!(allChecked || pcm0Checked.some(Boolean))}
        >Block</button>
        <button
          style={allChecked || pcm0Checked.some(Boolean) ? buttonStyle : { ...buttonStyle, opacity: 0.4, pointerEvents: 'none' }}
          disabled={!(allChecked || pcm0Checked.some(Boolean))}
        >Unblock</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#fff', minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
      <div style={{ width: 1200, margin: '0 auto' }}>
        {renderPcmMaintenance()}
        {renderPcmLoopback()}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          {renderPcm0()}
        </div>
      </div>
    </div>
  );
};

export default PcmCircuitMaintenancePage; 