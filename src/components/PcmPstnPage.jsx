import React, { useState } from 'react';
import { 
  PCM_PSTN_SEARCH_FIELDS, 
  PCM_PSTN_TABLE_COLUMNS, 
  SAMPLE_PCM_PSTN_DATA,
  PCM_PSTN_FIELDS,
  PCM_PSTN_INITIAL_FORM
} from '../constants/PcmPstnConstants';
import { 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  FormControl, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Checkbox,
  IconButton,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddIcon from '@mui/icons-material/Add';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

const initialSearchState = PCM_PSTN_SEARCH_FIELDS.reduce((acc, field) => {
  if (field.type === 'select') acc[field.key] = field.options[0];
  else acc[field.key] = '';
  return acc;
}, {});

const PcmPstnPage = () => {
  const [search, setSearch] = useState(initialSearchState);
  const [data, setData] = useState(SAMPLE_PCM_PSTN_DATA);
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(PCM_PSTN_INITIAL_FORM);
  const [editIndex, setEditIndex] = useState(-1);

  const handleSearchChange = (key, value) => {
    setSearch(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log('Search:', search);
  };

  const handleReset = () => {
    setSearch(initialSearchState);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(data.map(item => item.spanNo));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (spanNo) => {
    const selectedIndex = selectedItems.indexOf(spanNo);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedItems, spanNo];
    } else {
      newSelected = selectedItems.filter(id => id !== spanNo);
    }

    setSelectedItems(newSelected);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleCheckAll = () => {
    if (data.length > 0) {
      setSelectedItems(data.map(item => item.spanNo));
    }
  };

  const handleUncheckAll = () => {
    setSelectedItems([]);
  };

  const handleInverse = () => {
    const allIds = data.map(item => item.spanNo);
    const newSelected = allIds.filter(id => !selectedItems.includes(id));
    setSelectedItems(newSelected);
  };

  const handleDelete = () => {
    // Implement delete logic here
    console.log('Delete:', selectedItems);
  };

  const handleClearAll = () => {
    // Implement clear all logic here
    console.log('Clear All');
  };

  const handleAddNew = () => {
    setFormData(PCM_PSTN_INITIAL_FORM);
    setEditIndex(-1);
    setIsModalOpen(true);
  };

  const handleEditItem = (item, index) => {
    setFormData(item);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editIndex >= 0) {
      // Update existing item
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
    } else {
      // Add new item
      setData(prev => [...prev, formData]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col pt-6">
      <div
        className="flex flex-row flex-wrap items-center gap-4 w-full px-6"
        style={{ margin: 0 }}
      >
        {PCM_PSTN_SEARCH_FIELDS.map((field) => (
          <div key={field.key} className="flex flex-row items-center gap-2 min-w-[180px] flex-shrink">
            <span className="text-base text-gray-700 font-medium whitespace-nowrap">{field.label}</span>
            {field.type === 'text' ? (
              <TextField
                placeholder={field.placeholder}
                size="small"
                variant="outlined"
                value={search[field.key]}
                onChange={e => handleSearchChange(field.key, e.target.value)}
                sx={{ minWidth: 120, flexGrow: 1 }}
                inputProps={{ style: { paddingRight: 8, paddingLeft: 8 } }}
              />
            ) : (
              <FormControl size="small" sx={{ minWidth: 120, flexGrow: 1 }}>
                <Select
                  value={search[field.key]}
                  onChange={e => handleSearchChange(field.key, e.target.value)}
                  displayEmpty
                >
                  {field.options.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
        ))}
        <Button
          variant="contained"
          className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-bold shadow-none px-6 py-2 rounded-md"
          sx={{
            minWidth: 100,
            fontWeight: 700,
            fontSize: 16,
            boxShadow: 'none',
            textTransform: 'none',
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            '&:hover': { background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)' },
          }}
          onClick={handleSearch}
          startIcon={<SearchIcon className="text-white" />}
        >
          SEARCH
        </Button>
        <Button
          variant="contained"
          className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-bold shadow-none px-6 py-2 rounded-md"
          sx={{
            minWidth: 100,
            fontWeight: 700,
            fontSize: 16,
            boxShadow: 'none',
            textTransform: 'none',
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            marginLeft: 0,
            '&:hover': { background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)' },
          }}
          onClick={handleReset}
          startIcon={<RestartAltIcon className="text-white" />}
        >
          RESET
        </Button>
      </div>

      {/* Table Section */}
      <div className="mt-6 px-6 w-full">
        <div className="rounded-t-lg h-9 flex items-center justify-center font-semibold text-[18px] text-[#222] shadow-sm"
          style={{background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)', boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)'}}>
          DigitalTrunk
        </div>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderTop: 0, borderRadius: '0 0 4px 4px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="PCM PSTN table">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedItems.length > 0 && selectedItems.length < data.length}
                    checked={data.length > 0 && selectedItems.length === data.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {PCM_PSTN_TABLE_COLUMNS.map((column) => (
                  <TableCell 
                    key={column.key}
                    align="center"
                    sx={{ 
                      fontWeight: 'bold', 
                      padding: '12px 16px',
                      borderRight: '1px solid #e0e0e0',
                      '&:last-child': { borderRight: 'none' }
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, index) => {
                  const isSelected = selectedItems.includes(row.spanNo);
                  return (
                    <TableRow
                      key={row.spanNo}
                      hover
                      onClick={() => handleSelectItem(row.spanNo)}
                      role="checkbox"
                      aria-checked={isSelected}
                      selected={isSelected}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      {PCM_PSTN_TABLE_COLUMNS.map((column) => {
                        if (column.key === 'operation') {
                          return (
                            <TableCell 
                              key={`${row.spanNo}-${column.key}`} 
                              align="center"
                              sx={{ 
                                padding: '8px 16px',
                                borderRight: '1px solid #e0e0e0',
                                '&:last-child': { borderRight: 'none' }
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditItem(row, index);
                              }}
                            >
                              <IconButton size="small" color="primary">
                                <EditDocumentIcon style={{ fontSize: 24, color: '#0e8fd6' }} />
                              </IconButton>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell 
                            key={`${row.spanNo}-${column.key}`} 
                            align="center"
                            sx={{ 
                              padding: '8px 16px',
                              borderRight: '1px solid #e0e0e0',
                              '&:last-child': { borderRight: 'none' }
                            }}
                          >
                            {row[column.key]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={PCM_PSTN_TABLE_COLUMNS.length + 1} align="center" sx={{ py: 3 }}>
                    No data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Buttons and Pagination */}
        <div className="flex flex-col w-full mt-4">
          <div className="flex flex-row justify-between items-center bg-[#e3e7ef] p-2 rounded border border-gray-300">
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button 
                className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200"
                onClick={handleCheckAll}
              >
                Check All
              </button>
              <button 
                className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200"
                onClick={handleUncheckAll}
              >
                Uncheck All
              </button>
              <button 
                className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200"
                onClick={handleInverse}
              >
                Inverse
              </button>
              <button 
                className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button 
                className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-sm rounded px-4 py-2 min-w-[110px] shadow hover:from-gray-300 hover:to-gray-200"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>
            <button 
              className="bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white font-semibold text-base rounded px-6 py-2 min-w-[120px] shadow hover:from-[#0e8fd6] hover:to-[#3bb6f5]"
              onClick={handleAddNew}
            >
              Add New
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 w-full max-w-7xl mx-auto bg-gray-200 rounded-lg border border-gray-300 mt-1 p-2 text-sm text-gray-700">
            <span>{totalItems} items Total</span>
            <span>{rowsPerPage} Items/Page</span>
            <span>{page}/{Math.ceil(totalItems/rowsPerPage) || 1}</span>
            <button 
              className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              First
            </button>
            <button 
              className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400"
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button 
              className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400"
              onClick={() => setPage(prev => Math.min(prev + 1, Math.ceil(totalItems/rowsPerPage) || 1))}
              disabled={page === (Math.ceil(totalItems/rowsPerPage) || 1)}
            >
              Next
            </button>
            <button 
              className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 font-semibold text-xs rounded px-3 py-1 min-w-[60px] shadow disabled:bg-gray-100 disabled:text-gray-400"
              onClick={() => setPage(Math.ceil(totalItems/rowsPerPage) || 1)}
              disabled={page === (Math.ceil(totalItems/rowsPerPage) || 1)}
            >
              Last
            </button>
            <span>Go to Page</span>
            <select 
              className="text-xs rounded border border-gray-300 px-2 py-1 min-w-[48px]"
              value={page}
              onChange={e => {
                const newPage = parseInt(e.target.value);
                if (newPage > 0 && newPage <= (Math.ceil(totalItems/rowsPerPage) || 1)) {
                  setPage(newPage);
                }
              }}
            >
              {Array.from({ length: Math.ceil(totalItems/rowsPerPage) || 1 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <span>{Math.ceil(totalItems/rowsPerPage) || 1} Pages Total</span>
          </div>
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="xs" fullWidth>
        <DialogTitle className="bg-gradient-to-b from-[#23272b] to-[#6e7a8a] text-white text-center font-semibold text-lg">
          {editIndex >= 0 ? 'Edit DigitalTrunk' : 'Add New DigitalTrunk'}
        </DialogTitle>
        <DialogContent className="bg-[#f8fafd] flex flex-col gap-2 py-4">
          {PCM_PSTN_FIELDS.map((field) => (
            <div key={field.name} className="flex flex-row items-center border border-gray-200 rounded px-2 py-1 gap-2 w-full bg-white mb-2">
              <label className="text-[15px] text-gray-700 font-medium whitespace-nowrap text-left min-w-[120px] mr-2">
                {field.label}:
              </label>
              <div className="flex-1 min-w-0">
                {field.type === 'select' ? (
                  <Select
                    value={formData[field.name] || ''}
                    onChange={e => handleInputChange(field.name, e.target.value)}
                    size="small"
                    fullWidth
                    variant="outlined"
                    className="bg-white"
                    sx={{ maxWidth: '100%', minWidth: 0 }}
                  >
                    {field.options.map(option => (
                      <MenuItem key={typeof option === 'object' ? option.value : option} value={typeof option === 'object' ? option.value : option}>
                        {typeof option === 'object' ? option.label : option}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <TextField
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={e => handleInputChange(field.name, e.target.value)}
                    size="small"
                    fullWidth
                    variant="outlined"
                    className="bg-white"
                    sx={{ maxWidth: '100%', minWidth: 0 }}
                    placeholder={field.placeholder || ''}
                  />
                )}
              </div>
            </div>
          ))}
        </DialogContent>
        <DialogActions className="flex justify-center gap-6 pb-4">
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: 1,
              minWidth: 100,
              boxShadow: '0 2px 8px #b3e0ff',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
                color: '#fff',
              },
            }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: 1,
              minWidth: 100,
              boxShadow: '0 2px 8px #b3e0ff',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
                color: '#fff',
              },
            }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PcmPstnPage;