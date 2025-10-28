import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-profile',
  templateUrl: './sponsor-profile.component.html',
  styleUrls: ['./sponsor-profile.component.css']
})

export class SponsorProfileComponent implements OnInit {
  profile: any = {};
  editProfile: any = {};
  isEditModalOpen: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    if(!token){
      alert("Login to access the dashboard");
      this.router.navigateByUrl('login/sponsorLogin');
    }
    
    this.http.get<{success: boolean; sponsor?: any[]; message?: string}>('https://localhost:44309/api/Sponsor/ViewProfile', {headers})
    .subscribe(
      data => {
        if (data.success){
          this.profile = data.sponsor || [];
          console.log(this.profile);
        }else{
          console.error('Error fetching the data', data.message );
          alert(data.message);
        }
        
      },
      error => {
        console.error('Error fetching the profile', error);
      }
    );
  }

  openEditModal(): void {
    this.editProfile = { ...this.profile }; 
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  onSubmit(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this.http.put<{success: boolean; editProfile?: any[]; message?: string}>('https://localhost:44309/api/Sponsor/EditProfile', this.editProfile, {headers})

      .subscribe(
        data => {
          if (data.success){
            this.editProfile = { ...this.editProfile } || [];            
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