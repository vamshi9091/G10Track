import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAwardedTendersGetComponent } from './dashboard-awarded-tenders-get.component';

describe('DashboardAwardedTendersGetComponent', () => {
  let component: DashboardAwardedTendersGetComponent;
  let fixture: ComponentFixture<DashboardAwardedTendersGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardAwardedTendersGetComponent]
    });
    fixture = TestBed.createComponent(DashboardAwardedTendersGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
