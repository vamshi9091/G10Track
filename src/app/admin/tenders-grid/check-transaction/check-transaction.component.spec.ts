import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTransactionComponent } from './check-transaction.component';

describe('CheckTransactionComponent', () => {
  let component: CheckTransactionComponent;
  let fixture: ComponentFixture<CheckTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckTransactionComponent]
    });
    fixture = TestBed.createComponent(CheckTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
