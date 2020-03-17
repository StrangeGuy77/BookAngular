import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAgregarLibro } from '../interface-data/interface.DataEstrucura';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgregarLibrosService {

  SERVER_HOST = environment.SERVER_HOST;

  constructor(private http: HttpClient) { }

  books: IAgregarLibro[] | any;

  post (book: IAgregarLibro) {
    try
    {
      // console.log('entro service');
      const response = this.http.post(`${this.SERVER_HOST}/books`, book);
      console.log(response);
      return response;
    } catch (error)
    {
      console.log(error);
    }
  }

  uploadBook (book: IAgregarLibro) {
    try
    {
      const response = this.http.post(`${this.SERVER_HOST}/books`, book);
      console.log(response);
      return response;
    } catch (error)
    {
      console.log(error);
    }
  }
}
