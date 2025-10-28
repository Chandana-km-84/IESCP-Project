import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorInfluencersComponent } from './sponsor-influencers.component';

describe('SponsorInfluencersComponent', () => {
  let component: SponsorInfluencersComponent;
  let fixture: ComponentFixture<SponsorInfluencersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorInfluencersComponent]
    });
    fixture = TestBed.createComponent(SponsorInfluencersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
