import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSidenavComponent } from './home-sidenav.component';

describe('HomeSidenavComponent', () => {
  let component: HomeSidenavComponent;
  let fixture: ComponentFixture<HomeSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSidenavComponent]
    });
    fixture = TestBed.createComponent(HomeSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
