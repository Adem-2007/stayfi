import { writable } from 'svelte/store';

export const currentDashboardLanguage = writable('en');
export const dashboardTranslations = writable({});
export const dashboardDirection = writable('ltr');

export async function loadDashboardTranslations(lang) {
  try {
    const response = await fetch(`/dashboard/${lang}.json`);
    const data = await response.json();
    dashboardTranslations.set(data);
    currentDashboardLanguage.set(lang);
    
    const newDir = lang === 'ar' ? 'rtl' : 'ltr';
    dashboardDirection.set(newDir);
    
    localStorage.setItem('dashboardLanguage', lang);
  } catch (error) {
    console.error('Failed to load dashboard translations:', error);
  }
}

const savedLang = localStorage.getItem('dashboardLanguage') || 'en';
loadDashboardTranslations(savedLang);
