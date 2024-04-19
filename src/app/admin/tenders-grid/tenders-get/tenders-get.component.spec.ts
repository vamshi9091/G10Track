import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersGetComponent } from './tenders-get.component';

describe('TendersGetComponent', () => {
  let component: TendersGetComponent;
  let fixture: ComponentFixture<TendersGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TendersGetComponent]
    });
    fixture = TestBed.createComponent(TendersGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
