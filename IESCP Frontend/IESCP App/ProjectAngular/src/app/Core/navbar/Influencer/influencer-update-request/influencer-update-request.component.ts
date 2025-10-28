import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-influencer-update-request',
  templateUrl: './influencer-update-request.component.html',
  styleUrls: ['./influencer-update-request.component.css']
})
export class InfluencerUpdateRequestComponent implements OnInit {

  adRequests: any[] = [{}];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('infToken');
    if (token) {
    this.loadPendingAdRequests();
    }
    else {
      alert("Please log-in first");
      this.router.navigateByUrl('login/influencerLogin');
      console.error('No token found in localStorage');
    }
  }

  loadPendingAdRequests(): void {
      const token = localStorage.getItem('infToken');    
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<{success: boolean; pendingAdRequests?: any[]; message?: string}>('https://localhost:44309/api/Influencer/pending-adrequests', { headers })
      .subscribe(
        data => {
          console.log(data);
          if (data.success){
            this.adRequests = data.pendingAdRequests || [];
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
                location.reload();
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
                location.reload();
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
