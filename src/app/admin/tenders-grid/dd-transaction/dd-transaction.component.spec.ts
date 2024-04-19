import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDTransactionComponent } from './dd-transaction.component';

describe('DDTransactionComponent', () => {
  let component: DDTransactionComponent;
  let fixture: ComponentFixture<DDTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DDTransactionComponent]
    });
    fixture = TestBed.createComponent(DDTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
