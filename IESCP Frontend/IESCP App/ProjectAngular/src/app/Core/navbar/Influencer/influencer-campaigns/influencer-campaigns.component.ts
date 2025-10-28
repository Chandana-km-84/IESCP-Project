import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-influencer-campaigns',
  templateUrl: './influencer-campaigns.component.html',
  styleUrls: ['./influencer-campaigns.component.css']
})
export class InfluencerCampaignsComponent {

  campaigns: any[] = [{}];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('infToken');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<{success: boolean; campaigns?: any[]; message?: string}>('https://localhost:44309/api/Influencer/getAllCampaigns', { headers })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.campaigns = data.campaigns || [];
          console.log(this.campaigns);
        },
        (error) => {
          console.error('Error fetching campaigns:', error);
        }
      );
    } else {
      alert("Please log-in first");
      this.router.navigateByUrl('/login/influencerLogin');
      // console.error('No token found in localStorage');
    }
  }

  showAdRequests(campaignId: number): void {
    this.router.navigate(['/influencer/AdRequest', campaignId]);
  }

}
