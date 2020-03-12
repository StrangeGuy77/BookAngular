import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { IUser, IBook } from '../interface-data/interface.DataEstrucura';

//import { DataEstrucura } from "../interface-data/interface.DataEstrucura";

@Injectable({
  providedIn: "root"
})
export class DataService {
  // data: DataEstrucura = {
  //   author: "prueba",
  //   title: "havia una vez",
  //   urlImg: "img.png",
  //   CiteBook: "dfdfdfddffmnfjff"
  // };

  constructor(private http: HttpClient) {}

    

  post() {
    return this.http.post("", "", {});
  }

  get() {
    return this.http.get("");
  }

  delete() {
    return this.http.delete("");
  }

  put() {
    return this.http.put("", "", {});
  }
}
