import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeptCreateComponent } from './user-dept-create.component';

describe('UserDeptCreateComponent', () => {
  let component: UserDeptCreateComponent;
  let fixture: ComponentFixture<UserDeptCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDeptCreateComponent]
    });
    fixture = TestBed.createComponent(UserDeptCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
