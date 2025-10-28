import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-influencer-navbar',
  templateUrl: './influencer-navbar.component.html',
  styleUrls: ['./influencer-navbar.component.css']
})
export class InfluencerNavbarComponent {

  constructor(private router: Router){}

  logout(){
    localStorage.removeItem('infToken');
    this.router.navigateByUrl('login/influencerLogin');
  }
}

