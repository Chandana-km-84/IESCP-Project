

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sponsorLoginModel, sponsorSignupModel } from 'src/app/Models/sponsor-login.model';
import { SponsorService } from 'src/app/Services/sponsor.service';

@Component({
  selector: 'app-sponsor-login',
  templateUrl: './sponsor-login.component.html',
  styleUrls: ['./sponsor-login.component.css']
})
export class SponsorLoginComponent {
  login: sponsorLoginModel = {
    userName: '',
    password: ''
  };
  
  signup: sponsorSignupModel = {
    userName: '',
    password: '',
    email: '',
    phoneNumber: '',
    sponsorName: '',
    industry: '',
    company: ''
  };

  isLoginActive: boolean = true;

  constructor(private service: SponsorService, private router: Router) {}

  toggleForms() {
    this.isLoginActive = !this.isLoginActive;
  }

  Homepage()
  {
    alert("Welcome Back")
    this.router.navigateByUrl('/');
  }

  onLoginSubmit() {
    console.log(this.login);
    this.service.sponsorLogin(this.login)
      .subscribe({
        next: (response) => {
          if (response.success){
          alert("login success");
          this.router.navigateByUrl('/sponsor/home');
        }
        else{
          alert(response.message);
        }
      }
      });
  }

  onSignupSubmit() {
    console.log(this.signup);
    this.service.sponsorSignup(this.signup)
      .subscribe({
        next: (response) => {
          alert("Account created");
          this.router.navigateByUrl('/login/sponsorLogin');
        }
      });
  }
}