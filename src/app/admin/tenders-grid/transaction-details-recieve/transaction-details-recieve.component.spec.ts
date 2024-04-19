import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsRecieveComponent } from './transaction-details-recieve.component';

describe('TransactionDetailsRecieveComponent', () => {
  let component: TransactionDetailsRecieveComponent;
  let fixture: ComponentFixture<TransactionDetailsRecieveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionDetailsRecieveComponent]
    });
    fixture = TestBed.createComponent(TransactionDetailsRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
