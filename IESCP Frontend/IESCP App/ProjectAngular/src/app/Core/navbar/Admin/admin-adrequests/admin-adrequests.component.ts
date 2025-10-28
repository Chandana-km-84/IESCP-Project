import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-adrequests',
  templateUrl: './admin-adrequests.component.html',
  styleUrls: ['./admin-adrequests.component.css']
})
export class AdminAdrequestsComponent {

  adRequests: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(!token){
      alert("Login to access the dashboard");
      this.router.navigateByUrl('login/adminLogin');
    }
    this.http.get<any[]>('https://localhost:44309/api/Admin/getAllAdRequests', { headers })
      .subscribe(data => {
        this.adRequests = data;
      });
  }

  flagAdRequest(adRequestId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put(`https://localhost:44309/api/Admin/flagAdRequest/${adRequestId}`, {}, { headers })
      .subscribe(() => {
        this.adRequests.find(adRequest => adRequest.adId === adRequestId).isFlagged = true;
      });
  }

  unflagAdRequest(adRequestId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put(`https://localhost:44309/api/Admin/unflagAdRequest/${adRequestId}`, {}, { headers })
      .subscribe(() => {
        this.adRequests.find(adRequest => adRequest.adId === adRequestId).isFlagged = false;
      });
  }
}
