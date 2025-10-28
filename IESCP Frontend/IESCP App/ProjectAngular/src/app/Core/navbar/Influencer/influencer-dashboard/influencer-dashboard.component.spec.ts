import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerDashboardComponent } from './influencer-dashboard.component';

describe('InfluencerDashboardComponent', () => {
  let component: InfluencerDashboardComponent;
  let fixture: ComponentFixture<InfluencerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfluencerDashboardComponent]
    });
    fixture = TestBed.createComponent(InfluencerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
