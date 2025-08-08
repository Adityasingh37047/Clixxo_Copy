export const NETWORK_SETTINGS_FIELDS = [
  {
    section: 'LAN 1',
    fields: [
      { name: 'ipv4Type1', label: 'IPV4 Network Type (M):', type: 'select', options: [
        { value: 'Static', label: 'Static' },
      ] },
      { name: 'ipAddress1', label: 'IP Address (I):', type: 'text' },
      { name: 'subnetMask1', label: 'Subnet Mask (U):', type: 'text' },
      { name: 'defaultGateway1', label: 'Default Gateway (D):', type: 'text' },
      { name: 'ipv6Address1', label: 'IPV6 Address (I):', type: 'text' },
      { name: 'ipv6Prefix1', label: 'IPV6 Address Prefix (U):', type: 'text' },
    ]
  },
  {
    section: 'LAN 2',
    fields: [
      { name: 'ipv4Type2', label: 'IPV4 Network Type (M):', type: 'select', options: [
        { value: 'Static', label: 'Static' },
      ] },
      { name: 'ipAddress2', label: 'IP Address (I):', type: 'text' },
      { name: 'subnetMask2', label: 'Subnet Mask (U):', type: 'text' },
      { name: 'defaultGateway2', label: 'Default Gateway (D):', type: 'text' },
      { name: 'ipv6Address2', label: 'IPV6 Address (I):', type: 'text' },
      { name: 'ipv6Prefix2', label: 'IPV6 Address Prefix (U):', type: 'text' },
    ]
  },
  {
    section: 'DNS Server Set',
    fields: [
      { name: 'preferredDns', label: 'Preferred DNS Server (P):', type: 'text' },
      { name: 'standbyDns', label: 'Standby DNS Server (P):', type: 'text' },
    ]
  },
  {
    section: 'ARP Mode',
    fields: [
      { name: 'defaultArpMode', label: 'Default Mode:', type: 'select', options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
      ] },
    ]
  }
];

export const NETWORK_SETTINGS_INITIAL_FORM = {
  ipv4Type1: 'Static',
  ipAddress1: '192.168.1.101',
  subnetMask1: '255.255.255.0',
  defaultGateway1: '192.168.1.254',
  ipv6Address1: '',
  ipv6Prefix1: '64',
  ipv4Type2: 'Static',
  ipAddress2: '192.168.0.101',
  subnetMask2: '255.255.255.0',
  defaultGateway2: '192.168.0.54',
  ipv6Address2: '',
  ipv6Prefix2: '64',
  preferredDns: '0.0.0.0',
  standbyDns: '0.0.0.0',
  defaultArpMode: '1',
};
