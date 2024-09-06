import { SETTINGS } from '@/config/settings';

export const cLog = (...args) => {
  if (SETTINGS.DEBUG) {
    console.log(...args);
  }
};

export const cError = (...args) => {
  if (SETTINGS.DEBUG) {
    console.error(...args);
  }
};
