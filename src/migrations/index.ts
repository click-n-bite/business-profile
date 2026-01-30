import * as migration_20260123_103735 from './20260123_103735';
import * as migration_20260124_170742 from './20260124_170742';
import * as migration_20260124_175415 from './20260124_175415';
import * as migration_20260126_080601 from './20260126_080601';
import * as migration_20260127_161602 from './20260127_161602';
import * as migration_20260128_061043 from './20260128_061043';
import * as migration_20260128_180925 from './20260128_180925';
import * as migration_20260128_191038 from './20260128_191038';
import * as migration_20260130_200648 from './20260130_200648';
import * as migration_20260130_201115 from './20260130_201115';

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
    name: '20260124_175415',
  },
  {
    up: migration_20260126_080601.up,
    down: migration_20260126_080601.down,
    name: '20260126_080601',
  },
  {
    up: migration_20260127_161602.up,
    down: migration_20260127_161602.down,
    name: '20260127_161602',
  },
  {
    up: migration_20260128_061043.up,
    down: migration_20260128_061043.down,
    name: '20260128_061043',
  },
  {
    up: migration_20260128_180925.up,
    down: migration_20260128_180925.down,
    name: '20260128_180925',
  },
  {
    up: migration_20260128_191038.up,
    down: migration_20260128_191038.down,
    name: '20260128_191038',
  },
  {
    up: migration_20260130_200648.up,
    down: migration_20260130_200648.down,
    name: '20260130_200648',
  },
  {
    up: migration_20260130_201115.up,
    down: migration_20260130_201115.down,
    name: '20260130_201115'
  },
];
