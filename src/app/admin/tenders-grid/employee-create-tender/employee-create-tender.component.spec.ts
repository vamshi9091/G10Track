import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreateTenderComponent } from './employee-create-tender.component';

describe('EmployeeCreateTenderComponent', () => {
  let component: EmployeeCreateTenderComponent;
  let fixture: ComponentFixture<EmployeeCreateTenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeCreateTenderComponent]
    });
    fixture = TestBed.createComponent(EmployeeCreateTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
