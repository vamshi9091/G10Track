import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsUpdateComponent } from './transaction-details-update.component';

describe('TransactionDetailsUpdateComponent', () => {
  let component: TransactionDetailsUpdateComponent;
  let fixture: ComponentFixture<TransactionDetailsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionDetailsUpdateComponent]
    });
    fixture = TestBed.createComponent(TransactionDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
