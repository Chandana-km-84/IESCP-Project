import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfluencerService } from '../services/influencer.service';


@Component({
  selector: 'app-influencer-login',
  templateUrl: './influencer-login.component.html',
  styleUrls: ['./influencer-login.component.css']
})
export class InfluencerLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  MyserviceService: any;
  
  constructor(
    private fb: FormBuilder,
    private influencerService: InfluencerService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.influencerService.login(this.loginForm.value).subscribe(
        response => {
          // this.router.navigate(['/dashboard']);
        },
        error => {
          this.errorMessage = 'Invalid username or password';
        }
      );
    }
  }

}
