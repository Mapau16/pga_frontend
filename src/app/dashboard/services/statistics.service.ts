import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItemsByReview } from '../interfaces/statistics.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private readonly _baseUrl: string = environments.baseUrl;

  constructor(private _http: HttpClient) { }

  public getReviewsByClients(): Observable<any> {
    const url = `${this._baseUrl}review/statistics/clients`;
    return this._http.get<any>(url);
  }

  public getReviewsByRoles(): Observable<any> {
    const url = `${this._baseUrl}review/statistics/roles`;
    return this._http.get<any>(url);
  }

  public getItemsByReviews(): Observable<IItemsByReview[]> {
    const url = `${this._baseUrl}review/statistics/items`;
    return this._http.get<IItemsByReview[]>(url);
  }
}
