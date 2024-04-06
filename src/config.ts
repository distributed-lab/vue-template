import { LogLevelDesc } from 'loglevel'

import packageJson from '../package.json'

type Config = {
  API_URL: string
  APP_NAME: string
  LOG_LEVEL: LogLevelDesc
  BUILD_VERSION: string
}

export const config: Config = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  LOG_LEVEL: 'trace' as LogLevelDesc,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_BUILD_VERSION,
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
