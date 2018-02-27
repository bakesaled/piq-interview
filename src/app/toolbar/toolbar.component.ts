import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../core/services/message.service';
import { ToolbarMessage } from '../core/messages/toolbar.message';
import { Command } from '../core/enums/command.enum';

@Component({
  selector: 'ath-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  onDelete() {
    this.messageService.publish(ToolbarMessage, {
      command: Command.delete
    });
  }
}
