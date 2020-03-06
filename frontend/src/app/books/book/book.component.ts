import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  @Input() title = 'Loading...';
  @Input() description = 'Loading...';
  @Input() author = 'Loading...';
  @Input() Books: any[] = [];


}
