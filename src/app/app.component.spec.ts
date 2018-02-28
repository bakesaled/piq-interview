import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from './core/services/message.service';
describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent, ToolbarComponent],
        imports: [SharedModule, RouterTestingModule],
        providers: [MessageService]
      }).compileComponents();
    })
  );
  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
