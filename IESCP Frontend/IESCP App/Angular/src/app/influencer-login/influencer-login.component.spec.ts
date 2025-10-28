import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerLoginComponent } from './influencer-login.component';

describe('InfluencerLoginComponent', () => {
  let component: InfluencerLoginComponent;
  let fixture: ComponentFixture<InfluencerLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfluencerLoginComponent]
    });
    fixture = TestBed.createComponent(InfluencerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
