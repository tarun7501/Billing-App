import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBillPayload } from '../models/bill.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BillService {
    private readonly baseUrl = 'http://localhost:5000/api/bills'; // adjust if needed

    constructor(private http: HttpClient) {}

    createBill(payload: CreateBillPayload): Observable<number> {
        return this.http.post<number>(this.baseUrl, payload);
    }

    getBill(id: number) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
}
