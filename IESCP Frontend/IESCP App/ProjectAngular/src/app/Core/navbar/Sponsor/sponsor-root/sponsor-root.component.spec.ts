import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorRootComponent } from './sponsor-root.component';

describe('SponsorRootComponent', () => {
  let component: SponsorRootComponent;
  let fixture: ComponentFixture<SponsorRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorRootComponent]
    });
    fixture = TestBed.createComponent(SponsorRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
