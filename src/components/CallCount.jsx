import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {
  INCOMING_SIP_HEADERS,
  INCOMING_SIP_ROWS,
  OUTGOING_SIP_HEADERS,
  OUTGOING_SIP_ROWS,
  PSTN_CALL_HEADERS,
  PSTN_CALL_ROWS,
  IP_PSTN_RELEASE_HEADERS,
  IP_PSTN_RELEASE_ROWS,
  PSTN_IP_RELEASE_HEADERS,
  PSTN_IP_RELEASE_ROWS,
  IP_IP_RELEASE_HEADERS,
  IP_IP_RELEASE_ROWS
} from '../constants/CallCountConstants';

const deepClone = (data) => JSON.parse(JSON.stringify(data));

const initialTables = {
  incoming: deepClone(INCOMING_SIP_ROWS),
  outgoing: deepClone(OUTGOING_SIP_ROWS),
  pstn: deepClone(PSTN_CALL_ROWS),
  ipPstn: deepClone(IP_PSTN_RELEASE_ROWS),
  pstnIp: deepClone(PSTN_IP_RELEASE_ROWS),
  ipIp: deepClone(IP_IP_RELEASE_ROWS),
};

// Store original values for editability check
const originalTables = deepClone(initialTables);

function isEditableCell(tableKey, rowIdx, colIdx) {
  if (tableKey === 'incoming' || tableKey === 'outgoing') return true;
  const orig = originalTables[tableKey][rowIdx]?.[colIdx];
  // Accept both 0 (number) and '0' (string), and '--', '---'
  return orig === 0 || orig === '0' || orig === '--' || orig === '---';
}

const buttonSx = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '18px',
  borderRadius: 2,
  minWidth: 140,
  minHeight: 48,
  px: 2,
  py: 0.5,
  boxShadow: '0 2px 8px #b3e0ff',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
    color: '#fff',
  },
};

const CallCount = () => {
  const [tables, setTables] = useState(deepClone(initialTables));
  const [editingCell, setEditingCell] = useState(null); // {tableKey, rowIdx, colIdx}

  const handleCellChange = (tableKey, rowIdx, colIdx, value) => {
    setTables(prev => {
      const updated = deepClone(prev);
      updated[tableKey][rowIdx][colIdx] = value;
      return updated;
    });
  };

  const handleCellFocus = (tableKey, rowIdx, colIdx) => {
    setEditingCell({ tableKey, rowIdx, colIdx });
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const handleCellKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditingCell(null);
    }
  };

  const handleReset = () => {
    setTables(deepClone(initialTables));
    setEditingCell(null);
  };

  const handleDownload = () => {
    const csvSections = [];
    const addSection = (title, headers, rows) => {
      csvSections.push(title);
      csvSections.push(headers.join(','));
      rows.forEach(row => csvSections.push(row.join(',')));
      csvSections.push('');
    };
    addSection('Incoming SIP Call Statistics', INCOMING_SIP_HEADERS, tables.incoming);
    addSection('Outgoing SIP Call Statistics', OUTGOING_SIP_HEADERS, tables.outgoing);
    addSection('PSTN Call Statistics', PSTN_CALL_HEADERS, tables.pstn);
    addSection('Statistics on IP->PSTN Release Cause', IP_PSTN_RELEASE_HEADERS, tables.ipPstn);
    addSection('Statistics on PSTN->IP Release Cause', PSTN_IP_RELEASE_HEADERS, tables.pstnIp);
    addSection('Statistics on IP->IP Release Cause', IP_IP_RELEASE_HEADERS, tables.ipIp);
    const csvContent = csvSections.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'call_count_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderTable = (headers, rows, tableKey) => (
    <div className="overflow-x-auto w-full mb-10">
      <table className="w-full bg-white border-collapse shadow-sm min-w-[600px]">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="border border-gray-300 bg-[#f8fafd] text-gray-800 font-semibold text-xs py-2 px-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="border border-gray-300 text-center text-xs py-2 px-3">&nbsp;</td>
            </tr>
          ) : (
            rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, colIdx) => {
                  const isEditing = editingCell && editingCell.tableKey === tableKey && editingCell.rowIdx === rowIdx && editingCell.colIdx === colIdx;
                  if (
                    (tableKey === 'incoming' || tableKey === 'outgoing') ||
                    isEditableCell(tableKey, rowIdx, colIdx)
                  ) {
                    return (
                      <td key={colIdx} className="border border-gray-300 text-center text-xs py-2 px-3">
                        {isEditing ? (
                          <input
                            type="text"
                            value={cell}
                            autoFocus
                            className="w-full bg-transparent text-center text-xs outline-none"
                            onChange={e => handleCellChange(tableKey, rowIdx, colIdx, e.target.value)}
                            onBlur={handleCellBlur}
                            onKeyDown={handleCellKeyDown}
                          />
                        ) : (
                          <div
                            className="min-h-[22px] cursor-pointer"
                            onClick={() => setEditingCell({ tableKey, rowIdx, colIdx })}
                          >
                            {cell}
                          </div>
                        )}
                      </td>
                    );
                  } else {
                    return <td key={colIdx} className="border border-gray-300 text-center text-xs py-2 px-3">{cell}</td>;
                  }
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-2 sm:p-4 md:p-8 pt-[40px] flex flex-col items-center">
      <div className="w-full max-w-7xl">
        {/* Incoming SIP Call Statistics */}
        <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center justify-center font-semibold text-base shadow mb-0">
          Incoming SIP Call Statistics
        </div>
        {renderTable(INCOMING_SIP_HEADERS, tables.incoming, 'incoming')}

        {/* Outgoing SIP Call Statistics */}
        <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center justify-center font-semibold text-base shadow mb-0">
          Outgoing SIP Call Statistics
        </div>
        {renderTable(OUTGOING_SIP_HEADERS, tables.outgoing, 'outgoing')}

        {/* PSTN Call Statistics */}
        <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center justify-center font-semibold text-base shadow mb-0">
          PSTN Call Statistics
        </div>
        {renderTable(PSTN_CALL_HEADERS, tables.pstn, 'pstn')}

        {/* Statistics on IP->PSTN Release Cause */}
        <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center justify-center font-semibold text-base shadow mb-0">
          Statistics on IP-&gt;PSTN Release Cause
        </div>
        {renderTable(IP_PSTN_RELEASE_HEADERS, tables.ipPstn, 'ipPstn')}

        {/* Statistics on PSTN->IP Release Cause */}
        <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center justify-center font-semibold text-base shadow mb-0">
          Statistics on PSTN-&gt;IP Release Cause
        </div>
        {renderTable(PSTN_IP_RELEASE_HEADERS, tables.pstnIp, 'pstnIp')}

        {/* Statistics on IP->IP Release Cause */}
        <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center justify-center font-semibold text-base shadow mb-0">
          Statistics on IP-&gt;IP Release Cause
        </div>
        {renderTable(IP_IP_RELEASE_HEADERS, tables.ipIp, 'ipIp')}

        {/* Reset and Download Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
          <Button sx={buttonSx} onClick={handleReset}>Reset</Button>
          <Button sx={buttonSx} onClick={handleDownload}>Download</Button>
        </div>
      </div>
    </div>
  );
};

export default CallCount;