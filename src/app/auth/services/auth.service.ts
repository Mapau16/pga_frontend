import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { AuthStatus, IAuth, IUser, Ilogin } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _baseUrl: string = environments.baseUrl;

  private _currentUser = signal<IUser|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private _http: HttpClient) { }

  public login(email: string, password: string): Observable<boolean> {
    const url = `${this._baseUrl}auth/login`;
    const body = { email, password };
    return this._http.post<IAuth>(url, body)
      .pipe(
        tap(({ user, token }) => {
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
        }),
        map(() => true),
        catchError(err => throwError(() => err.error.message))
      )
  }

  public register(data: any): Observable<any> {
    const url = `${this._baseUrl}auth/register`;
    return this._http.post<any>(url, data)
  }
}
