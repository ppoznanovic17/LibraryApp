import { TestBed } from '@angular/core/testing';

import { FilterSortBookService } from './filter-sort-book.service';

describe('FilterSortBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterSortBookService = TestBed.get(FilterSortBookService);
    expect(service).toBeTruthy();
  });
});
