import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PedidosService {
    private url = 'https://localhost:7141/api';

    constructor(private http: HttpClient){}

    getall(){

    }
}
