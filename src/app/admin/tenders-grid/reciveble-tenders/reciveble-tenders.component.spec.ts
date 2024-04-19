import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecivebleTendersComponent } from './reciveble-tenders.component';

describe('RecivebleTendersComponent', () => {
  let component: RecivebleTendersComponent;
  let fixture: ComponentFixture<RecivebleTendersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecivebleTendersComponent]
    });
    fixture = TestBed.createComponent(RecivebleTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
