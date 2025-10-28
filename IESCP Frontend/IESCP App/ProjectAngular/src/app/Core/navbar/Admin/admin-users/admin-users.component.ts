import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if(!token){
      alert("Login to access the dashboard");
      this.router.navigateByUrl('login/adminLogin');
    }
    this.http.get<any[]>('https://localhost:44309/api/Admin/getAllUsers', { headers })
      .subscribe(data => {
        this.users = data;
      });
  }

  flagUser(userId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put(`https://localhost:44309/api/Admin/flagUser/${userId}`, {}, { headers })
      .subscribe(() => {
        this.users.find(user => user.userId === userId).isFlagged = true;
      });
  }

  unflagUser(userId: number): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put(`https://localhost:44309/api/Admin/unflagUser/${userId}`, {}, { headers })
      .subscribe(() => {
        this.users.find(user => user.userId === userId).isFlagged = false;
      });
  }
}
