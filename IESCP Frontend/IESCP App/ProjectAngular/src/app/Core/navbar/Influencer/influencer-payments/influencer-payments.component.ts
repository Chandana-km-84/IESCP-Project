import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-influencer-payments',
  templateUrl: './influencer-payments.component.html',
  styleUrls: ['./influencer-payments.component.css']
})
export class InfluencerPaymentsComponent {
  payments: any[] = [{}];

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('infToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(!token){
      alert("Please log-in first");
      this.router.navigateByUrl('/login/influencerLogin');
    }
    this.http.get<{success: boolean; payments?: any[]; message?: string}>('https://localhost:44309/api/Influencer/getAllPayments', { headers })
      .subscribe(
        data => {
        console.log(data);
        if (data.success){
          this.payments = data.payments || [];
          console.log(this.payments);
        }else{
          console.error('Error fetching the data', data.message );
          alert(data.message);
        }
      },
      error => {
        
        console.error('Error fetching the payment', error);
      });
  }
}
