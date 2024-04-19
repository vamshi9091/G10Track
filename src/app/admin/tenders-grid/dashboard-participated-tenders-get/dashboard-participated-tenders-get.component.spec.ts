import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardParticipatedTendersGetComponent } from './dashboard-participated-tenders-get.component';

describe('DashboardParticipatedTendersGetComponent', () => {
  let component: DashboardParticipatedTendersGetComponent;
  let fixture: ComponentFixture<DashboardParticipatedTendersGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardParticipatedTendersGetComponent]
    });
    fixture = TestBed.createComponent(DashboardParticipatedTendersGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
