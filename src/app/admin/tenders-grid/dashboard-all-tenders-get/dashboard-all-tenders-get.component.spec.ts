import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllTendersGetComponent } from './dashboard-all-tenders-get.component';

describe('DashboardAllTendersGetComponent', () => {
  let component: DashboardAllTendersGetComponent;
  let fixture: ComponentFixture<DashboardAllTendersGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardAllTendersGetComponent]
    });
    fixture = TestBed.createComponent(DashboardAllTendersGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
