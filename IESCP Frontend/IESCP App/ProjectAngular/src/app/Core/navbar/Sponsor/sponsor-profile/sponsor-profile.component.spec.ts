import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorProfileComponent } from './sponsor-profile.component';

describe('SponsorProfileComponent', () => {
  let component: SponsorProfileComponent;
  let fixture: ComponentFixture<SponsorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorProfileComponent]
    });
    fixture = TestBed.createComponent(SponsorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
