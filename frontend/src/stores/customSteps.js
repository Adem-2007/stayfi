import { writable, get } from 'svelte/store';

export const customSteps = writable([]);

export function loadCustomSteps() {
  try {
    const stored = localStorage.getItem('customSteps');
    if (stored) {
      customSteps.set(JSON.parse(stored));
    }
  } catch (error) {
    console.error('Failed to load custom steps:', error);
  }
}

export function saveCustomSteps() {
  try {
    const steps = get(customSteps);
    localStorage.setItem('customSteps', JSON.stringify(steps));
  } catch (error) {
    console.error('Failed to save custom steps:', error);
  }
}
