import { BookModel } from './book.model';
import { Model } from 'mongoose';
import { CategoryModel } from './category.model';

export interface AppModel {
  book: Model<BookModel>;
  category: Model<CategoryModel>;
}
