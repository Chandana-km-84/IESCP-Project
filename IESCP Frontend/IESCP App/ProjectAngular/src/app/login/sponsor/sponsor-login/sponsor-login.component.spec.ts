import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorLoginComponent } from './sponsor-login.component';

describe('SponsorLoginComponent', () => {
  let component: SponsorLoginComponent;
  let fixture: ComponentFixture<SponsorLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorLoginComponent]
    });
    fixture = TestBed.createComponent(SponsorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
