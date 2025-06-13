import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class IdleService {
    private timeOutId: any;
    private readonly timeout = 10 * 60 * 1000; //10 minutos

    constructor(private router: Router, private ngZone: NgZone, private authService: AuthService){
        if (this.authService.isLoggedIn()) {
            this.setupListeners();
        }
    }

    setupListeners() {
        this.ngZone.runOutsideAngular(() => {
            ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event => {
                window.addEventListener(event, () => this.resetTimer());
            });
        });
        this.startTimer();
    }

    startTimer() {
        this.timeOutId = setTimeout(() => this.logout(), this.timeout);
    }

    resetTimer() {
        clearTimeout(this.timeOutId);
        this.startTimer();
    }

    logout() {
        this.ngZone.run(() => {
            // Invocar servicio de autenticación para logout
            this.authService.logout();
            alert('Sesión cerrada por inactividad');
        });
    }
}
