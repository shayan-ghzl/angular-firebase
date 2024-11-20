import { Component, inject } from '@angular/core';
import { Database, equalTo, get, listVal, objectVal, orderByChild, query, ref } from '@angular/fire/database';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    private database = inject(Database);
    // private databaseInstances = inject(DatabaseInstances);
    // private firebaseApp = inject(FirebaseApp);

    formGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        family: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        // console.log(this.database.app === this.firebaseApp);
        // this.databaseInstances.forEach(database => {
        //   console.log(database.app === this.firebaseApp);
        //   debugger;
        // });

        // --------------------------------------------
        const myRootDataRef = ref(this.database, '/');
        const myCoursesDataRef = ref(this.database, '/courses');
        const myFriendsDataRef = ref(this.database, '/friends');
        // --------------------------------------------
        get(myFriendsDataRef).then(snapshot => {
            const result = snapshot.val();

            console.log('Fetched data:', result);
            console.log('Fetched data:', Object.values(result));
            debugger;
        });
        // --------------------------------------------
        // To fetch specific data, you can use query constraints (e.g., sorting, filtering).

        // important:
        // Firebase Realtime Database uses indexing to optimize query performance.
        // Without it, Firebase cannot perform efficient lookups for fields like family, resulting in the error.;
        // {
        //     "rules": {
        //         ".read": "now < 1734640200000",  // 2024-12-20
        //         ".write": "now < 1734640200000",  // 2024-12-20
        //         "friends": {
        //             ".indexOn": ["family"];   // Add the "family" index
        //         }
        //     }
        // }

        const ghazaliQuery = query(myFriendsDataRef, orderByChild('family'), equalTo('ghazali'));
        get(ghazaliQuery).then(snapshot => {
            const result = snapshot.val();

            console.log('Fetched data:', result);
            debugger;
        });

        // it is real time changes
        // it will emit a list
        (listVal(ghazaliQuery) as Observable<any[]>).subscribe(response => {
            debugger;
        });
        // --------------------------------------------
        // it is real time changes
        // it will emit an object
        (objectVal(myCoursesDataRef) as Observable<any[]>).subscribe(response => {
            debugger;
        });
    }

    addFriend(): void {

    }
}