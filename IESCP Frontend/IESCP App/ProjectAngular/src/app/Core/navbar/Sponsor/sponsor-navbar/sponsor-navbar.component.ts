import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-navbar',
  templateUrl: './sponsor-navbar.component.html',
  styleUrls: ['./sponsor-navbar.component.css']
})
export class SponsorNavbarComponent {
  constructor(private http: HttpClient, private router: Router) {}

  editProfile() {
    this.http.put('https://localhost:44309/api/Influencer/EditProfile', {
      email: 'string',
      phoneNumber: 'string',
      influencerName: 'string',
      category: 'string',
      niche: 'string',
      reach: 0
    }).subscribe(
      response => {
        console.log('Success:', response);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  logout(){
    localStorage.removeItem('sponsToken');
    this.router.navigateByUrl('login/sponsorLogin');
  }
}
