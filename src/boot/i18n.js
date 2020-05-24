import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import { Quasar } from 'quasar'

import i18nCountries from "i18n-iso-countries"


export default async ({ app, Vue }) => {
  // Countries i18n
  i18nCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  i18nCountries.registerLocale(require("i18n-iso-countries/langs/es.json"));

  // Moment
  moment.locale(Quasar.lang.getLocale())

  Vue.use(VueI18n)
  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: Quasar.lang.getLocale(),
    fallbackLocale: 'en-us',
    messages
  })
}