import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ListComponent } from './list/list.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ToolbarComponent,
    LandingComponent,
    BookEditorComponent,
    CheckoutDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  entryComponents: [
    CheckoutDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
