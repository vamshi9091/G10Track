import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardthemeComponent } from './dashboardtheme.component';

describe('DashboardthemeComponent', () => {
  let component: DashboardthemeComponent;
  let fixture: ComponentFixture<DashboardthemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardthemeComponent]
    });
    fixture = TestBed.createComponent(DashboardthemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
