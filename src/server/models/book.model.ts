import { Book } from '../interfaces/book';
import { Document } from 'mongoose';

export interface BookModel extends Book, Document {}
