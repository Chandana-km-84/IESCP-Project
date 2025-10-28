import { Injectable } from '@angular/core';
import { sponsorLoginModel, sponsorLoginResponse, sponsorSignupModel } from '../Models/sponsor-login.model';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  private loginUrl = 'https://localhost:44309/api/Sponsor/Login';
  private signupUrl = 'https://localhost:44309/api/Sponsor/Register';

  constructor(private http: HttpClient) { }
 
  sponsorLogin(loginData: sponsorLoginModel): Observable<sponsorLoginResponse> {
    return this.http.post<sponsorLoginResponse>(this.loginUrl, loginData)
    .pipe(
      tap(response =>{
        if(response && response.token){
          localStorage.setItem('sponsToken', response.token);
        }
        else{
          console.log("sponsor token not found!")
        }
      })
    );;
  }

  sponsorSignup(model: sponsorSignupModel): Observable<string> {
    return this.http.post(this.signupUrl, model, { responseType: 'text' });
  }

}




