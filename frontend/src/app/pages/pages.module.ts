import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookpageComponent } from './bookpage/bookpage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { BookviewComponent } from './bookview/bookview.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { LoginModule } from '../login/login.module';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BookComponent } from '../books/book/book.component';
import { BooksModule } from '../books/books.module';

@NgModule({
  declarations: [BookpageComponent, ProfilepageComponent, BookviewComponent, HomeComponent, PagesComponent],
  exports: [PagesComponent],
  imports: [
    CommonModule,
    LoginModule,
    SharedModule,
    BooksModule,
    MDBBootstrapModule
  ]
})
export class PagesModule { }
