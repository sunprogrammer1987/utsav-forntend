import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkModeKey = 'darkMode';

  constructor() {
    this.initializeTheme();
  }

  /** Initialize theme: localStorage > system preference > default light */
  initializeTheme() {
    const stored = localStorage.getItem(this.darkModeKey);

    if (stored === 'true') {
      this.enableDark();
    } else if (stored === 'false') {
      this.disableDark();
    } else {
      // Detect system preference on first visit
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) this.enableDark();
      else this.disableDark();
    }

    // Optional: react to system theme change dynamically
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const isDark = e.matches;
      const hasManualSetting = localStorage.getItem(this.darkModeKey) !== null;
      // only auto-change if user hasn't manually toggled before
      if (!hasManualSetting) {
        isDark ? this.enableDark() : this.disableDark();
      }
    });
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem(this.darkModeKey, isDark.toString());
  }

  enableDark() {
    document.documentElement.classList.add('dark');
    localStorage.setItem(this.darkModeKey, 'true');
  }

  disableDark() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem(this.darkModeKey, 'false');
  }
}
