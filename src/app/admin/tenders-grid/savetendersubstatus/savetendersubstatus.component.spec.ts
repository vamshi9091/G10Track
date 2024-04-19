import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavetendersubstatusComponent } from './savetendersubstatus.component';

describe('SavetendersubstatusComponent', () => {
  let component: SavetendersubstatusComponent;
  let fixture: ComponentFixture<SavetendersubstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavetendersubstatusComponent]
    });
    fixture = TestBed.createComponent(SavetendersubstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
