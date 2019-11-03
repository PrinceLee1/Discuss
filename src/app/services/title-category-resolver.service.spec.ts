import { TestBed } from '@angular/core/testing';

import { TitleCategoryResolverService } from './title-category-resolver.service';

describe('TitleCategoryResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleCategoryResolverService = TestBed.get(TitleCategoryResolverService);
    expect(service).toBeTruthy();
  });
});
