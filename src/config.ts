import { LogLevelDesc } from 'loglevel'

import packageJson from '../package.json'

type Config = {
  APP_NAME: string
  BUILD_VERSION: string
  LOG_LEVEL: LogLevelDesc
}

export const config: Config = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_BUILD_VERSION,
  LOG_LEVEL: 'trace' as LogLevelDesc,
}

// Object.assign(config, _mapEnvCfg(import.meta.env))
// Object.assign(config, _mapEnvCfg(document.ENV))
//
// function _mapEnvCfg(env: ImportMetaEnv | typeof document.ENV): {
//   [k: string]: string | boolean | undefined
// } {
//   return mapKeys(
//     pickBy(env, (v, k) => k.startsWith('VITE_')),
//     (v, k) => k.replace(/^VITE_/, ''),
//   )
// }
