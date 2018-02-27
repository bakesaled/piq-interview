import { Schema } from 'mongoose';

export let categorySchema: Schema = new Schema({
  name: String,
  description: String
});
