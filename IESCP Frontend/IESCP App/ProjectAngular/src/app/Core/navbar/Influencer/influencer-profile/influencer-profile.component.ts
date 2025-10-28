import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-influencer-profile',
  templateUrl: './influencer-profile.component.html',
  styleUrls: ['./influencer-profile.component.css']
})
export class InfluencerProfileComponent implements OnInit {
  profile: any = {};
  editProfile: any = {};
  isEditModalOpen: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('infToken');
    if(!token){
      alert('Please login first');
      this.router.navigateByUrl('/login/influencerLogin');
    }
    this.fetchProfile();
  }

  fetchProfile(): void {
    const token = localStorage.getItem("infToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this.http.get<{success: boolean; influencer?: any[]; message?: string}>('https://localhost:44309/api/Influencer/ViewProfile', { headers })
      .subscribe(
        data => {
          console.log(data);
          if (data.success){
            this.profile = data.influencer || [];
            console.log(this.profile);
          }else{
            console.error('Error fetching the data', data.message );
            alert(data.message);
          }
        },
        error => {
          console.error('Error fetching the profile', error);
        });
  }

  openEditModal(): void {
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  onEditSubmit(): void {
    const token = localStorage.getItem("infToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this.http.put<{success: boolean; editProfile?: any[]; message?: string}>('https://localhost:44309/api/Influencer/EditProfile', this.editProfile, { headers })
      .subscribe(
        data => {
          if (data.success){
            this.editProfile = data.editProfile || [];
            console.log(this.editProfile);
            this.closeEditModal();
            location.reload();
          }else{
            console.error('Error fetching the data', data.message );
            alert(data.message);
          }
        },
        error => {
          console.error('Error fetching the editProfile', error);
        });

  }
}