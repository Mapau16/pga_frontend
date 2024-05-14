import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { IClient } from '../interfaces/client.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly _baseUrl: string = environments.baseUrl;

  constructor(private _http: HttpClient) { }

  public getClients(): Observable<IClient[]> {
    const url = `${this._baseUrl}client`;

    return this._http.get<IClient[]>(url);
  }

  public updateClient(idClient: string, data: IClient): Observable<IClient> {
    const url = `${this._baseUrl}client/${idClient}`;

    return this._http.patch<IClient>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }

  public saveClient(data: IClient): Observable<IClient> {
    const url = `${this._baseUrl}client`;

    return this._http.post<IClient>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }
}
