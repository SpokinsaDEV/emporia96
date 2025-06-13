import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ParametrizacionService {
    private url = 'https://localhost:7141/api';

    constructor(private http: HttpClient){}

    getAll(endpoint: string): Observable<any> {
        return this.http.get<any>(`${this.url}${endpoint}`);
    }

    create(createpoint: string, data: any): Observable<any> {
        return this.http.post<any>(`${this.url}${createpoint}`, data);
    }

    read(readpoint: string): Observable<any> {
        return this.http.get<any>(`${this.url}${readpoint}`);
    }

    update(updatepoint: string, data: any, id: number): Observable<any> {
        let params = new HttpParams().set('id', id);
        return this.http.put<any>(`${this.url}${updatepoint}`, data, {
            params
        });
    }

    delete(deletepoint: string, id: number): Observable<any> {
        let params = new HttpParams().set('id', id);
        return this.http.delete<any>(`${this.url}${deletepoint}`, {
            params
        });
    }
}
