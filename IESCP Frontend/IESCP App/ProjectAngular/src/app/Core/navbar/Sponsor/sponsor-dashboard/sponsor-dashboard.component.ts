import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SponsorService } from 'src/app/Services/sponsor.service';

@Component({
  selector: 'app-sponsor-dashboard',
  templateUrl: './sponsor-dashboard.component.html',
  styleUrls: ['./sponsor-dashboard.component.css']
})
export class SponsorDashboardComponent implements OnInit {
  sponsorName: string = 'Acme Corp';
  activeCampaignsCount: number = 3;
  budgetSpent: number = 50000;
  influencersEngagedCount: number = 10;
  recentCampaigns = [
    { title: 'Holiday Sale', description: 'Promoting holiday discounts.', status: 'Active' },
    { title: 'New Product Launch', description: 'Launching new product line.', status: 'Completed' },
    { title: 'Brand Awareness', description: 'Increasing brand visibility.', status: 'Pending' }
  ];
  
  constructor(private sponsorService: SponsorService, private router: Router) { }

  ngOnInit(): void {
    const tok = localStorage.getItem('sponsToken');
    if(tok){
      // alert("login successfull!");
    }
    else{
      alert("Please Log-in First");
        this.router.navigateByUrl('/login/sponsorLogin');
    }
  }
}
