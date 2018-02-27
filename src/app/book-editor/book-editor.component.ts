import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../core/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from '../../server/models/book.model';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CategoryModel } from '../../server/models/category.model';
import { CategoryService } from '../core/services/category.service';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { MessageService } from '../core/services/message.service';
import { ToolbarMessage } from '../core/messages/toolbar.message';
import { Command } from '../core/enums/command.enum';

@Component({
  selector: 'ath-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss']
})
export class BookEditorComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  book: BookModel;
  bookForm: FormGroup;
  categories: Array<CategoryModel>;
  filteredCategories: Observable<Array<CategoryModel>>;
  categoryFormControl: FormControl = new FormControl();

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.data.subscribe((data: { book: BookModel }) => {
        console.log('book', data);
        this.book = data.book;
        this.bookForm = this.fb.group({
          name: this.book.name,
          author: this.book.author,
          category: this.book.category,
          publishedDate: this.book.publishedDate,
          user: this.book.user
        });
        this.categoryFormControl = new FormControl(this.book.category);
      })
    );

    this.subscriptions.push(
      this.categoryService.get().subscribe(categories => {
        this.categories = categories;

        this.filteredCategories = this.categoryFormControl.valueChanges.pipe(
          startWith<string | CategoryModel>(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(name => (name ? this.filter(name) : this.categories.slice()))
        );
      })
    );

    this.subscriptions.push(
      this.bookForm.valueChanges
        .debounceTime(500)
        .subscribe(() => this.saveForm())
    );

    this.subscriptions.push(
      this.messageService
        .channel(ToolbarMessage)
        .subscribe(msg => this.handleToolbarMessage(msg))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  displayFn(category?: CategoryModel): string | undefined {
    return category ? category.name : undefined;
  }

  filter(name: string): CategoryModel[] {
    return this.categories.filter(
      category => category.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  private saveForm() {
    console.log('validating', this.bookForm.valid, this.bookForm.dirty);
    if (this.bookForm.valid && this.bookForm.dirty) {
      console.log('saving', this.book, this.bookForm.value);
      this.subscriptions.push(
        this.bookService
          .save({
            _id: this.book._id,
            name: this.bookForm.value.name,
            author: this.bookForm.value.author,
            category: this.bookForm.value.category,
            publishedDate: this.bookForm.value.publishedDate,
            user: this.bookForm.value.user
          })
          .subscribe((book: BookModel) => {
            this.book._id = book._id;
          })
      );
    }
  }

  private handleToolbarMessage(msg: ToolbarMessage) {
    if (msg.command === Command.delete) {
      this.subscriptions.push(
        this.bookService.delete(this.book._id).subscribe(() => {
          console.log('delete success');
          this.router.navigate(['/']);
        })
      );
    }
  }
}
