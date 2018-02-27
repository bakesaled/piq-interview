import { Schema } from 'mongoose';

export let bookSchema: Schema = new Schema({
  name: String,
  author: String,
  categoryId: String,
  publishedDate: Date,
  user: String
});
