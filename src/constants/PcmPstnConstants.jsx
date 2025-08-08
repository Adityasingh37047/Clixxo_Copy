export const PCM_PSTN_SEARCH_FIELDS = [
  { key: 'spanNo', label: 'SpanNO', type: 'text', placeholder: 'Please input SpanNO' },
  { key: 'context', label: 'Context', type: 'select', options: ['Please select', 'Route1', 'Pstn-E1'] },
  { key: 'signalling', label: 'Signalling', type: 'select', options: ['Please select', 'Signalling1', 'Signalling2'] },
  { key: 'status', label: 'Status', type: 'select', options: ['Please select', 'Active', 'Inactive'] },
];

// PCM PSTN modal fields and initial state
export const PCM_PSTN_FIELDS = [
  {
    name: 'index',
    label: 'Index',
    type: 'select',
    options: Array.from({ length: 1 }, (_, i) => ({ value: i, label: i.toString() })),
  },
  {
    name: 'spanNo',
    label: 'SpanNO',
    type: 'text',
    placeholder: 'Please input SpanNO',
  },
  {
    name: 'context',
    label: 'Context',
    type: 'select',
    options: ['Please select', 'Context1', 'Context2'],
  },
  {
    name: 'framing',
    label: 'Framing',
    type: 'select',
    options: ['Please select', 'ESF', 'D4', 'CRC4', 'NO-CRC4'],
  },
  {
    name: 'coding',
    label: 'Coding',
    type: 'select',
    options: ['Please select', 'HDB3', 'AMI', 'B8ZS'],
  },
  {
    name: 'timeSrc',
    label: 'TimeSrc',
    type: 'select',
    options: ['Please select', 'Internal', 'External', 'Recovery'],
  },
  {
    name: 'signalling',
    label: 'Signalling',
    type: 'select',
    options: ['Please select', 'Signalling1', 'Signalling2'],
  },
  {
    name: 'group',
    label: 'Group',
    type: 'select',
    options: ['Please select', 'Group1', 'Group2'],
  },
  {
    name: 'priSwitchType',
    label: 'PRI SwitchType',
    type: 'select',
    options: ['Please select', 'Type1', 'Type2', 'Type3'],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: ['Please select', 'Active', 'Inactive'],
  },
];

export const PCM_PSTN_INITIAL_FORM = {
  index: 0,
  spanNo: '',
  context: '',
  framing: '',
  coding: '',
  timeSrc: '',
  signalling: '',
  group: '',
  priSwitchType: '',
  status: '',
};

export const PCM_PSTN_TABLE_COLUMNS = [
  { key: 'check', label: 'Check' },
  { key: 'spanNo', label: 'SpanNO' },
  { key: 'context', label: 'Context' },
  { key: 'framing', label: 'Framing' },
  { key: 'coding', label: 'Coding' },
  { key: 'timeSrc', label: 'TimeSrc' },
  { key: 'signalling', label: 'Signalling' },
  { key: 'group', label: 'Group' },
  { key: 'priSwitchType', label: 'PRI SwitchType' },
  { key: 'status', label: 'Status' },
  { key: 'operation', label: 'Operation' },
];

// Sample data for the PCM PSTN table
export const SAMPLE_PCM_PSTN_DATA = [
  // You can add sample data here if needed
  // Example:
  // {
  //   spanNo: '1',
  //   context: 'Route1',
  //   framing: 'ESF',
  //   coding: 'HDB3',
  //   timeSrc: 'Internal',
  //   signalling: 'Signalling1',
  //   group: 'Group1',
  //   priSwitchType: 'Type1',
  //   status: 'Active',
  //   operation: 'Edit',
  // },
];
