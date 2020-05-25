import Vue from 'vue';
import { Quasar } from 'quasar'

const languagesDict = {
  "ar": true,
  "bg": true,
  "ca": true,
  "cs": true,
  "da": true,
  "de": true,
  "el": true,
  "en-gb": true,
  "en-us": true,
  "eo": true,
  "es": true,
  "fa-ir": true,
  "fi": true,
  "fr": true,
  "gn": true,
  "he": true,
  "hr": true,
  "hu": true,
  "id": true,
  "indexon": true,
  "it": true,
  "ja": true,
  "km": true,
  "ko-kr": true,
  "lu": true,
  "lv": true,
  "ml": true,
  "ms": true,
  "nb-no": true,
  "nl": true,
  "pl": true,
  "pt-br": true,
  "pt": true,
  "ro": true,
  "ru": true,
  "sk": true,
  "sl": true,
  "sr": true,
  "sv": true,
  "ta": true,
  "th": true,
  "tr": true,
  "uk": true,
  "vi": true,
  "zh-hans": true,
  "zh-hant": true,
}


export default async () => {
  try {
    // quasar
    const language = getClosestTranslation();
    Vue.prototype.$supportedLanguages = ['en', 'es']
    Vue.prototype.$parsedLocale = language;
    Vue.prototype.$language = language.split('-').shift();

    await import(
      'quasar/lang/' + language
    )
      .then(lang => {
        Quasar.lang.set(lang.default)
      }).catch(error => {
        console.error('Cant find qLang for', language);
        Quasar.lang.set(import('quasar/lang/en-us').default)
      });
  }
  catch (err) {
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
  }
}

function getClosestTranslation() {
  let locale = Quasar.lang.getLocale();

  let translation = languagesDict[locale]
  if (!translation) {
    locale = locale.slice(0, 2);
  }

  return locale;
}