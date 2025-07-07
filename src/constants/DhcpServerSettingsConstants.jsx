export const DHCP_SERVER_SETTINGS_FIELDS = [
  {
    lan: 'LAN 1',
    fields: [
      { name: 'enabled1', label: 'DHCP Server:', type: 'checkbox' },
      { name: 'ipRange1', label: 'IP Range:', type: 'text' },
      { name: 'subnetMask1', label: 'Subnet Mask:', type: 'text' },
      { name: 'defaultGateway1', label: 'Default Gateway:', type: 'text' },
      { name: 'dnsServer1', label: 'DNS Server:', type: 'text' },
    ]
  },
  {
    lan: 'LAN 2',
    fields: [
      { name: 'enabled2', label: 'DHCP Server:', type: 'checkbox' },
      { name: 'ipRange2', label: 'IP Range:', type: 'text' },
      { name: 'subnetMask2', label: 'Subnet Mask:', type: 'text' },
      { name: 'defaultGateway2', label: 'Default Gateway:', type: 'text' },
      { name: 'dnsServer2', label: 'DNS Server:', type: 'text' },
    ]
  }
];

export const DHCP_SERVER_SETTINGS_INITIAL_FORM = {
  enabled1: false,
  ipRange1: '192.168.1.234-238',
  subnetMask1: '255.255.255.0',
  defaultGateway1: '192.168.1.254',
  dnsServer1: '0.0.0.0',
  enabled2: false,
  ipRange2: '192.168.1.234-238',
  subnetMask2: '255.255.255.0',
  defaultGateway2: '192.168.1.254',
  dnsServer2: '0.0.0.0',
};
