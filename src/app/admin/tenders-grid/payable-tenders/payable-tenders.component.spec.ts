import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableTendersComponent } from './payable-tenders.component';

describe('PayableTendersComponent', () => {
  let component: PayableTendersComponent;
  let fixture: ComponentFixture<PayableTendersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayableTendersComponent]
    });
    fixture = TestBed.createComponent(PayableTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
