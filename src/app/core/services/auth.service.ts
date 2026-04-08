import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/auth';
    private userDisplayName = new BehaviorSubject<string>(localStorage.getItem('userName') || '');
    private tenant = new BehaviorSubject<string>(localStorage.getItem('tenant') || '');
    
    userName$ = this.userDisplayName.asObservable();
    tenant$ = this.tenant.asObservable();

    constructor(private http: HttpClient){}

    register(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }
    login(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, data).pipe(
            tap((resp: any) => {
                localStorage.setItem('access_token', resp.access_token);
            })
        );
    }
    setUserName(name: string, tenant: string) {
        localStorage.setItem('userName', name);
        localStorage.setItem('tenant', tenant);
        this.userDisplayName.next(name);
        this.tenant.next(tenant);
    }
}