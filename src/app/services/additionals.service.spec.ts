import { TestBed } from '@angular/core/testing';

import { AdditionalsService } from './additionals.service';

describe('AdditionalsService', () => {
  let service: AdditionalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
