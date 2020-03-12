import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AppRoutingModule } from "../app-routing.module";

// MDBBootstra
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { Page404Component } from "./page404/page404.component";
import { CardsComponent } from "./cards/cards.component";
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    Page404Component,
    CardsComponent,
    AlertComponent
  ],
  imports: [CommonModule, MDBBootstrapModule, AppRoutingModule],
  exports: [FooterComponent, HeaderComponent, Page404Component, CardsComponent, AlertComponent]
})
export class SharedModule {}
