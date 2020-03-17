import { Component, OnInit } from "@angular/core";
import { DataService } from "../../data/data.service";
import { IBook } from 'src/app/interface-data/interface.DataEstrucura';
import { BooksService } from 'src/app/data/books.service';

@Component({
  selector: "app-cocina-gastronomia",
  templateUrl: "./cocina-gastronomia.component.html",
  styleUrls: ["./cocina-gastronomia.component.css"]
})
export class CocinaGastronomiaComponent implements OnInit {
  author: string;
  title: string;
  CiteBook: string;
  UrlImg: string;

  Books: IBook[] | any;

  constructor(private data: BooksService) { }

  ngOnInit () {
    this.data.getBooksByCategory("cookingandgastronomy").subscribe(res => this.Books = (res as any).BooksFound);
    console.log(this.Books);
  }
}
