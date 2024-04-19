import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGetTenderComponent } from './employee-get-tender.component';

describe('EmployeeGetTenderComponent', () => {
  let component: EmployeeGetTenderComponent;
  let fixture: ComponentFixture<EmployeeGetTenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeGetTenderComponent]
    });
    fixture = TestBed.createComponent(EmployeeGetTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
