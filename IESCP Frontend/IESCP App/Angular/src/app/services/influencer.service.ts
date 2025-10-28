import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfluencerService {

  private apiUrl = 'https://your-api-url/api/influencer';

  constructor(private http: HttpClient) {}
 
  login(credentials: { userName: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
}
}
