import React, { useState, useEffect } from 'react';
import { PCM_RECEPTION_TIMEOUT_FIELDS, PCM_RECEPTION_TIMEOUT_INITIAL_FORM, PCM_RECEPTION_TIMEOUT_TABLE_COLUMNS } from '../constants/PcmReceptionTimeoutConstants';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

const PcmReceptionTimeoutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...PCM_RECEPTION_TIMEOUT_INITIAL_FORM });
  const [timeoutData, setTimeoutData] = useState(PCM_RECEPTION_TIMEOUT_INITIAL_FORM);

  // Styles
  const tableContainerStyle = {
    width: '100%',
    background: '#fff',
    borderRadius: 4,
    border: '1px solid #999',
    overflow: 'hidden',
  };

  const blueBarStyle = {
    background: 'linear-gradient(to bottom, #7cc0f1, #3d92d0)',
    padding: '8px 16px',
    fontWeight: 'bold',
    color: '#000',
    fontSize: '14px',
    textAlign: 'center',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
  };

  const thStyle = {
    background: '#fff',
    padding: '8px 16px',
    textAlign: 'center',
    borderBottom: '1px solid #999',
    borderRight: '1px solid #999',
    color: '#333',
    fontWeight: 'normal',
    whiteSpace: 'nowrap',
  };

  const tdStyle = {
    padding: '8px 16px',
    textAlign: 'center',
    borderBottom: '1px solid #999',
    borderRight: '1px solid #999',
    background: '#fff',
    whiteSpace: 'nowrap',
  };

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '0',
    borderRadius: 4,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.15)',
    width: '400px',
    zIndex: 1000,
    marginLeft: '100px',
    marginTop: '40px',
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const modalHeaderStyle = {
    background: 'linear-gradient(to bottom, #4c4c4c, #262626)',
    padding: '12px 20px',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottom: '1px solid #000',
    fontWeight: 'bold',
    color: '#fff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  };

  const modalBodyStyle = {
    padding: '20px',
    background: '#f5f5f5',
  };

  const modalFooterStyle = {
    padding: '12px 20px',
    borderTop: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const buttonStyle = {
    padding: '6px 24px',
    borderRadius: 4,
    border: '1px solid #999',
    background: 'linear-gradient(to bottom, #f0f0f0, #d3d3d3)',
    cursor: 'pointer',
    width: '100px',
    fontSize: '14px',
    color: '#333',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const saveButtonStyle = {
    padding: '6px 24px',
    borderRadius: 4,
    border: '1px solid #3498db',
    background: 'linear-gradient(to bottom, #3498db, #2980b9)',
    cursor: 'pointer',
    width: '100px',
    fontSize: '14px',
    color: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const modalRowStyle = {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    padding: '6px 8px',
    marginBottom: 8,
    minHeight: 32,
  };

  const modalLabelStyle = {
    width: 150,
    fontSize: 14,
    color: '#222',
    textAlign: 'left',
    marginRight: 10,
    whiteSpace: 'nowrap',
  };

  const modalInputStyle = {
    width: '100%',
    fontSize: 14,
    padding: '3px 6px',
    borderRadius: 3,
    border: '1px solid #bbb',
    background: '#fff',
  };

  const inputContainerStyle = {
    border: '1px solid #ccc',
    borderRadius: 4,
    padding: '8px',
    marginBottom: '10px',
    background: '#fff',
  };

  const handleOpenModal = () => {
    setFormData({ ...timeoutData });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setTimeoutData(formData);
    setIsModalOpen(false);
  };

  return (
    <div style={{ background: '#fff', minHeight: 'calc(100vh - 128px)', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', boxSizing: 'border-box' }}>
      <div style={{width:'100%'}}>
        <div style={tableContainerStyle}>
          <div style={blueBarStyle}>Number-receiving Timeout Info</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Inter Digit Timeout(s)</th>
                <th style={thStyle}>Description</th>
                <th style={{ ...thStyle, borderRight: 'none' }}>Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>{timeoutData.interDigitTimeout}</td>
                <td style={tdStyle}>{timeoutData.description}</td>
                <td style={{ ...tdStyle, borderRight: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <button 
                      onClick={handleOpenModal}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <EditDocumentIcon style={{ color: '#666', width: 20, height: 20 }} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div style={modalOverlayStyle} onClick={handleCloseModal}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
              <div style={modalHeaderStyle}>Number-Receiving Timeout</div>
              <div style={modalBodyStyle}>
                {PCM_RECEPTION_TIMEOUT_FIELDS.map(field => (
                  <div key={field.name} style={inputContainerStyle}>
                    <div style={modalRowStyle}>
                      <label style={modalLabelStyle}>{field.label}:</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        style={modalInputStyle}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div style={modalFooterStyle}>
                <button style={saveButtonStyle} onClick={handleSave}>Save</button>
                <button style={buttonStyle} onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PcmReceptionTimeoutPage; 