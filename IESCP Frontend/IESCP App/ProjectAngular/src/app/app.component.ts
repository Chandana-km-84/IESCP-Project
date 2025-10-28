import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectAngular';
  isHome: boolean = false;
  isLogin: boolean = false;
  isInfluencer: boolean = false;
  isSponsor: boolean = false;
  isAdmin: boolean = false;
  isInfluencerHome: boolean = false;
  isSponsorHome: boolean = false;
  isAdminHome: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.router.url === '/';
        this.isLogin = this.router.url.startsWith('/login');
        this.isInfluencer = this.router.url.startsWith('/login/influencerLogin');
        this.isInfluencerHome = this.router.url.startsWith('/influencer');
        this.isSponsor = this.router.url.startsWith('/login/sponsor');
        this.isSponsorHome = this.router.url.startsWith('/sponsor');
        this.isAdmin = this.router.url.startsWith('/login/admin');
        this.isAdminHome = this.router.url.startsWith('/admin');
      }
    });
  }
}
