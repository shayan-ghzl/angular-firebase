import { Component, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    private angularFireDatabase = inject(AngularFireDatabase);

    formGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        family: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        this.angularFireDatabase.list('/friends').valueChanges().subscribe(response => {
            debugger;
        });
    }

    addFriend(): void {

    }
}