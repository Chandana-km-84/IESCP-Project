import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-influencer-adrequest',
  templateUrl: './influencer-adrequest.component.html',
  styleUrls: ['./influencer-adrequest.component.css']
})
export class InfluencerAdrequestComponent implements OnInit {

  adRequests: any[] = [];
  campaignId!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    const token = localStorage.getItem('infToken');
    if (token) {
      this.route.paramMap.subscribe(params => {
        this.campaignId = +params.get('campaignId')!;
        console.log('Campaign ID:', this.campaignId); 
        this.loadAdRequests();
      });
    }
    else {
      alert("Login to access the dashboard");
      this.router.navigateByUrl('login/influencerLogin');
      console.error('No token found in localStorage');
    }
  }

  loadAdRequests(): void {
    const token = localStorage.getItem('infToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<{success: boolean; adRequests?: any[]; message?: string}>(`https://localhost:44309/api/Influencer/getAdRequestByCampaignId/${this.campaignId}`, { headers })
      .subscribe(
        data => {
          if (data.success){
            this.adRequests = data.adRequests || [];
            console.log(this.adRequests);
          }else{
            console.error('Error fetching the data', data.message );
            alert(data.message);
          }
        },
        error => {
          console.error('Error fetching the adrequests', error);
        });
  }

  accept(adId: number): void {
    const token = localStorage.getItem('infToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const status = "Accepted";
    this.http.put(`https://localhost:44309/api/Influencer/updateStatus/${adId}?status=${status}`, null, { headers }).subscribe(
        (response: any) => {
            if (response.success) {
                console.log(`Ad request ${adId} accepted`);
                this.updateAdRequestStatus(adId, status);
            } else {
                console.error(`Error accepting ad request ${adId}: ${response.message}`);
            }
        },
        (error) => {
            console.error(`Error accepting ad request ${adId}:`, error);
        }
    );
}

reject(adId: number): void {
    const token = localStorage.getItem('infToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const status = "Rejected";
    this.http.put(`https://localhost:44309/api/Influencer/updateStatus/${adId}?status=${status}`, null, { headers }).subscribe(
        (response: any) => {
            if (response.success) {
                console.log(`Ad request ${adId} rejected`);
                this.updateAdRequestStatus(adId, status);
            } else {
                console.error(`Error rejecting ad request ${adId}: ${response.message}`);
            }
        },
        (error) => {
            console.error(`Error rejecting ad request ${adId}:`, error);
        }
    );
}

updateAdRequestStatus(adId: number, status: string): void {
    const adRequest = this.adRequests.find(ad => ad.adId === adId);
    if (adRequest) {
        adRequest.status = status;
    }
}

}