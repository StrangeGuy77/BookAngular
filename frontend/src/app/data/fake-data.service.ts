import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {
  arrayTest = [
    {
      email: 'jaime@gmailcom',
      password: 'quegonorreadepc'
    },
    {
      email: 'JLOepz@soft.com',
      password: 'asdasa'
    }, {
      email: 'xdxd@hotmail.com',
      password: 'asdasa'
    }, {
      email: 'dislexy@test.com',
      password: 'asdasa'
    }, {
      email: 'testemail@soft.com',
      password: 'asdasa'
    }, {
      email: '',
      password: ''
    }
  ];

}
