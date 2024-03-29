import { TestBed, inject } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
  });

  it(
    'should be created',
    inject([CategoryService], (service: CategoryService) => {
      expect(service).toBeTruthy();
    })
  );
});
