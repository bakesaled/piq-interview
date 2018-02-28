import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from '../core/services/message.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ToolbarComponent],
        imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterTestingModule],
        providers: [MessageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
