import { TestBed } from '@angular/core/testing';

import { CookieserviceService } from './cookieservice.service';

describe('CookieserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookieserviceService = TestBed.get(CookieserviceService);
    expect(service).toBeTruthy();
  });
});
