export const IP_ROUTING_TABLE_COLUMNS = [
  { key: 'checked', label: 'Check', width: 60 },
  { key: 'no', label: 'No.', width: 60 },
  { key: 'destination', label: 'Destination', width: 180 },
  { key: 'gateway', label: 'Gateway', width: 180 },
  { key: 'subnetMask', label: 'Subnet Mask', width: 180 },
  { key: 'networkPort', label: 'Network Port', width: 200 },
  { key: 'modify', label: 'Modify', width: 80 },
];

export const IP_ROUTING_TABLE_MODAL_FIELDS = [
  { key: 'no', label: 'No.', type: 'number', initial: 0 },
  { key: 'destination', label: 'Destination', type: 'text', initial: '' },
  { key: 'subnetMask', label: 'Subnet Mask', type: 'text', initial: '' },
  { key: 'networkPort', label: 'Network Port', type: 'select', options: [
    { value: 'NET 1(192.168.1.101)', label: 'NET 1(192.168.1.101)' },
    { value: 'NET 2(192.168.2.101)', label: 'NET 2(192.168.2.101)' },
  ], initial: 'NET 1(192.168.1.101)' },
];

export const IP_ROUTING_TABLE_INITIAL_ROW = {
  checked: false,
  no: 0,
  destination: '',
  gateway: '',
  subnetMask: '',
  networkPort: 'NET 1(192.168.1.101)',
};
