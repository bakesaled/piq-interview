import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../core/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { BookModel } from '../../server/models/book.model';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CategoryModel } from '../../server/models/category.model';
import { CategoryService } from '../core/services/category.service';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

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
    private fb: FormBuilder
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
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  displayFn(category?: CategoryModel): string | undefined {
    console.log('ddd', category);
    return category ? category.name : undefined;
  }

  filter(name: string): CategoryModel[] {
    return this.categories.filter(
      category => category.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
}
