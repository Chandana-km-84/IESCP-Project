import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerPaymentsComponent } from './influencer-payments.component';

describe('InfluencerPaymentsComponent', () => {
  let component: InfluencerPaymentsComponent;
  let fixture: ComponentFixture<InfluencerPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfluencerPaymentsComponent]
    });
    fixture = TestBed.createComponent(InfluencerPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
