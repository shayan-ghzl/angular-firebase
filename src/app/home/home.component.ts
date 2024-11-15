import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FirestoreError } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService, Friend } from '../firestore.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  firestoreService = inject(FirestoreService);

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    family: new FormControl('', [Validators.required]),
  });

  friends$ = this.firestoreService.friends$;

  addFriend(): void {
    this.formGroup.disable();

    this.firestoreService.addFriend(this.formGroup.value as Friend).subscribe(response => {
      this.formGroup.reset();
      this.formGroup.enable();

      if (!(response instanceof FirestoreError)) {
        console.log('Success');
      } else {
        console.log('Failed');
      }
    });
  }

  removeFriend(id: string): void {
    if (confirm('Are You Sure?')) {
      this.firestoreService.removeFriend(id).subscribe(response => {
        if (!(response instanceof FirestoreError)) {
          console.log('Success');
        } else {
          console.log('Failed');
        }
      });
    }
  }
}