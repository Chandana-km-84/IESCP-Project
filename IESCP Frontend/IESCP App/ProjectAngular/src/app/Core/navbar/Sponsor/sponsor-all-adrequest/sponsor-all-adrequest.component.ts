import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-all-adrequest',
  templateUrl: './sponsor-all-adrequest.component.html',
  styleUrls: ['./sponsor-all-adrequest.component.css']
})
export class SponsorAllAdrequestComponent implements OnInit {
  adRequests: any[] = [];
  isRateModalOpen: boolean = false;
  isPayModalOpen: boolean = false;
  selectedAdRequest: any = {};
  ratingValue: number | null = null;
  comment: string = '';
  paymentAmount: number | null = null;
  paymentMethod: string = '';
  transactionId: string = '';
 
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem("sponsToken");
    if(!token){
      alert("Login to access the dashboard");
      this.router.navigateByUrl('login/sponsorLogin');
    }
    this.fetchAdRequests();
  }

  fetchAdRequests(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    this.http.get<{success: boolean; adRequests?: any[]; message?: string}>('https://localhost:44309/api/Sponsor/GetAllAdRequest', { headers })
  
      .subscribe(
        data => {
        console.log(data);
        if (data.success){
          this.adRequests = data.adRequests || [];
          console.log(this.adRequests);
        }else{
          console.error('Error fetching the data', data.message );
          alert(data.message);
        }
      },
      error => {
        console.error('Error fetching the adRequests', error);
      });
  }

  openRateModal(adRequest: any): void {
    this.selectedAdRequest = adRequest;
    this.isRateModalOpen = true;
  }

  closeRateModal(): void {
    this.isRateModalOpen = false;
  }

  onRateSubmit(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const payload = {
      adRequestId: this.selectedAdRequest.adId,
      ratingValue: this.ratingValue,
      comment: this.comment
    };
    this.http.post('https://localhost:44309/api/Sponsor/RateInfluencerForAdRequest', payload, { headers })
      .subscribe(response => {
        this.closeRateModal();
      });
  }

  openPayModal(adRequest: any): void {
    this.selectedAdRequest = adRequest;
    this.isPayModalOpen = true;
  }

  closePayModal(): void {
    this.isPayModalOpen = false;
  }

  onPaySubmit(): void {
    const token = localStorage.getItem("sponsToken");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const payload = {
        adRequestId: this.selectedAdRequest.adId,
        amount: this.paymentAmount,
        paymentMethod: this.paymentMethod,
        paymentDate: new Date().toISOString(),
        transactionId: this.transactionId
    };
    this.http.post<{success: boolean; sponsor?: any[]; message?: string}>('https://localhost:44309/api/Sponsor/MakePaymentForAdRequest', payload, { headers })
        .subscribe(
            response => 
              {
            if (response.success) {
                console.log("Payment made successfully:", response.message);
                this.closePayModal();
            } else {
                console.error(`Payment failed: ${response.message}`);
            }
        });
        
        
}
}

