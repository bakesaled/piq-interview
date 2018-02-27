import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './services/book.service';
import { CategoryService } from './services/category.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    BookService,
    CategoryService
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule
  ) { }
}
