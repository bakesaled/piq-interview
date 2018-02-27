import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BookService } from '../core/services/book.service';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BookListDataSource } from './book-list.data-source';

@Component({
  selector: 'ath-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, AfterViewInit {
  public dataSource: BookListDataSource;

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
    this.dataSource = new BookListDataSource(this.bookService);
    this.dataSource.loadBooks(1);
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadBooksPage())).subscribe();
  }

  onRowClick(row) {
    console.log('click', row);
    this.router.navigate([`/book/${row._id}`]);
  }

  applyFilter(value: string) {
    console.log('filter', value);
  }

  private loadBooksPage() {
    this.dataSource.loadBooks(this.paginator.pageIndex, this.paginator.pageSize);
  }
}
