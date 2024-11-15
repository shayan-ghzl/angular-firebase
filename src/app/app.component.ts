import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FireauthService } from './fireauth.service';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        MatButtonModule,
        JsonPipe
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    fireauthService = inject(FireauthService);

    currentUser!: User | null;

    ngOnInit(): void {
        this.fireauthService.currentUser$.subscribe(response => {
            this.currentUser = response;
            console.log(response);
        });
    }

    logout(): void {
        this.fireauthService.logout();
    }
}