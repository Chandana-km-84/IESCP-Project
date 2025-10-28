

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-campaigns',
  templateUrl: './sponsor-campaigns.component.html',
  styleUrls: ['./sponsor-campaigns.component.css']
})
export class SponsorCampaignsComponent implements OnInit {
  campaigns: any[] = [];
  newCampaign: any = {};
  editCampaign: any = {};
  isAddCampaignModalOpen: boolean = false;
  isEditCampaignModalOpen: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem("sponsToken");
    if (token) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this.http.get<{success: boolean; campaigns?: any[]; message?: string}>('https://localhost:44309/api/Sponsor/GetAllCampaign', { headers })
  
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
      console.error('No token found in localStorage');
    }
  }

  openAddCampaignModal(): void {
    this.newCampaign = {}; // Reset the new campaign form
    this.isAddCampaignModalOpen = true;
  }

  closeAddCampaignModal(): void {
    this.isAddCampaignModalOpen = false;
  }

  openEditCampaignModal(campaign: any): void {
    this.editCampaign = { ...campaign }; // Clone the campaign data
    this.isEditCampaignModalOpen = true;
  }

  closeEditCampaignModal(): void {
    this.isEditCampaignModalOpen = false;
  }


  onSubmit(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this.http.post<{success: boolean; campaigns?: any[]; message?: string}>('https://localhost:44309/api/Sponsor/CreateCampaign', this.newCampaign, { headers })
      .subscribe(
        response => {
          if (response.success) {
            this.campaigns.push(this.newCampaign); // Add the new campaign to the list
            this.closeAddCampaignModal();
          } else {
            console.error(response.message); // Handle error message
          }
        },
        error => {
          console.error('An error occurred:', error); // Handle HTTP error
        }
      );
}


  onEditSubmit(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this.http.put<{success: boolean; campaigns?: any[]; message?: string}>(`https://localhost:44309/api/Sponsor/EditCampaign/${this.editCampaign.campaignId}`, this.editCampaign, { headers })
        .subscribe(response => {
            if (response.success) {
                const index = this.campaigns.findIndex(c => c.campaignId === this.editCampaign.campaignId);
                if (index !== -1) {
                    this.campaigns[index] = { ...this.editCampaign }; // Update the campaign in the list
                }
                console.log("Campaign updated successfully:", response.message);
                this.closeEditCampaignModal();
            } else {
                console.error(`Campaign update failed: ${response.message}`);
            }
        });
  }

  navigateToAdRequests(campaignId: number): void {
    if (campaignId) {
        this.router.navigate([`/sponsor/adrequest/${campaignId}`]);
    } else {
        console.error('Invalid campaign ID');
    }
}
}