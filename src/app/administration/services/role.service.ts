import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { IRole } from '../interfaces/role.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly _baseUrl: string = environments.baseUrl;

  constructor(private _http: HttpClient) { }

  public getRoles(): Observable<IRole[]> {
    const url = `${this._baseUrl}role`;

    return this._http.get<IRole[]>(url);
  }

  public updateRole(idRole: string, data: IRole): Observable<IRole> {
    const url = `${this._baseUrl}role/${idRole}`;

    return this._http.patch<IRole>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }

  public saveRole(data: IRole): Observable<IRole> {
    const url = `${this._baseUrl}role`;

    return this._http.post<IRole>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }
}
