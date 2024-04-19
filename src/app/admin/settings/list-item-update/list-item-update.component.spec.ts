import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemUpdateComponent } from './list-item-update.component';

describe('ListItemUpdateComponent', () => {
  let component: ListItemUpdateComponent;
  let fixture: ComponentFixture<ListItemUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemUpdateComponent]
    });
    fixture = TestBed.createComponent(ListItemUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
