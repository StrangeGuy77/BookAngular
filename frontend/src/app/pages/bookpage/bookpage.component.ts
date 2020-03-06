import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookpage',
  templateUrl: './bookpage.component.html',
  styleUrls: ['./bookpage.component.css']
})
export class BookpageComponent implements OnInit {

  title: string = "Test";
  description: string = "Test";
  author: string = "Test";

  ngOnInit (): void {
  }

}
