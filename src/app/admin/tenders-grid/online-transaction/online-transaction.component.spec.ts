import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineTransactionComponent } from './online-transaction.component';

describe('OnlineTransactionComponent', () => {
  let component: OnlineTransactionComponent;
  let fixture: ComponentFixture<OnlineTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineTransactionComponent]
    });
    fixture = TestBed.createComponent(OnlineTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
