import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-root',
  templateUrl: './sponsor-root.component.html',
  styleUrls: ['./sponsor-root.component.css']
})
export class SponsorRootComponent implements OnInit {
  isSponsorHome: boolean = false;
  isSponsorCampaign: boolean = false;
  isSponsorProfile: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isSponsorHome = event.urlAfterRedirects === '/sponsor/home';
        this.isSponsorCampaign = event.urlAfterRedirects === '/sponsor/campaign';
        this.isSponsorProfile = event.urlAfterRedirects === '/sponsor/profile';
      }
    });
  }
}