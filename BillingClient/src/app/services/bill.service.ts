import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBillPayload } from '../models/bill.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BillService {
    private readonly baseUrl = 'http://localhost:5000/api/bills';

    constructor(private http: HttpClient) {}

    createBill(payload: CreateBillPayload): Observable<number> {
        return this.http.post<number>(this.baseUrl, payload);
    }

    getBillById(id: string) {
        return this.http.get<any>(`${this.baseUrl}/${id}`);
    }

    markBillAsCleared(id: string) {
        return this.http.put<any>(`${this.baseUrl}/${id}/clear`, {});
    }

    getAllBills(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/all`);
    }
}
