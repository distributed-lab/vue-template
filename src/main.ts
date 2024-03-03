import '@/styles/app.scss'
import 'virtual:svg-icons-register'

import { config } from '@config'
import log from 'loglevel'
import { createApp, getCurrentInstance, h } from 'vue'
import { useI18n } from 'vue-i18n'
import VueToastificationPlugin from 'vue-toastification'

import App from '@/App.vue'
import { IconNames, RouteNames } from '@/enums'
import { i18n } from '@/localization'
import { router } from '@/router'
import { store } from '@/store'

const app = createApp({
  setup() {
    const app = getCurrentInstance()
    const { t, locale } = useI18n({ useScope: 'global' })
    if (app) {
      app.appContext.config.globalProperties.$t = t
      app.appContext.config.globalProperties.$locale = locale
    }
  },
  render: () => h(App),
})

const initApp = async () => {
  try {
    log.setDefaultLevel(config.LOG_LEVEL)

    app.use(router).use(store).use(i18n).use(VueToastificationPlugin, {
      shareAppContext: true,
    })

    app.config.globalProperties.$routes = RouteNames
    app.config.globalProperties.$config = config
    app.config.globalProperties.$icons = IconNames

    app.config.errorHandler = function (error, instance, info) {
      log.error(error)
      log.error(instance)
      log.error(info)
    }

    app.mount('#app')
  } catch (err) {
    log.error('Error while initializing app', err)
  }
}

initApp()
