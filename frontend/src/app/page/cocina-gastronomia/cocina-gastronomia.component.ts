import { Component, OnInit } from "@angular/core";
import { DataService } from "../../data/data.service";

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

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.get().subscribe(result => console.log(result));
  }
}
