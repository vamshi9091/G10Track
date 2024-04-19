import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSystemListComponent } from './create-system-list.component';

describe('CreateSystemListComponent', () => {
  let component: CreateSystemListComponent;
  let fixture: ComponentFixture<CreateSystemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSystemListComponent]
    });
    fixture = TestBed.createComponent(CreateSystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
