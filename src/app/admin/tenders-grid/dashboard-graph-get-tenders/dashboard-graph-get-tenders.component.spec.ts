import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGraphGetTendersComponent } from './dashboard-graph-get-tenders.component';

describe('DashboardGraphGetTendersComponent', () => {
  let component: DashboardGraphGetTendersComponent;
  let fixture: ComponentFixture<DashboardGraphGetTendersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardGraphGetTendersComponent]
    });
    fixture = TestBed.createComponent(DashboardGraphGetTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
