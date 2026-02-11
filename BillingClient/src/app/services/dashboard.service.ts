import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    private apiUrl = 'http://localhost:5000/api/dashboard';

    constructor(private http: HttpClient) {}

    getSummary() {
        return this.http.get<any>(`${this.apiUrl}/summary`);
    }
}
