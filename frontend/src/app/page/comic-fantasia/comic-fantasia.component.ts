import { Component, OnInit } from "@angular/core";
import { BooksService } from '../../data/books.service';
import { IBook } from '../../interface-data/interface.DataEstrucura';

@Component({
  selector: "app-comic-fantasia",
  templateUrl: "./comic-fantasia.component.html",
  styleUrls: ["./comic-fantasia.component.css"]
})
export class ComicFantasiaComponent implements OnInit {

  Books: IBook[] | any;

  constructor(private BooksServic: BooksService) { }

  ngOnInit () {
    this.BooksServic.getBooksByCategory("comicsandfantasy").subscribe(res => this.Books = (res as any).BooksFound);
    console.log(this.Books);
  }
}
