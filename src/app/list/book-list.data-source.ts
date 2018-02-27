import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Book } from '../../server/interfaces/book';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BookService } from '../core/services/book.service';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { BookList } from '../../server/interfaces/book-list';

export class BookListDataSource implements DataSource<Book> {
  private booksSubject = new BehaviorSubject<Array<Book>>([]);
  private countSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public count$ = this.countSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private bookService: BookService) {}

  connect(collectionViewer: CollectionViewer): Observable<Array<Book>> {
    return this.booksSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.booksSubject.complete();
    this.countSubject.complete();
    this.loadingSubject.complete();
  }

  loadBooks(page: number = 0, pageSize: number = 3, filter: string = '') {
    this.loadingSubject.next(true);

    this.bookService
      .get(page, pageSize, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((bookList: BookList) => {
        console.log(bookList);
        this.booksSubject.next(bookList.books);
        this.countSubject.next(bookList.count);
      });
  }
}
