import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorAdrequestComponent } from './sponsor-adrequest.component';

describe('SponsorAdrequestComponent', () => {
  let component: SponsorAdrequestComponent;
  let fixture: ComponentFixture<SponsorAdrequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorAdrequestComponent]
    });
    fixture = TestBed.createComponent(SponsorAdrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
