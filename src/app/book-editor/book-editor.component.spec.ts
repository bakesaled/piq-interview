import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditorComponent } from './book-editor.component';
import { SharedModule } from '../shared/shared.module';
import { BookService } from '../core/services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryService } from '../core/services/category.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from '../core/services/message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookEditorComponent', () => {
  let component: BookEditorComponent;
  let fixture: ComponentFixture<BookEditorComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BookEditorComponent],
        imports: [
          SharedModule,
          HttpClientTestingModule,
          RouterTestingModule,
          BrowserAnimationsModule
        ],
        providers: [BookService, CategoryService, MessageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
