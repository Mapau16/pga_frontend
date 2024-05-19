import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { ICriterio } from '../interfaces/criterio.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CriterioService {
  private readonly _baseUrl: string = environments.baseUrl;

  constructor(private _http: HttpClient) { }

  public getCriterio(): Observable<ICriterio[]> {
    const url = `${this._baseUrl}criterio`;

    return this._http.get<ICriterio[]>(url);
  }

  public updateCriterio(idCriterio: string, data: ICriterio): Observable<ICriterio> {
    const url = `${this._baseUrl}criterio/${idCriterio}`;

    return this._http.patch<ICriterio>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }

  public saveCriterio(data: ICriterio): Observable<ICriterio> {
    const url = `${this._baseUrl}criterio`;

    return this._http.post<ICriterio>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }
}
