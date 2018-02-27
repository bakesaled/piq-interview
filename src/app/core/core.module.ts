import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './services/book.service';
import { CategoryService } from './services/category.service';
import { MessageService } from './services/message.service';
import { ErrorInterceptorProvider } from './error.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    ErrorInterceptorProvider,
    BookService,
    CategoryService,
    MessageService
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule
  ) { }
}
