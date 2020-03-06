import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  constructor(public http: HttpClient) {

  }

  this.http.get('https://103f126b.ngrok.io/books')

}
