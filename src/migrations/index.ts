import * as migration_20260209_151539 from './20260209_151539';
import * as migration_20260209_153446 from './20260209_153446';

export const migrations = [
  {
    up: migration_20260209_151539.up,
    down: migration_20260209_151539.down,
    name: '20260209_151539',
  },
  {
    up: migration_20260209_153446.up,
    down: migration_20260209_153446.down,
    name: '20260209_153446'
  },
];
