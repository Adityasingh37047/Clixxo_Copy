export const IPTABLES_INFO = `Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
ACCEPT     udp  --  169.254.0.0/24       0.0.0.0/0           udp dpt:67
DROP       udp  --  0.0.0.0/0            0.0.0.0/0           udp dpt:67
ACCEPT     udp  --  169.254.0.0/24       0.0.0.0/0           udp dpt:69
DROP       udp  --  0.0.0.0/0            0.0.0.0/0           udp dpt:69

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         
`;

export const ACCESS_CONTROL_BUTTONS = [
  { key: 'apply', label: 'Apply' },
  { key: 'addNew', label: 'Add New' },
];
