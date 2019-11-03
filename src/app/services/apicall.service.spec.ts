import { TestBed } from '@angular/core/testing';

import { ApicallService } from './apicall.service';

describe('ApicallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApicallService = TestBed.get(ApicallService);
    expect(service).toBeTruthy();
  });
});
