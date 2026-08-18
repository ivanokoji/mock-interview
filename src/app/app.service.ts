import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({

  providedIn: 'root' //This service will be available throughout the application

})

export class AppService {

    private apiKey = 'X8BcKCsqxEhbq3ZVgsNbFiiPDdyQsOGH4p0FaMMW'; // Replace with your actual API key
    private apiUrl = 'https://api.api-ninjas.com/v1/imagetotext'; // Replace with your actual API URL

    constructor(private http: HttpClient) {}

    extractText(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', file);

        const headers = new HttpHeaders({
            'X-Api-Key': this.apiKey
        });

        return this.http.post(this.apiUrl, formData, { headers });
    }
}