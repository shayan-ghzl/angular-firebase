import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(my_config),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}