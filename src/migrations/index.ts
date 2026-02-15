import * as migration_20260209_151539 from './20260209_151539';
import * as migration_20260209_153446 from './20260209_153446';
import * as migration_20260215_200423 from './20260215_200423';
import * as migration_20260215_205008 from './20260215_205008';
import * as migration_20260215_205249 from './20260215_205249';
import * as migration_20260215_210904 from './20260215_210904';
import * as migration_20260215_212445 from './20260215_212445';
import * as migration_20260215_212927 from './20260215_212927';

export const migrations = [
  {
    up: migration_20260209_151539.up,
    down: migration_20260209_151539.down,
    name: '20260209_151539',
  },
  {
    up: migration_20260209_153446.up,
    down: migration_20260209_153446.down,
    name: '20260209_153446',
  },
  {
    up: migration_20260215_200423.up,
    down: migration_20260215_200423.down,
    name: '20260215_200423',
  },
  {
    up: migration_20260215_205008.up,
    down: migration_20260215_205008.down,
    name: '20260215_205008',
  },
  {
    up: migration_20260215_205249.up,
    down: migration_20260215_205249.down,
    name: '20260215_205249',
  },
  {
    up: migration_20260215_210904.up,
    down: migration_20260215_210904.down,
    name: '20260215_210904',
  },
  {
    up: migration_20260215_212445.up,
    down: migration_20260215_212445.down,
    name: '20260215_212445',
  },
  {
    up: migration_20260215_212927.up,
    down: migration_20260215_212927.down,
    name: '20260215_212927'
  },
];
