import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BookModel } from '../../../server/models/book.model';
import { BookList } from '../../../server/interfaces/book-list';

@Injectable()
export class BookService {
  private readonly baseUrl = 'http://localhost:7000/api/';
  constructor(private http: HttpClient) {}

  public get(
    page: number,
    pageSize: number,
    filter: string
  ): Observable<BookList> {
    return this.http.get<BookList>(
      `${this.baseUrl}book/search/${page}/${pageSize}/${filter}`
    );
  }

  public getById(id: string): Observable<BookModel> {
    return this.http.get<BookModel>(`${this.baseUrl}book/${id}`);
  }
}
