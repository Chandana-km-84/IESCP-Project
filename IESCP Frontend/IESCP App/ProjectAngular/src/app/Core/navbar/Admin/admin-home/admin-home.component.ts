import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  totalUsers: number = 0;
  totalInfluencers: number = 0;
  totalSponsors: number = 0;
  totalCampaigns: number = 0;
  totalAdRequests: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(!token){
      alert("Login to access the dashboard");
      this.router.navigateByUrl('login/adminLogin');
    }
    this.http.get<any[]>('https://localhost:44309/api/Admin/getAllUsers', {headers}).subscribe(data => {
      this.totalUsers = data.length;
      this.totalInfluencers = data.filter(user => user.role === 1).length;
      this.totalSponsors = data.filter(user => user.role === 2).length;
    });

    this.http.get<any[]>('https://localhost:44309/api/Admin/getAllCampaigns', {headers}).subscribe(data => {
      this.totalCampaigns = data.length;
    });

    this.http.get<any[]>('https://localhost:44309/api/Admin/getAllAdRequests', {headers}).subscribe(data => {
      this.totalAdRequests = data.length;
    });
  }
}
