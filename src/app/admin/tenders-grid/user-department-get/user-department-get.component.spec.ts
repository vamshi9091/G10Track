import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDepartmentGetComponent } from './user-department-get.component';

describe('UserDepartmentGetComponent', () => {
  let component: UserDepartmentGetComponent;
  let fixture: ComponentFixture<UserDepartmentGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDepartmentGetComponent]
    });
    fixture = TestBed.createComponent(UserDepartmentGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
