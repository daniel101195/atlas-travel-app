import LocalizedStrings from "react-native-localization";
import english from './en';
import espana from './es';

export const LANGUAGE = {
  en: 'en',
  es: 'es'
} 

export const LocalizeString = new LocalizedStrings({
  "en": english,
  "es": espana,
});

export const onChangeLang = (lang) => {
  if (!lang || lang === getCurrentLang()) return
  LocalizeString.setLanguage(lang);
}

export const getCurrentLang = () => {
  return LocalizeString.getLanguage();
}