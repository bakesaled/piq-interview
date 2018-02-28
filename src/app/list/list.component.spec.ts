import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import { BookService } from '../core/services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from '../core/services/message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ListComponent],
        imports: [
          MatProgressSpinnerModule,
          MatFormFieldModule,
          MatTableModule,
          MatPaginatorModule,
          MatInputModule,
          HttpClientTestingModule,
          RouterTestingModule,
          BrowserAnimationsModule
        ],
        providers: [BookService, MessageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
