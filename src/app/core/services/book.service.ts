import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BookModel } from '../../../server/models/book.model';
import { BookList } from '../../../server/interfaces/book-list';
import { Book } from '../../../server/interfaces/book';

@Injectable()
export class BookService {
  private readonly baseUrl = 'http://localhost:7000/api/';

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

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
    return this.http.get<BookModel>(`${this.baseUrl}book/single/${id}`);
  }

  public save(book: Book | any) {
    if (book._id) {
      return this.http.put(`${this.baseUrl}book/update`, book, this.httpOptions);
    } else {
      return this.http.post(`${this.baseUrl}book/new`, book, this.httpOptions);
    }
  }
}
