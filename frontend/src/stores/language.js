import { writable } from 'svelte/store';

export const currentLanguage = writable('en');
export const translations = writable({});
// Create a writable store for the direction
export const direction = writable('ltr');

export async function loadTranslations(lang) {
  try {
    // The path should be relative to the public folder
    const response = await fetch(`/steps/${lang}.json`);
    const data = await response.json();
    translations.set(data);
    currentLanguage.set(lang);
    
    // Set direction based on language
    const newDir = lang === 'ar' ? 'rtl' : 'ltr';
    direction.set(newDir);
    
    // Update the root HTML element for global styling and accessibility
    document.documentElement.lang = lang;
    document.documentElement.dir = newDir;
    
    localStorage.setItem('preferredLanguage', lang);
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
}

// Initialize with saved language or default to French
const savedLang = localStorage.getItem('preferredLanguage') || 'fr';
loadTranslations(savedLang);