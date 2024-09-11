import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { IReview } from '../interfaces/review.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly _baseUrl: string = environments.baseUrl;

  constructor(private _http: HttpClient) { }

  public getReviews(): Observable<IReview[]> {
    const url = `${this._baseUrl}review`;

    return this._http.get<IReview[]>(url);
  }

  public searchReviewByName(name: string): Observable<IReview[]> {
    const url = `${this._baseUrl}review/search?name=${name}`;

    return this._http.get<IReview[]>(url);
  }

  public searchReviewById(idreview: string): Observable<IReview> {
    const url = `${this._baseUrl}review/${idreview}`;

    return this._http.get<IReview>(url);
  }

  public updateReview(idReview: string, data: IReview): Observable<IReview> {
    const url = `${this._baseUrl}review/${idReview}`;

    return this._http.patch<IReview>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }

  public saveReview(data: IReview): Observable<IReview> {
    const url = `${this._baseUrl}review`;

    return this._http.post<IReview>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }
}

