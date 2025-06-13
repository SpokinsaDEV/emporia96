import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly TOKEN_KEY = 'authToken';
    private readonly API_URL = 'https://localhost:7141/api/Auth';

    constructor(private http: HttpClient){}

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    login(credentials: { username: string; password: string, company: string }): Observable<any> {
        return this.http.post(`${this.API_URL}/login`, credentials, {
            responseType: 'json'
        }).pipe(
            tap((response: any) => {
                localStorage.setItem(this.TOKEN_KEY, response.token);
            })
        );
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        window.location.href = '/auth/login';
    }
}
