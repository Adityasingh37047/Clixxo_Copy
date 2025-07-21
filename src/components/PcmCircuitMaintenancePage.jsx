import React, { useState, useRef } from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

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
  color: '#111',
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
  border: '2px solid #888',
};
const thStyle = {
  border: '1px solid #888',
  padding: '4px 8px',
  background: '#f8fafd',
  fontWeight: 600,
  fontSize: 15,
  textAlign: 'center',
  height: 32
};
const tdStyle = {
  height: 40,
  border: '1px solid #888',
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
  border: '1px solid #bbb',
  borderRadius: 0,
  background: 'linear-gradient(to bottom, #e3e7ef 0%, #bfc6d1 100%)',
  color: '#222',
  cursor: 'pointer',
  fontSize: '13px',
  padding: '6px 12px',
  width: '110px',
  height: '28px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  fontWeight: 500,
  boxShadow: '0 1px 2px rgba(0,0,0,0.10)'
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
  width: '220px',
  minWidth: '220px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
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
  // Custom scrollbar state for PCM0
  const pcm0ScrollRef = useRef(null);
  const [pcm0ScrollState, setPcm0ScrollState] = useState({ left: 0, width: 0, scrollWidth: 0 });

  // PCM Maintenance section
  const renderPcmMaintenance = () => (
    <div className="mb-3 w-full max-w-[1200px] mx-auto px-4">
      <div style={{ ...blueBarStyle, width: '100%', minWidth: '100%', maxWidth: '100%', margin: 0 }}>PCM Maintenance</div>
      <div className="overflow-x-auto w-full">
        <table style={{ ...tableStyle, width: '100%', minWidth: '100%', maxWidth: '100%', borderTop: 'none' }} className="min-w-full w-full">
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
                <Checkbox checked={maintenanceChecked} onChange={() => setMaintenanceChecked(v => !v)} sx={{ color: '#6b7280', '&.Mui-checked': { color: '#6b7280' } }} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-wrap gap-2 justify-center mt-2 mb-4">
          {PCM_MAINTENANCE_BUTTONS.map((label, i) => {
            const isWideButton = ['Physical Connect', 'Physical Disconnect'].includes(label);
            const baseClass = `bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[${isWideButton ? '220' : '110'}px] shadow hover:from-gray-300 hover:to-gray-200`;
            if (!maintenanceChecked && ['Block', 'Unblock', 'Physical Connect', 'Physical Disconnect'].includes(label)) {
              return (
                <button
                  key={label}
                  className={baseClass + ' opacity-40 pointer-events-none'}
                  disabled
                >
                  {label}
                </button>
              );
            }
            return (
              <button
                key={label}
                className={baseClass}
                disabled={false}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // PCM LoopBack Config section
  const renderPcmLoopback = () => (
    <div className="mb-3 w-full max-w-[1200px] mx-auto px-4">
      <div style={{ ...blueBarStyle, width: '100%', minWidth: '100%', maxWidth: '100%', margin: 0 }}>PCM LoopBack Config</div>
      <div className="overflow-x-auto w-full">
        <table style={{ ...tableStyle, width: '100%', minWidth: '100%', maxWidth: '100%', borderTop: 'none' }} className="min-w-full w-full">
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
                <Checkbox checked={loopbackChecked} onChange={() => setLoopbackChecked(v => !v)} sx={{ color: '#6b7280', '&.Mui-checked': { color: '#6b7280' } }} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-wrap gap-2 justify-center mt-2 mb-4">
          {PCM_LOOPBACK_BUTTONS.map((label, i) => {
            const isWideButton = ['Local LoopBack', 'Remote LoopBack', 'UnLoopBack'].includes(label);
            const baseClass = `bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[${isWideButton ? '220' : '110'}px] shadow hover:from-gray-300 hover:to-gray-200`;
            if (!loopbackChecked && ['Local LoopBack', 'Remote LoopBack', 'UnLoopBack'].includes(label)) {
              return (
                <button
                  key={label}
                  className={baseClass + ' opacity-40 pointer-events-none'}
                  disabled
                >
                  {label}
                </button>
              );
            }
            return (
              <button
                key={label}
                className={baseClass}
                disabled={false}
              >
                {label}
              </button>
            );
          })}
        </div>
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

  const handlePcm0TableScroll = (e) => {
    setPcm0ScrollState({
      left: e.target.scrollLeft,
      width: e.target.clientWidth,
      scrollWidth: e.target.scrollWidth,
    });
  };
  const handlePcm0ScrollbarDrag = (e) => {
    const track = e.target.parentNode;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    const newScrollLeft = (pcm0ScrollState.scrollWidth - pcm0ScrollState.width) * percent;
    if (pcm0ScrollRef.current) {
      pcm0ScrollRef.current.scrollLeft = newScrollLeft;
    }
  };
  const handlePcm0ArrowClick = (dir) => {
    if (pcm0ScrollRef.current) {
      const delta = dir === 'left' ? -100 : 100;
      pcm0ScrollRef.current.scrollLeft += delta;
    }
  };
  // Thumb size/position
  const pcm0ThumbWidth = pcm0ScrollState.width && pcm0ScrollState.scrollWidth
    ? Math.max(40, (pcm0ScrollState.width / pcm0ScrollState.scrollWidth) * (pcm0ScrollState.width - 8))
    : 40;
  const pcm0ThumbLeft = pcm0ScrollState.width && pcm0ScrollState.scrollWidth && pcm0ScrollState.scrollWidth > pcm0ScrollState.width
    ? ((pcm0ScrollState.left / (pcm0ScrollState.scrollWidth - pcm0ScrollState.width)) * (pcm0ScrollState.width - pcm0ThumbWidth - 16))
    : 0;

  const renderPcm0 = () => {
    // --- NEW: state for container width ---
    const [containerWidth, setContainerWidth] = useState(0);
    const scrollContainerRef = useRef(null);
    // --- END NEW ---

    // --- NEW: update container width on mount/resize ---
    React.useEffect(() => {
      function updateWidth() {
        if (scrollContainerRef.current) {
          setContainerWidth(scrollContainerRef.current.clientWidth);
        }
      }
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }, []);
    // --- END NEW ---

    // --- PCM0 table and scroll logic as before, but use scrollContainerRef ---
    return (
    <div className="mb-4 w-full max-w-[1200px] mx-auto px-4">
      <div style={{ ...blueBarStyle, width: '100%', minWidth: '100%', maxWidth: '100%' }}>PCM 0</div>
        <div style={{ position: 'relative', width: '100%' }}>
          {/* Scrollable table */}
        <div
            ref={el => {
              pcm0ScrollRef.current = el;
              scrollContainerRef.current = el;
            }}
          onScroll={handlePcm0TableScroll}
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            width: '100%',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
              minHeight: 120,
          }}
          className="hide-native-scrollbar"
        >
            <table style={{ ...tableStyle, minWidth: 1400, width: '100%', maxWidth: 'none', borderTop: 'none' }} className="min-w-[1400px]">
            <thead>
              <tr>
                <th style={pcm0HeaderLabelCellStyle}>Channel No.</th>
                {Array.from({ length: 32 }, (_, i) => (
                  <th key={i} style={pcm0HeaderCellStyle}>{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={pcm0LabelCellStyle}>Status</td>
                {Array.from({ length: 32 }, (_, i) => (
                  <td key={i} style={pcm0ChannelCellStyle}>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        background: i === 0 || i === 16 ? '#ff2222' : '#ccc',
                        borderRadius: 3,
                        margin: '0 auto',
                        opacity: 0.7,
                      }}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td style={pcm0LabelCellStyle}>Check</td>
                {Array.from({ length: 32 }, (_, i) => (
                  <td key={i} style={pcm0ChannelCellStyle}>
                    <Checkbox
                      checked={pcm0Checked[i] || false}
                      onChange={() => handlePcm0Check(i)}
                      sx={{ color: '#6b7280', '&.Mui-checked': { color: '#6b7280' } }}
                      style={{ margin: 0 }}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          </div>
          {/* Custom scrollbar OUTSIDE the scrollable div, width matches container */}
          <div
            style={{
              width: containerWidth || '100%',
              background: '#f4f6fa',
              display: 'flex',
              alignItems: 'center',
              height: 24,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              border: '2px solid #888',
              borderTop: 'none',
              padding: '0 4px',
              boxSizing: 'border-box',
              marginTop: -2,
            }}
          >
            <div style={{ width: 18, height: 18, background: '#e3e7ef', border: '1px solid #bbb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#888', cursor: 'pointer', userSelect: 'none' }} onClick={() => handlePcm0ArrowClick('left')}>&#9664;</div>
            <div
              style={{ flex: 1, height: 12, background: '#e3e7ef', borderRadius: 8, position: 'relative', margin: '0 4px', overflow: 'hidden' }}
              onClick={handlePcm0ScrollbarDrag}
            >
              <div
                style={{
                  position: 'absolute',
                  height: 12,
                  background: '#888',
                  borderRadius: 8,
                  cursor: 'pointer',
                  top: 0,
                  width: pcm0ThumbWidth,
                  left: pcm0ThumbLeft,
                }}
                draggable
                onDrag={handlePcm0ScrollbarDrag}
              />
            </div>
            <div style={{ width: 18, height: 18, background: '#e3e7ef', border: '1px solid #bbb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#888', cursor: 'pointer', userSelect: 'none' }} onClick={() => handlePcm0ArrowClick('right')}>&#9654;</div>
          </div>
        </div>
        {/* Action buttons below the table+scrollbar */}
        <div className="flex flex-wrap gap-2 justify-center mt-2 mb-4">
          <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleCheckAll}>Check All</button>
          <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleUncheckAll}>Uncheck All</button>
          <button className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200" onClick={handleInverse}>Inverse</button>
          <button
            className={`bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200${!(allChecked || pcm0Checked.some(Boolean)) ? ' opacity-40 pointer-events-none' : ''}`}
            disabled={!(allChecked || pcm0Checked.some(Boolean))}
          >Block</button>
          <button
            className={`bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200${!(allChecked || pcm0Checked.some(Boolean)) ? ' opacity-40 pointer-events-none' : ''}`}
            disabled={!(allChecked || pcm0Checked.some(Boolean))}
          >Unblock</button>
      </div>
    </div>
  );
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', width: '100%', margin: 0, padding: '16px 0' }}>
      <div className="w-full max-w-[1200px] mx-auto">
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