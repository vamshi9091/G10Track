import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDepartmentComponent } from './user-department.component';

describe('UserDepartmentComponent', () => {
  let component: UserDepartmentComponent;
  let fixture: ComponentFixture<UserDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDepartmentComponent]
    });
    fixture = TestBed.createComponent(UserDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
