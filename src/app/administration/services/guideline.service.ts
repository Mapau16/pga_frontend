import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { IGuideline } from '../interfaces/guideline.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GuidelineService {
  private readonly _baseUrl: string = environments.baseUrl;

  constructor(private _http: HttpClient) { }

  public getGuidelines(): Observable<IGuideline[]> {
    const url = `${this._baseUrl}guideline`;

    return this._http.get<IGuideline[]>(url);
  }

  public searchGuidelineByName(name: string): Observable<IGuideline[]> {
    const url = `${this._baseUrl}guideline/search?name=${name}`;

    return this._http.get<IGuideline[]>(url);
  }

  public updateGuideline(idGuideline: string, data: IGuideline): Observable<IGuideline> {
    const url = `${this._baseUrl}guideline/${idGuideline}`;

    return this._http.patch<IGuideline>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }

  public saveGuideline(data: IGuideline): Observable<IGuideline> {
    const url = `${this._baseUrl}guideline`;

    return this._http.post<IGuideline>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }
}
