import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiResponse } from '../../../shared/models/commons/base-api-response.interface';
import {
  UserByIdResponse,
  UserResponse,
} from '../models/user-response.interface';
import { environment as env } from '../../../../environments/environment.development';
import { endpoint } from '../../../shared/utils/endpoints.util';
import { HttpClient } from '@angular/common/http';
import { getIcon, getStateBadge } from '../../../shared/utils/functions.util';
import {
  UserRequest,
  UserUpdateRequest,
} from '../models/user-request.interface';
import Swal from 'sweetalert2';

// Función para normalizar las claves de un objeto
function normalizeKeys(obj: any): any {
  const normalizedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      normalizedObj[key.toLowerCase()] = obj[key];
    }
  }
  return normalizedObj;
}

// Función para manejar la respuesta de la API, normalizando las claves
function handleApiResponse<T>(response: any): BaseApiResponse<T> {
  const normalizedResponse = normalizeKeys(response);

  return {
    isSuccess: normalizedResponse['issuccess'], // Trabajas con las claves normalizadas
    data: normalizedResponse['data'],
    message: normalizedResponse['message'],
    totalRecords: normalizedResponse['totalrecords'],
    errors: normalizedResponse['errors'],
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  getAll(
    size: any,
    sort: string,
    order: any,
    numPage: any,
    getInputs: any
  ): Observable<BaseApiResponse<UserResponse[]>> {
    const requestUrl = `${env.api}${
      endpoint.LIST_USERS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    return this.httpClient
      .get<BaseApiResponse<UserResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<UserResponse[]>(resp);
          normalizedResp.data.forEach(function (e: UserResponse) {
            e.stateUser = getStateBadge(e.stateUser);
            e.icEdit = getIcon('icEdit', 'Editar Usuario', true, 'edit');
            e.icDelete = getIcon(
              'icDelete',
              'Eliminar Usuario',
              true,
              'remove'
            );
          });
          return normalizedResp;
        })
      );
  }

  userById(userId: number): Observable<UserByIdResponse> {
    const requestUrl = `${env.api}${endpoint.USER_BY_ID}${userId}`;
    return this.httpClient
      .get<BaseApiResponse<UserByIdResponse>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<UserByIdResponse>(resp);
          return normalizedResp.data;
        })
      );
  }

  userCreate(user: UserRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.USER_CREATE}`;
    return this.httpClient
      .post<BaseApiResponse<boolean>>(requestUrl, user)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  userUpdate(user: UserUpdateRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.USER_UPDATE}`;
    return this.httpClient
      .put<BaseApiResponse<boolean>>(requestUrl, user)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  userDelete(userId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.USER_DELETE}${userId}`;
    return this.httpClient.delete<BaseApiResponse<boolean>>(requestUrl).pipe(
      map((resp: BaseApiResponse<boolean>) => {
        const normalizedResp = handleApiResponse<boolean>(resp);
        if (normalizedResp.isSuccess) {
          Swal.fire({
            title: 'Excelente',
            text: normalizedResp.message,
            icon: 'success',
          });
        }
      })
    );
  }
}
