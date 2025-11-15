import { writable, get } from 'svelte/store';

// Create reactive stores for the current language, translations, and text direction
// The direction store is defined here, with 'ltr' as the default.
export const currentLanguage = writable('en');
export const translations = writable({});
export const direction = writable('ltr');

// A private store to hold all loaded translation data
const allTranslationsStore = writable({});

/**
 * Sets the application's current language and automatically handles the text direction.
 * @param {string} lang - The language code to activate (e.g., 'en', 'fr', 'ar').
 */
export function setLanguage(lang) {
  const allData = get(allTranslationsStore);
  const newTranslations = allData[lang];

  if (!newTranslations) {
    console.error(`Error: Translations for language "${lang}" could not be found.`);
    return;
  }

  try {
    // 1. Determine the correct text direction for the selected language
    const newDir = lang === 'ar' ? 'rtl' : 'ltr';

    // 2. Update the Svelte stores. Components subscribed to these will reactively update.
    translations.set(newTranslations);
    currentLanguage.set(lang);
    direction.set(newDir); // <-- The direction store is updated here
    
    // 3. Update the root <html> element for global CSS and accessibility.
    // This is crucial for Tailwind's RTL variants (e.g., text-start, end-0) to work correctly.
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = newDir; // <-- The global direction is set here
    }
    
    // 4. Save the user's preference for their next visit.
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('homePreferredLanguage', lang);
    }
  } catch (error) {
    console.error('Failed to apply language settings:', error);
  }
}

/**
 * Initializes the language system when the application starts.
 * @param {object} allTranslationsData - An object containing all imported translation JSONs.
 */
export function initializeHomeLanguage(allTranslationsData) {
  allTranslationsStore.set(allTranslationsData);

  const savedLang = typeof localStorage !== 'undefined'
    ? localStorage.getItem('homePreferredLanguage') || 'en'
    : 'en';

  // Set the initial language, which will also set the initial direction
  setLanguage(savedLang);
}