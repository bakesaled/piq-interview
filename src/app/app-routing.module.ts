import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LandingComponent } from './landing/landing.component';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { BookPreLoadResolver } from './core/book-pre-load.resolver';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'book/:id',
    component: BookEditorComponent,
    resolve: { book: BookPreLoadResolver }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
  providers: [BookPreLoadResolver]
})
export class AppRoutingModule {}
