import { Component, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FireauthService, IUser } from '../fireauth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    fireauthService = inject(FireauthService);

    formGroup = new FormGroup({
        email: new FormControl('', { validators: [Validators.required], nonNullable: true }),
        password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    });

    formGroup_register = new FormGroup({
        email: new FormControl('', { validators: [Validators.required], nonNullable: true }),
        password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
        username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    });

    submit(): void {
        this.formGroup.disable();

        this.fireauthService.login(this.formGroup.value as IUser).subscribe(response => {
            this.formGroup.reset();
            this.formGroup.enable();
            
            if (!(response instanceof FirebaseError)) {
                console.log('Success');
                console.log(response.user);
            } else {
                console.log('Failed');
            }
        });
    }

    submit_register(): void {
        this.formGroup_register.disable();

        this.fireauthService.register(this.formGroup_register.value as IUser).subscribe(response => {
            this.formGroup_register.reset();
            this.formGroup_register.enable();

            if (!(response instanceof FirebaseError)) {
                console.log('Success');
            } else {
                if (response.code === 'auth/email-already-in-use') {
                    alert('email-already-in-use');
                } else if (response.code === 'auth/weak-password') {
                    alert('weak-password');
                }
                console.log('Failed');
            }
        });
    }
}