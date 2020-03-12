import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  private notifier: NotifierService;

  constructor(notifier: NotifierService) {
    this.notifier = notifier;
  }
  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}
