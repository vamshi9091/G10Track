import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTendersComponent } from './live-tenders.component';

describe('LiveTendersComponent', () => {
  let component: LiveTendersComponent;
  let fixture: ComponentFixture<LiveTendersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveTendersComponent]
    });
    fixture = TestBed.createComponent(LiveTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
