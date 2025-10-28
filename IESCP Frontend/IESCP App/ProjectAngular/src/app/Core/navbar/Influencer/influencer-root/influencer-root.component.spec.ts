import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerRootComponent } from './influencer-root.component';

describe('InfluencerRootComponent', () => {
  let component: InfluencerRootComponent;
  let fixture: ComponentFixture<InfluencerRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfluencerRootComponent]
    });
    fixture = TestBed.createComponent(InfluencerRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
