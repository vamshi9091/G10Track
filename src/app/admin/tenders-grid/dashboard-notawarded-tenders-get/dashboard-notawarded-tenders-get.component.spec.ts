import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNotawardedTendersGetComponent } from './dashboard-notawarded-tenders-get.component';

describe('DashboardNotawardedTendersGetComponent', () => {
  let component: DashboardNotawardedTendersGetComponent;
  let fixture: ComponentFixture<DashboardNotawardedTendersGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardNotawardedTendersGetComponent]
    });
    fixture = TestBed.createComponent(DashboardNotawardedTendersGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
