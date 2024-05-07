import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { IAuth, Ilogin } from '../interfaces/auth.interface';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environments.baseUrl;

  constructor(private _http: HttpClient) { }

  public login(data: Ilogin): Observable<IAuth> {
    const url = `${this._baseUrl}auth/login`;
    return this._http.post<IAuth>(url, data)
  }
}
