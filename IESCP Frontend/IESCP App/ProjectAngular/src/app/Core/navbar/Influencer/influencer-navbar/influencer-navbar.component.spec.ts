import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerNavbarComponent } from './influencer-navbar.component';

describe('InfluencerNavbarComponent', () => {
  let component: InfluencerNavbarComponent;
  let fixture: ComponentFixture<InfluencerNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfluencerNavbarComponent]
    });
    fixture = TestBed.createComponent(InfluencerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
