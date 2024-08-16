import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SelectAutoComplete } from '../models/reusables/select-autocomplete.interface';
import { map, Observable } from 'rxjs';
import { endpoint } from '../utils/endpoints.util';
import { BaseApiResponse } from '../models/commons/base-api-response.interface';
import { environment as env } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DepartmentSelectService {
  private readonly httpClient = inject(HttpClient);

  constructor() { }

  listSelectDepartment(): Observable<SelectAutoComplete[]> {
    const requestUrl = `${env.api}${endpoint.LIST_SELECT_DEPARTMENT}`;
    return this.httpClient.get<BaseApiResponse<SelectAutoComplete[]>>(requestUrl).pipe(
      map((resp) => {
        return resp.data;
      })
    );
  }

}
