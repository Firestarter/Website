import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Config} from 'codelyzer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {

  }

  async verify(username: string, token: string) {
    this.http.get('https://mc-oauth.net/api/api?token', {
      headers: {
        'token': token
      }
    }).subscribe((data: Config) => {
      console.log(data);
    });
  }

}
