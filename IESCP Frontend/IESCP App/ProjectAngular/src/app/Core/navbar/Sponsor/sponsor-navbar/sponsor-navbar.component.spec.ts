import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorNavbarComponent } from './sponsor-navbar.component';

describe('SponsorNavbarComponent', () => {
  let component: SponsorNavbarComponent;
  let fixture: ComponentFixture<SponsorNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorNavbarComponent]
    });
    fixture = TestBed.createComponent(SponsorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
