import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../interface-data/interface.DataEstrucura';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  SERVER_HOST = environment.SERVER_HOST;

  constructor(private http: HttpClient) { }

  books: IBook[] | any;

  getBooks (): Observable<any> {
    try
    {
      const response: any = this.http.get(`${this.SERVER_HOST}/books`);
      return response;
    } catch (error)
    {
      console.log(error);
    }
  }

  getBooksByCategory (category: string = "comicsandfantasy") {
    try
    {
      const response = this.http.get(`${this.SERVER_HOST}/books?categoryname=${category}&only=true`);
      return response;
    } catch (error)
    {
      console.log(error);
    }
  }

  uploadBook (book: IBook) {
    try
    {
      const response = this.http.post(`${this.SERVER_HOST}/books`, book);
      this.getBooks();
      return response;
    } catch (error)
    {
      console.log(error);
    }
  }
}
