import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorAllAdrequestComponent } from './sponsor-all-adrequest.component';

describe('SponsorAllAdrequestComponent', () => {
  let component: SponsorAllAdrequestComponent;
  let fixture: ComponentFixture<SponsorAllAdrequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorAllAdrequestComponent]
    });
    fixture = TestBed.createComponent(SponsorAllAdrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
