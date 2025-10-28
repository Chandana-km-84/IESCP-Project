import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfluencerService } from 'src/app/Services/influencer.service';

@Component({
  selector: 'app-influencer-dashboard',
  templateUrl: './influencer-dashboard.component.html',
  styleUrls: ['./influencer-dashboard.component.css']
})

export class InfluencerDashboardComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
    const token = localStorage.getItem('infToken');
    if(!token){
      alert('Please login first');
      this.router.navigateByUrl('/login/influencerLogin');
    }
  }
}



