import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  userName: string = '';
  password: string = '';
  phoneNumber: string = '';
  otp: string = '';
  token:string='';
 
  constructor(private http: HttpClient, private router: Router) {}

  showOtpForm(){
    const loginForm = document.getElementById('loginForm');
    const otpForm = document.getElementById('otpForm');
    const formIcon = document.getElementById('formIcon');
    const otpIcon = document.getElementById('otpIcon');

    if (loginForm && otpForm && formIcon && otpIcon) {
      loginForm.classList.add('slide-out');
      formIcon.classList.add('slide-out');
      setTimeout(() => {
        loginForm.style.display = 'none';
        formIcon.style.display = 'none';
        otpForm.style.display = 'block';
        otpIcon.style.display = 'block';
        otpForm.classList.add('slide-in');
        otpIcon.classList.add('slide-in');
      }, 500);
    }

    const loginData = {
      userName: this.userName,
      password: this.password,
      phoneNumber: this.phoneNumber
    };
    console.log(loginData);
    this.http.post('https://localhost:44309/api/Admin/login', loginData, {
      responseType: 'text',
      withCredentials: true
    }).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Login failed', error);
        alert('Login failed: ' + error.error);
      }
    );
  }


  onVerifyOtp() {
    alert("entered");
    this.http.post(`https://localhost:44309/api/Admin/verifyOtp?Otp=${this.otp}`, {}, {
      withCredentials: true
    }).subscribe(
      (response: any) => {
        alert('OTP verified successfully! Redirecting...');
        localStorage.setItem('adminToken', response.token);
        this.router.navigateByUrl('admin/home');
      },
      error => {
        console.error('OTP verification failed', error);
        alert('OTP verification failed: ' + (error.error || 'Unknown error'));
      }
    );
  }
}
