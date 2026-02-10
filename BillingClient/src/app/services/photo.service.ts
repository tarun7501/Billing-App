import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotoServices, PhotoSize } from '../models/photos.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PhotoService {
    private baseUrl = 'http://localhost:5000/api/photo';

    constructor(private http: HttpClient) {}

    getPhotoServices(): Observable<PhotoServices[]> {
        return this.http.get<PhotoServices[]>(`${this.baseUrl}/services`);
    }

    getPhotoSizes(): Observable<PhotoSize[]> {
        return this.http.get<PhotoSize[]>(`${this.baseUrl}/sizes`);
    }
}
