import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, IAuth, IUser } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _baseUrl: string = environments.baseUrl;

  private _currentUser = signal<IUser|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private _http: HttpClient, private _router: Router) {}

  private _setAuthStatus(user: IUser, token: string) {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
  }

  private _removeAuthStatus(): void {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.removeItem('token');
    this._router.navigateByUrl('/auth/login');
  }

  public login(email: string, password: string): Observable<boolean> {
    const url = `${this._baseUrl}auth/login`;
    const body = { email, password };
    return this._http.post<IAuth>(url, body)
      .pipe(
        tap(({ user, token }) => {
          this._setAuthStatus(user, token);
        }),
        map(() => true),
        catchError(err => throwError(() => err.error.message))
      )
  }

  public register(data: any): Observable<any> {
    const url = `${this._baseUrl}auth/register`;
    return this._http.post<any>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      );
  }

  public validateAuth(): Observable<boolean> {
    const url = `${this._baseUrl}auth/check-auth`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<IAuth>(url, { headers })
      .pipe(
        tap(({ user, token }) => {
          this._setAuthStatus(user, token);
        }),
        map(() => true),
        catchError(() => {
          this._removeAuthStatus();
          return of(false)
        })
        //catchError(err => throwError(() => err.error.message))
      )
  }

  public refreshToken(): Observable<{token: string}> {
    const user = this.currentUser()?._id;
    const url = `${this._baseUrl}auth/refresh/${user}`;
    
    return this._http.get<{token: string}>(url)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('token', token);
        }),
        catchError(err => throwError(() => {
          this._removeAuthStatus();
          err.error.message
        }))
      );
  }

  public logout() {
    this._removeAuthStatus();
  }
}
