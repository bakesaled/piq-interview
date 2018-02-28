import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { BookService } from './services/book.service';
import { Observable } from 'rxjs/Observable';
import { BookModel } from '../../server/models/book.model';
import 'rxjs/add/observable/of';

@Injectable()
export class BookPreLoadResolver implements Resolve<BookModel> {
  constructor(private bookService: BookService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.loadBook(route);
  }

  loadBook(route: ActivatedRouteSnapshot): Observable<BookModel> {
    const id = route.paramMap.get('id');
    const isNew = id === '0';
    if (isNew) {
      return Observable.of(<any>{});
    } else {
      return this.bookService.getById(id);
    }
  }
}
