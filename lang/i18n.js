import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translate/en.json';
import ar from './translate/ar.json';
import ku from './translate/ku.json';
import AsyncStorage from '../storage/AsyncStorage';
AsyncStorage.GetFromStorage('language').then(res => {
    i18n.use(initReactI18next).init({
        lng: res !== null ? res : 'en',
        fallbackLng: 'en',
        compatibilityJSON: 'v3',
        resources: {
            en: en,
            ar: ar,
            ku: ku
        },
        interpolation: {
            escapeValue: false,

        }
    });
}
)
export default i18n;