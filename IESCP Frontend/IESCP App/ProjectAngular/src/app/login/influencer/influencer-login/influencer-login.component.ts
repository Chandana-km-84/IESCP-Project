import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfluencerLoginModel, InfluencerSignupModel } from 'src/app/Models/influencer-login.model';
import { InfluencerService } from 'src/app/Services/influencer.service';

@Component({
  selector: 'app-influencer-login',
  templateUrl: './influencer-login.component.html',
  styleUrls: ['./influencer-login.component.css']
})
export class InfluencerLoginComponent {
  login: InfluencerLoginModel = {
    userName: '',
    password: ''
  };

  signup: InfluencerSignupModel = {
    userName: '',
    password: '',
    email: '',
    phoneNumber: '',
    influencerName: '',
    category: '',
    niche: '',
    reach: ''
  };

  isLoginActive: boolean= true;



  constructor(private service: InfluencerService, private router: Router){ }

  toggleForms() {
    this.isLoginActive = !this.isLoginActive;
  }

  onLoginSubmit(){
    console.log(this.login);
    this.service.influencerLogin(this.login)
    .subscribe({
      next:(response) => {
        if (response.success){
          alert("Login success");
          this.router.navigateByUrl('/influencer/home');
        }
        else{
          alert(response.message);
        }
      }
    });
  }

  onSignupSubmit() {
    console.log(this.signup);
    this.service.influencerSignup(this.signup)
      .subscribe({
        next: (response) => {
          alert("Account created");
          this.router.navigateByUrl('/login/influencerLogin');
        }
      });
    }
  }
