import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../../server/interfaces/book';
import { BookModel } from '../../../server/models/book.model';

@Injectable()
export class BookService {
  private readonly baseUrl = 'http://localhost:7000/api/';
  constructor(private http: HttpClient) {}

  public get(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(`${this.baseUrl}book/`);
  }

  public getById(id: string): Observable<BookModel> {
    return this.http.get<BookModel>(`${this.baseUrl}book/${id}`);
  }
}
