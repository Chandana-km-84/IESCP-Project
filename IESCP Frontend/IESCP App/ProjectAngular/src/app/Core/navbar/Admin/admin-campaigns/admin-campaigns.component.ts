import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-campaigns',
  templateUrl: './admin-campaigns.component.html',
  styleUrls: ['./admin-campaigns.component.css']
})
export class AdminCampaignsComponent implements OnInit {
  campaigns: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(!token){
      alert("Login to access the dashboard");
      this.router.navigateByUrl('login/adminLogin');
    }
    this.http.get<any[]>('https://localhost:44309/api/Admin/getAllCampaigns', { headers })
      .subscribe(data => {
        this.campaigns = data;
      });
  }

  flagCampaign(campaignId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put(`https://localhost:44309/api/Admin/flagCampaign/${campaignId}`, {}, { headers })
      .subscribe(() => {
        this.campaigns.find(campaign => campaign.campaignId === campaignId).isFlagged = true;
      });
  }

  unflagCampaign(campaignId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put(`https://localhost:44309/api/Admin/unflagCampaign/${campaignId}`, {}, { headers })
      .subscribe(() => {
        this.campaigns.find(campaign => campaign.campaignId === campaignId).isFlagged = false;
      });
  }

}
