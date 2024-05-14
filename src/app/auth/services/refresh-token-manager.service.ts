import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenManagerService {

  public cloneRequest(req: HttpRequest<unknown>) {
    const authToken = localStorage.getItem('token');
    return req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) });
  }

}
