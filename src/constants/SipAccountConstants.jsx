export const SIP_ACCOUNT_FIELDS = [
  { name: 'index', label: 'Index', type: 'text', defaultValue: '0' },
  { name: 'sipTrunkNo', label: 'SIP Trunk No.', type: 'select', options: [{ value: '0', label: '0' }], defaultValue: '0' },
  { name: 'username', label: 'Username', type: 'text', defaultValue: '' },
  { name: 'password', label: 'Password', type: 'password', defaultValue: '' },
  { name: 'registerExpires', label: 'Register Expires (s)', type: 'text', defaultValue: '3600' },
  { name: 'authenticationUsername', label: 'Authentication Username', type: 'text', defaultValue: '' },
  { name: 'description', label: 'Description', type: 'text', defaultValue: 'default' },
];

export const SIP_ACCOUNT_TABLE_COLUMNS = [
  { key: 'check', label: 'Check' },
  { key: 'index', label: 'Index' },
  { key: 'sipTrunkNo', label: 'SIP Trunk No.' },
  { key: 'username', label: 'Username' },
  { key: 'registerExpires', label: 'Register Expires (s)' },
  { key: 'authenticationUsername', label: 'Authentication Username' },
  { key: 'description', label: 'Description' },
  { key: 'modify', label: 'Modify' },
];

export const SIP_ACCOUNT_INITIAL_FORM = SIP_ACCOUNT_FIELDS.reduce((acc, field) => {
  acc[field.name] = field.defaultValue;
  return acc;
}, {});
