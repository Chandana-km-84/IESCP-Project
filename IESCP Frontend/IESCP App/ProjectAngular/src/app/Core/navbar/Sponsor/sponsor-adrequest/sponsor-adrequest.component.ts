


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-adrequest',
  templateUrl: './sponsor-adrequest.component.html',
  styleUrls: ['./sponsor-adrequest.component.css']
})
export class SponsorAdrequestComponent implements OnInit {
  campaignId: number;
  adRequests: any[] = [];
  newAdRequest: any = {};
  editCampaign: any= {};
  selectedAdRequest: any = {};
  isAddAdRequestModalOpen: boolean = false;
  isEditAdRequestModalOpen: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.campaignId = +this.route.snapshot.paramMap.get('campaignId')!;
  }

  ngOnInit(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    if(!token){
      alert("Login to access the dashboard");
      this.router.navigateByUrl('login/sponsorLogin');
    }
    this.http.get<{success: boolean, adRequests?: any[], message?: string}>(`https://localhost:44309/api/Sponsor/GetAdRequestByCampaignId/${this.campaignId}`, { headers })
      .subscribe(response => {
        console.log(response);
        if(response.success){
          this.adRequests = response.adRequests || [];
          console.log(this.adRequests);
        }
        else{
          console.error(response.message);
        }
      });
  }

  openAddAdRequestModal(): void {
    this.newAdRequest = { campaignId: this.campaignId }; // Set the campaignId for the new ad request
    this.isAddAdRequestModalOpen = true;
  }

  closeAddAdRequestModal(): void {
    this.isAddAdRequestModalOpen = false;
  }

  onAdRequestSubmit(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this.http.post<{success: boolean; adRequests?: any[]; message?: string}>('https://localhost:44309/api/Sponsor/CreateAdRequest', this.newAdRequest, { headers })
      .subscribe(
        response => {
          if (response.success) {
            this.adRequests.push(this.newAdRequest); 
            this.closeAddAdRequestModal();
          } else {
            console.error(response.message); 
          }
        },
        error => {
          console.error('An error occurred:', error); 
        }
      );
}

  openEditAdRequestModal(adRequest: any): void {
    this.selectedAdRequest = { ...adRequest }; 
    this.isEditAdRequestModalOpen = true;
  }

  closeEditAdRequestModal(): void {
    this.isEditAdRequestModalOpen = false;
  }


  onEditAdRequestSubmit(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this.http.put<{success: boolean; message?: string}>(`https://localhost:44309/api/Sponsor/editAdRequest/${this.selectedAdRequest.adId}`, this.selectedAdRequest, { headers })
        .subscribe(response => {
          console.log(response);
            if (response.success) {
              const index = this.adRequests.findIndex(ad => ad.adId === this.selectedAdRequest.adId);
              if (index !== -1) {
                this.adRequests[index] = { ...this.selectedAdRequest }; 
              }
              console.log("Campaign updated successfully:", response.message);
              this.closeEditAdRequestModal();
            } else {
              console.error(`Campaign update failed: ${response.message}`);
            }
        });
  }
}