import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdrequestsComponent } from './admin-adrequests.component';

describe('AdminAdrequestsComponent', () => {
  let component: AdminAdrequestsComponent;
  let fixture: ComponentFixture<AdminAdrequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAdrequestsComponent]
    });
    fixture = TestBed.createComponent(AdminAdrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
