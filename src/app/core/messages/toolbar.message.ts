
import { Message } from '../interfaces/message';
import { Command } from '../enums/command.enum';

export class ToolbarMessage implements Message {
  command: Command;
  data: any;
}
