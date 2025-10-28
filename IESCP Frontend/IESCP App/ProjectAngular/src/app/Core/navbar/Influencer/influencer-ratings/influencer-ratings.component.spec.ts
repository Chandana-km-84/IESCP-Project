import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerRatingsComponent } from './influencer-ratings.component';

describe('InfluencerRatingsComponent', () => {
  let component: InfluencerRatingsComponent;
  let fixture: ComponentFixture<InfluencerRatingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfluencerRatingsComponent]
    });
    fixture = TestBed.createComponent(InfluencerRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
