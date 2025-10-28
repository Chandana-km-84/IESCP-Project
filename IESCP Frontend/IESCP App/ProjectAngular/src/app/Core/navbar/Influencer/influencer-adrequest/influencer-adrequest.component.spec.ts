import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerAdrequestComponent } from './influencer-adrequest.component';

describe('InfluencerAdrequestComponent', () => {
  let component: InfluencerAdrequestComponent;
  let fixture: ComponentFixture<InfluencerAdrequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfluencerAdrequestComponent]
    });
    fixture = TestBed.createComponent(InfluencerAdrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
