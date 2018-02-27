import { Schema } from 'mongoose';

export let bookSchema: Schema = new Schema({
  name: String,
  author: String,
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  publishedDate: Date,
  user: String
});
