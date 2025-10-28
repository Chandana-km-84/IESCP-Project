import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-influencer-root',
  templateUrl: './influencer-root.component.html',
  styleUrls: ['./influencer-root.component.css']
})
export class InfluencerRootComponent {
  isInfluencerHome: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem("infToken");
    if(!token){
      alert("Login to access the dashboard");
      this.router.navigateByUrl('login/infLogin');
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isInfluencerHome = event.urlAfterRedirects === '/influencer/home';
      }
    });
  }
}
