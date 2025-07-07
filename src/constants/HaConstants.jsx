// HA page constants

export const HA_DEFAULTS = {
  enabled: '',
  virtualIp: ' ',
  primaryBackup: '',
  haEth: '',
};

export const HA_PRIMARY_BACKUP_OPTIONS = [
  'Primary',
  'Backup',
];

export const HA_ETH_OPTIONS = [
  'LAN 2:192.168.0.101',
  'LAN 1:192.168.0.100',
];

export const HA_LABELS = {
  ha: 'HA',
  virtualIp: 'Public Virtual IP',
  primaryBackup: 'Primary/Backup',
  haEth: 'HA Eth',
};
