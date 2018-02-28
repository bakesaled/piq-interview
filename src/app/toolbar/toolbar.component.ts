import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from '../core/services/message.service';
import { ToolbarMessage } from '../core/messages/toolbar.message';
import { Command } from '../core/enums/command.enum';
import { Subscription } from 'rxjs/Subscription';
import { ListMessage } from '../core/messages/list.message';
import { BookEditorMessage } from '../core/messages/book-editor.message';

@Component({
  selector: 'ath-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  canDelete = false;
  canCheckout = false;
  canArrowBack = false;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.messageService
        .channel(ListMessage)
        .subscribe(msg => this.handleListMessage(msg))
    );

    this.subscriptions.push(
      this.messageService
        .channel(BookEditorMessage)
        .subscribe(msg => this.handleBookEditorMessage(msg))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onDelete() {
    this.messageService.publish(ToolbarMessage, {
      command: Command.delete
    });
  }

  onCheckoutClick() {
    this.messageService.publish(ToolbarMessage, {
      command: Command.checkout
    });
  }

  private handleListMessage(msg: ListMessage) {
    if (msg.command === Command.navigate) {
      this.canDelete = false;
      this.canCheckout = false;
      this.canArrowBack = false;
    }
  }

  private handleBookEditorMessage(msg: ListMessage) {
    if (msg.command === Command.navigate) {
      this.canDelete = true;
      this.canCheckout = true;
      this.canArrowBack = true;
    }
  }
}
