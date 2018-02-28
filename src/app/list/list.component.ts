import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BookService } from '../core/services/book.service';
import { MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BookListDataSource } from './book-list.data-source';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Subscription } from 'rxjs/Subscription';
import { Command } from '../core/enums/command.enum';
import { ListMessage } from '../core/messages/list.message';
import { MessageService } from '../core/services/message.service';

@Component({
  selector: 'ath-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private filterSubject: Subject<string> = new Subject<string>();

  public dataSource: BookListDataSource;

  public displayedColumns = [
    'name',
    'author',
    'category',
    'publishedDate',
    'user'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.dataSource = new BookListDataSource(this.bookService);

    this.subscriptions.push(
      this.filterSubject.debounceTime(500).subscribe(value => {
        this.paginator.pageIndex = 0;
        this.dataSource.loadBooks(
          this.paginator.pageIndex,
          this.paginator.pageSize,
          value
        );
      })
    );

    this.subscriptions.push(
      this.route.data.subscribe(() => {
        this.loadBooksPage();

        this.messageService.publish(ListMessage, {
          command: Command.navigate
        });
      })
    );
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadBooksPage())).subscribe();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onRowClick(row) {
    console.log('click', row);
    this.router.navigate([`/book/${row._id}`]);
  }

  applyFilter(value: string) {
    this.filterSubject.next(value);
  }

  private loadBooksPage() {
    this.dataSource.loadBooks(
      this.paginator.pageIndex || 0,
      this.paginator.pageSize || 10
    );
  }
}
