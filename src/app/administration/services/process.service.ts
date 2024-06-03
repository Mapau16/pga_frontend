import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { IProcess } from '../interfaces/process.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private readonly _baseUrl: string = environments.baseUrl;

  constructor(private _http: HttpClient) { }

  public getProcess(): Observable<IProcess[]> {
    const url = `${this._baseUrl}process`;

    return this._http.get<IProcess[]>(url);
  }

  public searchProcessByName(name: string): Observable<IProcess[]> {
    const url = `${this._baseUrl}process/search?name=${name}`;

    return this._http.get<IProcess[]>(url);
  }

  public updateProcess(idProcess: string, data: IProcess): Observable<IProcess> {
    const url = `${this._baseUrl}process/${idProcess}`;

    return this._http.patch<IProcess>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }

  public saveProcess(data: IProcess): Observable<IProcess> {
    const url = `${this._baseUrl}process`;

    return this._http.post<IProcess>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }
}

