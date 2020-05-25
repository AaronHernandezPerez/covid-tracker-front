import Vue from 'vue'
import { Quasar } from 'quasar'
import i18nCountries from "i18n-iso-countries"
import vueNumeralFilterInstaller from 'vue-numeral-filter';

Vue.use(vueNumeralFilterInstaller, { locale: Vue.prototype.$parsedLocale });

Vue.filter('translateCountry2', function (value) {
  if (!value) return ''
  value = value.toString()

  let name;

  try {
    name = i18nCountries.getName(value, Quasar.lang.getLocale().slice(0, 2)).split(',').shift().split(' (').shift()
  } catch (error) {
  }

  return name
});

Vue.filter('formatNumberDot', function (value) {
  return parseInt(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('filterFunc', function (value, func) {
  return func(value);
});