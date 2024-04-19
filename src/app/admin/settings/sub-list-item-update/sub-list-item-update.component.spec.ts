import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubListItemUpdateComponent } from './sub-list-item-update.component';

describe('SubListItemUpdateComponent', () => {
  let component: SubListItemUpdateComponent;
  let fixture: ComponentFixture<SubListItemUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubListItemUpdateComponent]
    });
    fixture = TestBed.createComponent(SubListItemUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
