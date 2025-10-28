import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerUpdateRequestComponent } from './influencer-update-request.component';

describe('InfluencerUpdateRequestComponent', () => {
  let component: InfluencerUpdateRequestComponent;
  let fixture: ComponentFixture<InfluencerUpdateRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfluencerUpdateRequestComponent]
    });
    fixture = TestBed.createComponent(InfluencerUpdateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
