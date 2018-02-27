import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BookService } from '../core/services/book.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Book } from '../../server/interfaces/book';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'ath-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, AfterViewInit {
  public bookList: Array<Book>;
  public bookListSubject: BehaviorSubject<Array<Book>> = new BehaviorSubject<
    Array<Book>
  >(null);
  public bookList$: Observable<
    Array<Book>
  > = this.bookListSubject.asObservable();

  public dataSource = new MatTableDataSource<Book>(this.bookList);

  public displayedColumns = [
    'name',
    'author',
    'category',
    'publishedDate',
    'user'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.loadBooks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowClick(row) {
    console.log('click', row);
    this.router.navigate([`/book/${row._id}`]);
  }

  private loadBooks() {
    this.bookService.get().subscribe(books => {
      this.bookList = books;
      this.bookListSubject.next(books);
    });
  }
}
