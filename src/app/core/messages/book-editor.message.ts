import { Message } from '../interfaces/message';
import { Command } from '../enums/command.enum';

export class BookEditorMessage implements Message {
  command: Command;
  data: any;
}
