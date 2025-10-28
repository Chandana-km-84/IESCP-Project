import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorCampaignsComponent } from './sponsor-campaigns.component';

describe('SponsorCampaignsComponent', () => {
  let component: SponsorCampaignsComponent;
  let fixture: ComponentFixture<SponsorCampaignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorCampaignsComponent]
    });
    fixture = TestBed.createComponent(SponsorCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
