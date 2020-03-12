import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "../app-routing.module";

// IMPORTAR MODULO INDIVIDUAL
import { SharedModule } from "../shared/shared.module";

// COMPONENTE
import { AddBooksComponent } from "./add-books/add-books.component";
import { ComicFantasiaComponent } from "./comic-fantasia/comic-fantasia.component";
import { CocinaGastronomiaComponent } from "./cocina-gastronomia/cocina-gastronomia.component";
import { LiteraturaComponent } from "./literatura/literatura.component";
import { IndexComponent } from "./index/index.component";

@NgModule({
  declarations: [
    AddBooksComponent,
    ComicFantasiaComponent,
    CocinaGastronomiaComponent,
    LiteraturaComponent,
    IndexComponent
  ],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule, SharedModule]
})
export class PageModule {}
