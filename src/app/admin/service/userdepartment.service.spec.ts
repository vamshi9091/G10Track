import { TestBed } from '@angular/core/testing';

import { UserdepartmentService } from './userdepartment.service';

describe('UserdepartmentService', () => {
  let service: UserdepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
