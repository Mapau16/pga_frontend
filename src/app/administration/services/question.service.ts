import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { IQuestion } from '../interfaces/question.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly _baseUrl: string = environments.baseUrl;

  constructor(private _http: HttpClient) { }

  public getQuestions(): Observable<IQuestion[]> {
    const url = `${this._baseUrl}question`;

    return this._http.get<IQuestion[]>(url);
  }

  public updateQuestion(idQuestion: string, data: IQuestion): Observable<IQuestion> {
    const url = `${this._baseUrl}question/${idQuestion}`;

    return this._http.patch<IQuestion>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }

  public saveQuestion(data: IQuestion): Observable<IQuestion> {
    const url = `${this._baseUrl}question`;

    return this._http.post<IQuestion>(url, data)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }
}
