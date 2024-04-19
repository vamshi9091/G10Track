import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDepertmentCreateComponent } from './user-depertment-create.component';

describe('UserDepertmentCreateComponent', () => {
  let component: UserDepertmentCreateComponent;
  let fixture: ComponentFixture<UserDepertmentCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDepertmentCreateComponent]
    });
    fixture = TestBed.createComponent(UserDepertmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
