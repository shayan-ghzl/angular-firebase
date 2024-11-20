import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

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
        
    }
    
    submit_register(): void {
        
    }
}