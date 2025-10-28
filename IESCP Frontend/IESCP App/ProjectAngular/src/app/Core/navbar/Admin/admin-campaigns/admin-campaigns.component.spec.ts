import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCampaignsComponent } from './admin-campaigns.component';

describe('AdminCampaignsComponent', () => {
  let component: AdminCampaignsComponent;
  let fixture: ComponentFixture<AdminCampaignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCampaignsComponent]
    });
    fixture = TestBed.createComponent(AdminCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
