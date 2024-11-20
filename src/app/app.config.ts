import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { routes } from './app.routes';

const DATABASE_SHARD_URLS = [
  'https://ssrtest-cebd9.firebaseio.com',
  "https://ssrtest-logs.firebaseio.com/",
  "https://ssrtest-inits.firebaseio.com/",
];

// const appName = '[DEFAULT]';
const appName = 'APPLICATION_NAME';

const glo3d_config = {
  apiKey: "AIzaSyCRJJCgjBONQt9l7BnITY90FY1fb8N0-QU",
  authDomain: "ssrtest-cebd9.firebaseapp.com",
  databaseURL: "https://ssrtest-cebd9.firebaseio.com",
  projectId: "ssrtest-cebd9",
  storageBucket: "ssrtest-cebd9.appspot.com",
  messagingSenderId: "1059547878701",
  appId: "1:1059547878701:web:7ea4c2029a902c93f26fa4",
  measurementId: "G-47MBGH17R7"
};

const my_config = {
  projectId: "first-firebase-project-904e5",
  appId: "1:940644286738:web:f3f5bcdf8594233a4e73cb",
  storageBucket: "first-firebase-project-904e5.firebasestorage.app",
  apiKey: "AIzaSyCXXI5cFlgj6vJWuze6zzP56qA7AIA2Qhc",
  authDomain: "first-firebase-project-904e5.firebaseapp.com",
  messagingSenderId: "940644286738"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    // needed in any firebase application
    provideFirebaseApp(() => initializeApp(my_config, appName)),
    // needed when you need realtime databse
    // provideDatabase(() => getDatabase()),
    provideDatabase(() => getDatabase(getApp(appName))),
    // provideDatabase(injector => getDatabase(getApp(appName), DATABASE_SHARD_URLS[0])),
    // provideDatabase(injector => getDatabase(injector.get(FirebaseApp), DATABASE_SHARD_URLS[0])),
    // provideDatabase(injector => getDatabase(injector.get(FirebaseApp), DATABASE_SHARD_URLS[1])),
    // provideDatabase(injector => getDatabase(injector.get(FirebaseApp), DATABASE_SHARD_URLS[2])),
  ]
};