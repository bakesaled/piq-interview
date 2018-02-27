import { Book } from './book';

export interface BookList {
  books: Array<Book>;
  current: number;
  pages: number;
  count: number;
}
