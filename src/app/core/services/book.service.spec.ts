import { TestBed, inject } from '@angular/core/testing';

import { BookService } from './book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
  });

  it(
    'should be created',
    inject([BookService], (service: BookService) => {
      expect(service).toBeTruthy();
    })
  );
});
