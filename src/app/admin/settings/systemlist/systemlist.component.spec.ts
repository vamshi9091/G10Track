import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemlistComponent } from './systemlist.component';

describe('SystemlistComponent', () => {
  let component: SystemlistComponent;
  let fixture: ComponentFixture<SystemlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemlistComponent]
    });
    fixture = TestBed.createComponent(SystemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
