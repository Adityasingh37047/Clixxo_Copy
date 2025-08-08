export const DDOS_FIELDS = [
  { key: 'webPortAttack', label: 'WEB Port Attack Protection', type: 'checkbox' },
  { key: 'ftpPortAttack', label: 'FTP Port Attack Protection', type: 'checkbox' },
  { key: 'ftpLimit', label: 'FTP Limit', type: 'number' },
  { key: 'sshPortAttack', label: 'SSH Port Attack Protection', type: 'checkbox' },
  { key: 'sshLimit', label: 'SSH Limit', type: 'number' },
  { key: 'telnetPortAttack', label: 'TELNET Port Attack Protection', type: 'checkbox' },
  { key: 'telnetLimit', label: 'TELNET Limit', type: 'number' },
  { key: 'blacklistValidityType', label: 'Set Validity of Attacker IP Blacklist', type: 'select', options: [
    { value: 'inSetTime', label: 'In The Set Time' },
    
  ] },
  { key: 'blacklistTime', label: 'Time (Min)', type: 'number' },
];

export const DDOS_INITIAL_FORM = {
  webPortAttack: false,
  ftpPortAttack: true,
  ftpLimit: 2,
  sshPortAttack: true,
  sshLimit: 2,
  telnetPortAttack: true,
  telnetLimit: 2,
  blacklistValidityType: 'inSetTime',
  blacklistTime: 2,
};

export const DDOS_INFO_LOG = `2024-12-31 14:15:55    Forbid ==> IP: 192.168.0.55, PORT: 21\n2024-12-31 14:17:58    Release ==> IP: 192.168.0.55\n2025-01-02 10:21:18    Forbid ==> IP: 192.168.0.121, PORT: 21\n2025-01-02 10:22:55    Forbid ==> IP: 192.168.1.45, PORT: 21\n2025-01-02 10:23:21    Release ==> IP: 192.168.0.121\n2025-01-02 10:24:59    Release ==> IP: 192.168.1.45`;
