import * as migration_20260217_110204 from './20260217_110204';
import * as migration_20260217_110414 from './20260217_110414';
import * as migration_20260217_111022 from './20260217_111022';

export const migrations = [
  {
    up: migration_20260217_110204.up,
    down: migration_20260217_110204.down,
    name: '20260217_110204',
  },
  {
    up: migration_20260217_110414.up,
    down: migration_20260217_110414.down,
    name: '20260217_110414',
  },
  {
    up: migration_20260217_111022.up,
    down: migration_20260217_111022.down,
    name: '20260217_111022'
  },
];
