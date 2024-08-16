import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment as env } from '../../../../environments/environment.development';
import { BaseApiResponse } from '../../../shared/models/commons/base-api-response.interface';
import { endpoint, httpOptions } from '../../../shared/utils/endpoints.util';
import { LoginRequest } from '../models/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private user: BehaviorSubject<string>;

  public get userToken(): string {
    return this.user.value;
  }

  constructor() {
    this.user = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('token')!)
    );
  }

  login(request: LoginRequest): Observable<BaseApiResponse<string>> {
    const requestUrl = `${env.api}${endpoint.LOGIN}`;
    return this.http
      .post<BaseApiResponse<string>>(requestUrl, request, httpOptions)
      .pipe(
        map((response: BaseApiResponse<string>) => {
          if (response.isSuccess) {
            localStorage.setItem('token', JSON.stringify(response.data));
            this.user.next(response.data);
          }
          return response;
        })
      );
  }
}
