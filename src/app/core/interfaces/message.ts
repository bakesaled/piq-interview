import { Command } from '../enums/command.enum';

export interface Message {
  command: Command;
  data: any;
}
