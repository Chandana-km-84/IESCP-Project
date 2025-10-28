import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfluencerLoginModel, InfluencerLoginResponse, InfluencerSignupModel, InfluencerSignupResponse } from '../Models/influencer-login.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InfluencerService {
  private loginUrl = 'https://localhost:44309/api/influencer/Login';
  private signupUrl = 'https://localhost:44309/api/influencer/Register';

  constructor(private http: HttpClient) { }

  

  influencerLogin(loginData: InfluencerLoginModel): Observable<InfluencerLoginResponse> {
    return this.http.post<InfluencerLoginResponse>(this.loginUrl, loginData)
    .pipe(
        tap(response => {
            if (response && response.success) {
                if (response.token) {
                    localStorage.setItem('infToken', response.token);
                    console.log("Login successful, token stored.");
                } else {
                    console.error("Token not found in response.");
                }
            } else {
                console.error(`Login failed: ${response.message}`);
            }
        })
    );
  }


influencerSignup(model: InfluencerSignupModel): Observable<InfluencerSignupResponse> {
  return this.http.post<InfluencerSignupResponse>(this.signupUrl, model)
  .pipe(
      tap(response => {
          if (response && response.success) {
              console.log("Signup successful:", response.message);
          } else {
              console.error(`Signup failed: ${response.message}`);
          }
      })
     
  );
}

}
