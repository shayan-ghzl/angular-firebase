import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    // needed in any firebase application
    provideFirebaseApp(() => initializeApp({
      "projectId": "first-firebase-project-904e5",
      "appId": "1:940644286738:web:f3f5bcdf8594233a4e73cb",
      "storageBucket": "first-firebase-project-904e5.firebasestorage.app",
      "apiKey": "AIzaSyCXXI5cFlgj6vJWuze6zzP56qA7AIA2Qhc",
      "authDomain": "first-firebase-project-904e5.firebaseapp.com",
      "messagingSenderId": "940644286738"
    })),
  ]
};
