import { Component, OnInit } from "@angular/core";
import { IBook } from 'src/app/interface-data/interface.DataEstrucura';
import { BooksService } from 'src/app/data/books.service';

@Component({
  selector: "app-literatura",
  templateUrl: "./literatura.component.html",
  styleUrls: ["./literatura.component.css"]
})
export class LiteraturaComponent implements OnInit {
  author: string;
  title: string;
  CiteBook: string;
  UrlImg: string;

  Books: IBook[] | any;

  constructor(private data: BooksService) { }

  ngOnInit () {
    this.data.getBooksByCategory("literature").subscribe(res => this.Books = (res as any).BooksFound);
    console.log(this.Books);
  }
}
