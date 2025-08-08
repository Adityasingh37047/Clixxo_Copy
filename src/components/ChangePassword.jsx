import React, { useState, useEffect } from 'react';
import { fetchChangePassword } from '../api/apiService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import {
  CHANGE_PASSWORD_FIELDS,
  CHANGE_PASSWORD_INITIAL_FORM,
  CHANGE_PASSWORD_BUTTONS,
  CHANGE_PASSWORD_NOTE,
} from '../constants/ChangePasswordConstants';
import Button from '@mui/material/Button';

const blueBarStyle = {
  width: '100%',
  height: 32,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  marginBottom: 0,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 18,
  color: '#444',
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};
const formContainerStyle = {
  width: '100%',
  maxWidth: 600,
  background: '#fff',
  border: '1px solid #ccc',
  borderRadius: 8,
  margin: '0 auto',
  marginTop: 24,
  marginBottom: 0,
  padding: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',
};
const formTableStyle = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 16px',
  margin: 0,
  padding: 0,
};
const labelTdStyle = {
  textAlign: 'left',
  fontSize: 14,
  color: '#444',
  padding: '8px 16px 8px 24px',
  width: 160,
  fontWeight: 500,
  whiteSpace: 'nowrap',
};
const inputTdStyle = {
  textAlign: 'left',
  padding: '8px 16px 8px 0',
  minWidth: 200,
};
const inputStyle = {
  width: 200,
  maxWidth: '100%',
  fontSize: 15,
  padding: '4px 6px',
  borderRadius: 4,
  border: '1px solid #bbb',
  background: '#fff',
  boxSizing: 'border-box',
};
const buttonSx = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '16px',
  borderRadius: 1.5,
  minWidth: 120,
  px: 2,
  py: 0.5,
  boxShadow: '0 2px 8px #b3e0ff',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
    color: '#fff',
  },
};

