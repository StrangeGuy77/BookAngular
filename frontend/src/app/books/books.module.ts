import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookComponent } from './book/book.component';

import { BookRegistryComponent } from './book-registry/book-registry.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [BookComponent, BookRegistryComponent],
  exports: [BookComponent, BookRegistryComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BooksModule { }
