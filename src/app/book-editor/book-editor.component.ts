import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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
import { BookEditorMessage } from '../core/messages/book-editor.message';
import {
  MatAutocompleteSelectedEvent,
  MatDatepickerInputEvent,
  MatDialog
} from '@angular/material';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';

@Component({
  selector: 'ath-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookEditorComponent implements OnInit, OnDestroy {
  @HostBinding('class.ath-book-editor') hostClass = true;

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
    private router: Router,
    private dialog: MatDialog
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

        this.messageService.publish(BookEditorMessage, {
          command: Command.navigate
        });
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
        .subscribe(() => this.validateAndSaveForm())
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

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.bookForm.controls.category.setValue(event.option.value);
    this.bookForm.controls.category.markAsDirty();
  }

  onCheckoutClick() {
    this.checkout();
  }

  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log('date', event);
    this.bookForm.controls.publishedDate.setValue(event.value);
    this.bookForm.controls.publishedDate.markAsDirty();
  }

  private validateAndSaveForm() {
    if (this.bookForm.valid && this.bookForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    this.subscriptions.push(
      this.bookService
        .save({
          _id: this.book._id,
          name: this.bookForm.value.name,
          author: this.bookForm.value.author,
          category: this.bookForm.value.category,
          publishedDate: this.bookForm.value.publishedDate,
          user: this.book.user
        })
        .subscribe((book: BookModel) => {
          console.log('new book after save', book);
          if (book._id) {
            this.book._id = book._id;
          }
        })
    );
  }

  private handleToolbarMessage(msg: ToolbarMessage) {
    if (msg.command === Command.delete) {
      this.subscriptions.push(
        this.bookService.delete(this.book._id).subscribe(() => {
          console.log('delete success');
          this.router.navigate(['/']);
        })
      );
    } else if (msg.command === Command.checkout) {
      this.checkout();
    }
  }

  private checkout() {
    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      width: '400px',
      height: '250px',
      data: this.bookForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.book.user = result;
      this.saveForm();
    });
  }
}
