import { Component, OnInit } from "@angular/core";

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
  constructor() {}

  ngOnInit() {}
}