const ChangePassword = () => {
  const [form, setForm] = useState(CHANGE_PASSWORD_INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false
  });
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  // Set current username and password from auth context
  useEffect(() => {
    if (user?.username) {
      setForm(prev => ({
        ...prev,
        currentUsername: user.username,
        currentPassword: user.password || '' // Get stored password if available
      }));
    }
  }, [user]);

  // Validation functions
  const passwordRegex = /^[A-Za-z0-9_]{8,}$/;
  
  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (password.length > 12) return 'Password must be maximum 12 characters';
    if (!passwordRegex.test(password)) {
      return 'Password can only contain letters, numbers, and underscores';
    }
    return '';
  };

  const validateUsername = (username) => {
    if (!username) return 'Username is required';
    if (username.length < 8) return 'Username must be at least 8 characters';
    if (username.length > 12) return 'Username must be maximum 12 characters';
    if (!passwordRegex.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return '';
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate current username
    if (!form.currentUsername) {
      errors.currentUsername = 'Current username is required';
    }
    
    // Validate current password
    if (!form.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    // Validate new username
    const usernameError = validateUsername(form.newUsername);
    if (usernameError) {
      errors.newUsername = usernameError;
    }
    
    // Validate new password
    const passwordError = validatePassword(form.newPassword);
    if (passwordError) {
      errors.newPassword = passwordError;
    }
    
    // Validate confirm password
    if (form.newPassword !== form.confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTogglePasswordVisibility = (fieldName) => {
    setShowPasswords(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fix the validation errors before saving.');
      return;
    }

    try {
      setLoading(true);
      setError("");
      setFieldErrors({});

      const changePasswordData = {
        currentUsername: form.currentUsername,
        currentPassword: form.currentPassword,
        newUsername: form.newUsername,
        newPassword: form.newPassword,
        confirmNewPassword: form.confirmNewPassword
      };

      console.log('Changing password with data:', changePasswordData);
      const response = await fetchChangePassword(changePasswordData);
      
      if (response.response === true) {
        // Update user data with new username and password
        const updatedUserData = {
          ...user,
          username: form.newUsername,
          password: form.newPassword // Store the new password
        };
        updateUser(updatedUserData);
        
        // Reset form to show new credentials
        setForm({
          currentUsername: form.newUsername, // Update to new username
          currentPassword: form.newPassword, // Update to new password
          newUsername: '',
          newPassword: '',
          confirmNewPassword: ''
        });
        
        alert('Username and password changed successfully! You will be redirected to login page.');
        // Logout and redirect to login
        logout();
        navigate('/login');
      } else {
        setError(response.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError(error.message || 'Error changing password. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
      {/* Error Message */}
      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px',
          padding: '12px 16px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '6px',
          color: '#dc2626',
          fontSize: '14px',
          maxWidth: '600px',
          width: '100%'
        }}>
          <span style={{ marginRight: '8px' }}>❌</span>
          <span>{error}</span>
        </div>
      )}

      {/* Loading Message */}
      {loading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px',
          padding: '12px 16px',
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '6px',
          color: '#1d4ed8',
          fontSize: '14px',
          maxWidth: '600px',
          width: '100%'
        }}>
          <span style={{ marginRight: '8px' }}>⏳</span>
          <span>Changing password...</span>
        </div>
      )}

      <div style={formContainerStyle}>
        <div style={blueBarStyle}>Change Password</div>
        <form style={{ width: '100%' }} onSubmit={handleSave}>
          <table style={formTableStyle}>
            <tbody>
              {CHANGE_PASSWORD_FIELDS.map((field) => (
                <React.Fragment key={field.name}>
                  <tr>
                    <td style={labelTdStyle}>{field.label}</td>
                    <td style={inputTdStyle}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {field.type === 'password' ? (
                          <TextField
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            type={showPasswords[field.name] ? 'text' : 'password'}
                            disabled={loading}
                            autoComplete="off"
                            variant="outlined"
                            size="small"
                            sx={{
                              width: 240,
                              '& .MuiOutlinedInput-root': {
                                height: 36,
                                fontSize: 13,
                                backgroundColor: '#fff',
                                '& fieldset': {
                                  borderColor: fieldErrors[field.name] ? '#dc2626' : '#bbb',
                                },
                                '&:hover fieldset': {
                                  borderColor: fieldErrors[field.name] ? '#dc2626' : '#999',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: fieldErrors[field.name] ? '#dc2626' : '#3b8fd6',
                                },
                              },
                              '& .MuiInputBase-input': {
                                fontSize: 13,
                                color: '#000',
                              },
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleTogglePasswordVisibility(field.name)}
                                    edge="end"
                                    size="small"
                                    sx={{
                                      color: '#666',
                                      '&:hover': {
                                        color: '#3b8fd6',
                                      },
                                    }}
                                  >
                                    {showPasswords[field.name] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        ) : (
                          <TextField
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            type="text"
                            disabled={loading}
                            autoComplete="off"
                            variant="outlined"
                            size="small"
                            sx={{
                              width: 240,
                              '& .MuiOutlinedInput-root': {
                                height: 36,
                                fontSize: 13,
                                backgroundColor: '#fff',
                                '& fieldset': {
                                  borderColor: fieldErrors[field.name] ? '#dc2626' : '#bbb',
                                },
                                '&:hover fieldset': {
                                  borderColor: fieldErrors[field.name] ? '#dc2626' : '#999',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: fieldErrors[field.name] ? '#dc2626' : '#3b8fd6',
                                },
                              },
                              '& .MuiInputBase-input': {
                                fontSize: 13,
                                color: '#000',
                              },
                            }}
                          />
                        )}
                        {fieldErrors[field.name] && (
                          <div style={{
                            color: '#dc2626',
                            fontSize: '12px',
                            marginTop: '4px',
                            marginLeft: '4px'
                          }}>
                            {fieldErrors[field.name]}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      
      {/* Save Button Only */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <Button 
          sx={buttonSx} 
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Changing Password...' : 'Save'}
        </Button>
      </div>
      
      {/* Red Note */}
      <div style={{ color: 'red', fontSize: 14, marginTop: 16, textAlign: 'center', fontWeight: 500, maxWidth: '600px' }}>
        {CHANGE_PASSWORD_NOTE}
      </div>
    </div>
  );
};

export default ChangePassword; 