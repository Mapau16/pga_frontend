import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { ICriterio, ICriterioItems } from '../interfaces/criterio.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CriterioService {
  private readonly _baseUrl: string = environments.baseUrl;
  //Declared to manage criterioItems status between dialog and dialog table
  //TODO: RESET STATUS WHEN DIALOG COMPONENT IS DESTROYED
  public criterioItems = signal<ICriterioItems[]>([]);

  constructor(private _http: HttpClient) { }

  public getCriterios(): Observable<ICriterio[]> {
    const url = `${this._baseUrl}criterio`;

    return this._http.get<ICriterio[]>(url);
  }

  public getCriterioById(idcriterio: string): Observable<ICriterio> {
    const url = `${this._baseUrl}criterio/${idcriterio}`;

    return this._http.get<ICriterio>(url);
  }

  public updateCriterio(idcriterio: string, data: ICriterio): Observable<ICriterio> {
    const url = `${this._baseUrl}criterio/${idcriterio}`;

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
