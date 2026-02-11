import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaminationFinish, LaminationType } from '../models/lamination.model';

@Injectable({ providedIn: 'root' })
export class LaminationService {
    private baseUrl = 'http://localhost:5000/api/lamination';

    constructor(private http: HttpClient) {}

    getTypes(): Observable<LaminationType[]> {
        return this.http.get<LaminationType[]>(`${this.baseUrl}/types`);
    }

    getFinishes(): Observable<LaminationFinish[]> {
        return this.http.get<LaminationFinish[]>(`${this.baseUrl}/finishes`);
    }
}
