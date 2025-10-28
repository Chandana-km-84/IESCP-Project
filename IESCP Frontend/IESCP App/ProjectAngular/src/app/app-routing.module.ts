import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../app/Core/navbar/navbar.component';
import { InfluencerDashboardComponent } from './Core/navbar/Influencer/influencer-dashboard/influencer-dashboard.component';
import { SponsorDashboardComponent } from './Core/navbar/Sponsor/sponsor-dashboard/sponsor-dashboard.component';
import { InfluencerAdrequestComponent } from './Core/navbar/Influencer/influencer-adrequest/influencer-adrequest.component';
import { HomeComponent } from './Core/HomePage/home/home.component';
import { SponsorCampaignsComponent } from './Core/navbar/Sponsor/sponsor-campaigns/sponsor-campaigns.component';
import { SponsorRootComponent } from './Core/navbar/Sponsor/sponsor-root/sponsor-root.component';
import { SponsorProfileComponent } from './Core/navbar/Sponsor/sponsor-profile/sponsor-profile.component';
import { SponsorAdrequestComponent } from './Core/navbar/Sponsor/sponsor-adrequest/sponsor-adrequest.component';
import { SponsorInfluencersComponent } from './Core/navbar/Sponsor/sponsor-influencers/sponsor-influencers.component';
import { SponsorAllAdrequestComponent } from './Core/navbar/Sponsor/sponsor-all-adrequest/sponsor-all-adrequest.component';
import { InfluencerProfileComponent } from './Core/navbar/Influencer/influencer-profile/influencer-profile.component';
import { InfluencerCampaignsComponent } from './Core/navbar/Influencer/influencer-campaigns/influencer-campaigns.component';
import { InfluencerUpdateRequestComponent } from './Core/navbar/Influencer/influencer-update-request/influencer-update-request.component';
import { InfluencerPaymentsComponent } from './Core/navbar/Influencer/influencer-payments/influencer-payments.component';
import { InfluencerRatingsComponent } from './Core/navbar/Influencer/influencer-ratings/influencer-ratings.component';
import { AdminDashboardComponent } from './Core/navbar/Admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './Core/navbar/Admin/admin-users/admin-users.component';
import { AdminCampaignsComponent } from './Core/navbar/Admin/admin-campaigns/admin-campaigns.component';
import { AdminAdrequestsComponent } from './Core/navbar/Admin/admin-adrequests/admin-adrequests.component';
import { AdminRequestsComponent } from './Core/navbar/Admin/admin-requests/admin-requests.component';

const routes: Routes = [
  {
    path: 'login/adminLogin',
    component: NavbarComponent
  },
  {
    path: 'login/influencerLogin',
    component: NavbarComponent
  },
  {
    path: 'login/sponsorLogin',
    component: NavbarComponent
  },
  {
    path: 'influencer/home',
    component: InfluencerDashboardComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'influencer/AdRequest/:campaignId', component: InfluencerAdrequestComponent },
  { path: 'sponsor/home', component: SponsorDashboardComponent },
  { path: 'sponsor/campaign', component: SponsorCampaignsComponent },
  { path: 'sponsor', component: SponsorRootComponent },
  { path: 'sponsor/profile', component: SponsorProfileComponent },
  { path: 'sponsor/adrequest/:campaignId', component: SponsorAdrequestComponent },
  { path: 'sponsor/influencers', component: SponsorInfluencersComponent },
  { path: 'sponsor/allAdrequest', component: SponsorAllAdrequestComponent },
  { path: 'influencer/profile', component: InfluencerProfileComponent },
  { path: 'influencer/campaign', component: InfluencerCampaignsComponent },
  { path: 'influencer/updateRequest', component: InfluencerUpdateRequestComponent },
  { path: 'influencer/myPayments', component: InfluencerPaymentsComponent },
  { path: 'influencer/myRatings', component: InfluencerRatingsComponent },
  { path: 'admin/home', component: AdminDashboardComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/campaigns', component: AdminCampaignsComponent },
  { path: 'admin/adrequests', component: AdminAdrequestsComponent },
  { path: 'admin/requests', component: AdminRequestsComponent }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
