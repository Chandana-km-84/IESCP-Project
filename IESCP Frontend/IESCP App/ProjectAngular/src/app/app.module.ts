import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../app/Core/navbar/navbar.component';
import { InfluencerLoginComponent } from './login/influencer/influencer-login/influencer-login.component';
import { SponsorLoginComponent } from './login/sponsor/sponsor-login/sponsor-login.component';
// import { AdminLoginComponent } from './login/Admin/admin-login/admin-login.component';
import { HomeComponent } from './Core/HomePage/home/home.component';
import { AdminNavbarComponent } from './Core/navbar/Admin/admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './Core/navbar/Admin/admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfluencerDashboardComponent } from './Core/navbar/Influencer/influencer-dashboard/influencer-dashboard.component';
import { AdminLoginComponent } from './login/Admin/admin-login/admin-login.component';
import { SponsorDashboardComponent } from './Core/navbar/Sponsor/sponsor-dashboard/sponsor-dashboard.component';
import { InfluencerNavbarComponent } from './Core/navbar/Influencer/influencer-navbar/influencer-navbar.component';
import { SponsorNavbarComponent } from './Core/navbar/Sponsor/sponsor-navbar/sponsor-navbar.component';
import { InfluencerAdrequestComponent } from './Core/navbar/Influencer/influencer-adrequest/influencer-adrequest.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SponsorCampaignsComponent } from './Core/navbar/Sponsor/sponsor-campaigns/sponsor-campaigns.component';
import { SponsorRootComponent } from './Core/navbar/Sponsor/sponsor-root/sponsor-root.component';
import { SponsorProfileComponent } from './Core/navbar/Sponsor/sponsor-profile/sponsor-profile.component';
import { SponsorAdrequestComponent } from './Core/navbar/Sponsor/sponsor-adrequest/sponsor-adrequest.component';
import { SponsorInfluencersComponent } from './Core/navbar/Sponsor/sponsor-influencers/sponsor-influencers.component';
import { SponsorAllAdrequestComponent } from './Core/navbar/Sponsor/sponsor-all-adrequest/sponsor-all-adrequest.component';
import { InfluencerRootComponent } from './Core/navbar/Influencer/influencer-root/influencer-root.component';
import { InfluencerProfileComponent } from './Core/navbar/Influencer/influencer-profile/influencer-profile.component';
import { InfluencerCampaignsComponent } from './Core/navbar/Influencer/influencer-campaigns/influencer-campaigns.component';
import { InfluencerUpdateRequestComponent } from './Core/navbar/Influencer/influencer-update-request/influencer-update-request.component';
import { InfluencerPaymentsComponent } from './Core/navbar/Influencer/influencer-payments/influencer-payments.component';
import { InfluencerRatingsComponent } from './Core/navbar/Influencer/influencer-ratings/influencer-ratings.component';
import { AdminHomeComponent } from './Core/navbar/Admin/admin-home/admin-home.component';
import { AdminUsersComponent } from './Core/navbar/Admin/admin-users/admin-users.component';
import { AdminCampaignsComponent } from './Core/navbar/Admin/admin-campaigns/admin-campaigns.component';
import { AdminAdrequestsComponent } from './Core/navbar/Admin/admin-adrequests/admin-adrequests.component';
import { AdminRequestsComponent } from './Core/navbar/Admin/admin-requests/admin-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InfluencerLoginComponent,
    SponsorLoginComponent,
    InfluencerNavbarComponent,
    HomeComponent,
    AdminNavbarComponent,
    AdminDashboardComponent,
    InfluencerDashboardComponent,
    AdminLoginComponent,
    SponsorDashboardComponent,
    SponsorNavbarComponent,
    InfluencerAdrequestComponent,
    SponsorCampaignsComponent,
    SponsorRootComponent,
    SponsorProfileComponent,
    SponsorAdrequestComponent,
    SponsorInfluencersComponent,
    SponsorAllAdrequestComponent,
    InfluencerRootComponent,
    InfluencerProfileComponent,
    InfluencerCampaignsComponent,
    InfluencerUpdateRequestComponent,
    InfluencerPaymentsComponent,
    InfluencerRatingsComponent,
    AdminHomeComponent,
    AdminUsersComponent,
    AdminCampaignsComponent,
    AdminAdrequestsComponent,
    AdminRequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
