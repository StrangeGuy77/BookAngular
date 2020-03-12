import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"]
})
export class CardsComponent implements OnInit {
  @Input() author = "cristofer";
  @Input() title = "havia una vex";
  @Input() UrlImg;
  @Input() CiteBook = "fggds";

  constructor() {}

  ngOnInit() {}
}
