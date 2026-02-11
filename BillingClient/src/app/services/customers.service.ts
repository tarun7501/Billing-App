import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBillPayload } from '../models/bill.model';
import { Observable } from 'rxjs';

interface CustomerBillResponse {
    customer: any;
    bills: any[];
}

@Injectable({ providedIn: 'root' })
export class CustomersService {
    private readonly baseUrl = 'http://localhost:5000/api/customers';

    constructor(private http: HttpClient) {}

    getCustomerSummary(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/summary`);
    }

    getCustomerBills(id: string): Observable<CustomerBillResponse> {
        return this.http.get<CustomerBillResponse>(`${this.baseUrl}/${id}/bills`);
    }
}
