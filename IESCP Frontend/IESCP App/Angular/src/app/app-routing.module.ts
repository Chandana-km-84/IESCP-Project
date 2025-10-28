import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfluencerLoginComponent } from './influencer-login/influencer-login.component';

const routes: Routes = [
  { path: 'login', component: InfluencerLoginComponent },
  // { path: 'dashboard', component: DashboardComponent }, // Assuming you have a DashboardComponent
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
