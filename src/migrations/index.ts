import * as migration_20260123_103735 from './20260123_103735';
import * as migration_20260124_170742 from './20260124_170742';
import * as migration_20260124_175415 from './20260124_175415';

export const migrations = [
  {
    up: migration_20260123_103735.up,
    down: migration_20260123_103735.down,
    name: '20260123_103735',
  },
  {
    up: migration_20260124_170742.up,
    down: migration_20260124_170742.down,
    name: '20260124_170742',
  },
  {
    up: migration_20260124_175415.up,
    down: migration_20260124_175415.down,
    name: '20260124_175415'
  },
];
