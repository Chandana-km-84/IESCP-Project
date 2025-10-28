import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent {
  unapprovedSponsors: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if(!token){
      alert("Login to access the dashboard");
      this.router.navigateByUrl('login/adminLogin');
    }
    
    this.http.get<any[]>('https://localhost:44309/api/Admin/getUnapprovedSponsors', { headers })
      .subscribe(data => {
        this.unapprovedSponsors = data;
      });
  }

  approveSponsor(sponsorId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put(`https://localhost:44309/api/Admin/approveSponsor/${sponsorId}`, {}, { headers })
      .subscribe(() => {
        this.unapprovedSponsors = this.unapprovedSponsors.filter(sponsor => sponsor.userId !== sponsorId);
      });
  }
}
