import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-influencer-ratings',
  templateUrl: './influencer-ratings.component.html',
  styleUrls: ['./influencer-ratings.component.css']
})
export class InfluencerRatingsComponent {
  ratings: any[] = [{}];

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('infToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(!token){
      alert("Please log-in first");
      this.router.navigateByUrl('/login/influencerLogin');
    }

  
    this.http.get<{success: boolean; ratings?: any[]; message?: string}>('https://localhost:44309/api/Influencer/getAllRatings', { headers })
      .subscribe(
      data => {
        if (data.success){
          this.ratings = data.ratings || [];
          console.log(this.ratings);
        }else{
          console.error('Error fetching the data', data.message );
          alert(data.message);
        }
        
      },
      error => {
        console.error('Error fetching the rating', error);
      }
    );
  }
}
