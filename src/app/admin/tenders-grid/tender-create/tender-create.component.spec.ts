import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderCreateComponent } from './tender-create.component';

describe('TenderCreateComponent', () => {
  let component: TenderCreateComponent;
  let fixture: ComponentFixture<TenderCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenderCreateComponent]
    });
    fixture = TestBed.createComponent(TenderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
