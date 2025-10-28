import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfluencerLoginComponent } from './influencer-login/influencer-login.component';
import { InfluencerService } from './services/influencer.service';

@NgModule({
  declarations: [
    AppComponent,
    InfluencerLoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [InfluencerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
