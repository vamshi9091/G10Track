import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeptUpdateComponent } from './user-dept-update.component';

describe('UserDeptUpdateComponent', () => {
  let component: UserDeptUpdateComponent;
  let fixture: ComponentFixture<UserDeptUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDeptUpdateComponent]
    });
    fixture = TestBed.createComponent(UserDeptUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
