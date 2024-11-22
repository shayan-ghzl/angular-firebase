import { Component, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    // also named as db
    private angularFireDatabase = inject(AngularFireDatabase);

    formGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        family: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        // // listen for changes
        // // it returns an array
        // this.angularFireDatabase.list('/friends').valueChanges().subscribe(response => {
        //     debugger;
        // });
        // // listen for changes
        // // it returns an object
        // this.angularFireDatabase.object('/friends').valueChanges().subscribe(response => {
        //     debugger;
        // });
        // // listen for changes
        // // it returns an object
        // this.angularFireDatabase.object('/friends').snapshotChanges().subscribe(response => {
        //     console.log(response.payload.val());

        //     debugger;
        // });

        // it will logs all changes
        this.angularFireDatabase.list('/friends').auditTrail().subscribe(trail => {
            console.log(trail);
            debugger;
        });

        this.angularFireDatabase.list('/friends', ref => ref.orderByChild('family').equalTo('ghazali')).valueChanges().subscribe(response => {
            debugger;
        });

        const ref = this.angularFireDatabase.database.ref('friends');
        ref.once('value').then(snapshot => {
            console.log(snapshot.val());
            debugger
        });

        // generates a new random id
        console.log(this.angularFireDatabase.createPushId());

    }

    addFriend(): void {

    }
}