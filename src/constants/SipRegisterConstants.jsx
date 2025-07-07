export const sipRegisterFields = [
  { name: 'index', label: 'Index', type: 'text', defaultValue: '0' },
  { name: 'sipTrunkNo', label: 'SIP Trunk No.', type: 'select', options: [{ value: '0', label: '0' }], defaultValue: '0' },
  { name: 'username', label: 'Username', type: 'text', defaultValue: 'admin' },
  { name: 'registerAddress', label: 'Register Address', type: 'text', defaultValue: '192.168.1.85' },
  { name: 'registerPort', label: 'Register Port', type: 'text', defaultValue: ' ' },
  { name: 'domainName', label: 'Domain Name', type: 'text', defaultValue: 'upw.stbi.ims.bsnl.in' },
  { name: 'registerExpires', label: 'Register Expires (s)', type: 'text', defaultValue: ' ' },
  { name: 'authenticationUsername', label: 'Authentication Username', type: 'text', defaultValue: '8657188921532@ims.' },
  { name: 'password', label: 'Password', type: 'password', defaultValue: '***' },
];

export const SIP_REGISTER_TABLE_COLUMNS = [
  { key: 'check', label: 'Check' },
  { key: 'index', label: 'Index' },
  { key: 'sipTrunkNo', label: 'SIP Trunk No.' },
  { key: 'username', label: 'Username' },
  { key: 'registerAddress', label: 'Register Address' },
  { key: 'registerPort', label: 'Register Port' },
  { key: 'domainName', label: 'Domain Name' },
  { key: 'registerExpires', label: 'Register Expires (s)' },
  { key: 'registerStatus', label: 'Register Status' },
  { key: 'authenticationUsername', label: 'Authentication Username' },
  { key: 'modify', label: 'Modify' },
];

export const SIP_REGISTER_INITIAL_FORM = sipRegisterFields.reduce((acc, field) => {
  acc[field.name] = field.defaultValue;
  return acc;
}, {});
