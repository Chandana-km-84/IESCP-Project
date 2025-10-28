

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-influencers',
  templateUrl: './sponsor-influencers.component.html',
  styleUrls: ['./sponsor-influencers.component.css']
})
export class SponsorInfluencersComponent implements OnInit {
  influencers: any[] = [];
  filteredInfluencers: any[] = [];
  adRequests: any[] = [];
  searchText: string = '';
  isAssignAdRequestModalOpen: boolean = false;
  selectedInfluencer: any = {};
  selectedAdRequestId: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem("sponsToken");
    if(!token){
      alert("Login to access the dashboard");
      this.router.navigateByUrl('login/sponsorLogin');
    }
    this.fetchInfluencers();
    this.fetchAdRequests();
  }

  fetchInfluencers(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this.http.get<{success: boolean; influencers?: any[]; message?: string}>('https://localhost:44309/api/Sponsor/getAllInfluencers', { headers })
      .subscribe(
        data => {
          console.log(data);
          if (data.success){
            this.influencers = data.influencers || [];
            this.filteredInfluencers = this.influencers; // To Ensure filteredInfluencers is updated
            console.log(this.influencers);
          } else {
            console.error('Error fetching the data', data.message );
            alert(data.message);
          }
        },
        error => {
          console.error('Error fetching the influencers', error);
        }
      );
  }

  fetchAdRequests(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this.http.get<{success: boolean, adRequests?: any[], message?: string}>('https://localhost:44309/api/Sponsor/GetAllAdRequest', { headers })
      .subscribe(data => {
        if(data.success){
          this.adRequests = data.adRequests || [];
        } else {
          console.error(data.message);
        }
      });
  }

  filterInfluencers(): void {
    this.filteredInfluencers = this.influencers.filter(influencer =>
      influencer.influencerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      influencer.category.toLowerCase().includes(this.searchText.toLowerCase()) ||
      influencer.niche.toLowerCase().includes(this.searchText.toLowerCase())
    );
    console.log(this.filteredInfluencers); 
  }

  openAssignAdRequestModal(influencer: any): void {
    this.selectedInfluencer = influencer;
    this.isAssignAdRequestModalOpen = true;
  }

  closeAssignAdRequestModal(): void {
    this.isAssignAdRequestModalOpen = false;
  }

  onAssignAdRequestSubmit(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const payload = {
      adRequestId: this.selectedAdRequestId,
      influencerId: this.selectedInfluencer.userId
    };
    this.http.post<{success: boolean; sponsor?: any[]; message?: string}>('https://localhost:44309/api/Sponsor/AssignAdRequestToInfluencer', payload, { headers })
      .subscribe(
        data => {
          console.log(data);
          if (data.success){
            this.adRequests = data.sponsor || [];
            this.closeAssignAdRequestModal();
            console.log(this.adRequests);
          } else {
            console.error('Error fetching the data', data.message );
            alert(data.message);
          }
        },
        error => {
          console.error('Error fetching the adRequests', error);
        }
      );
  }
}