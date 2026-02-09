import * as migration_20260209_131023 from './20260209_131023';

export const migrations = [
  {
    up: migration_20260209_131023.up,
    down: migration_20260209_131023.down,
    name: '20260209_131023'
  },
];
