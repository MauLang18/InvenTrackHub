import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiResponse } from '../../../shared/models/commons/base-api-response.interface';
import {
  DepartmentByIdResponse,
  DepartmentResponse,
} from '../models/department-response.interface';
import { environment as env } from '../../../../environments/environment.development';
import { endpoint } from '../../../shared/utils/endpoints.util';
import { HttpClient } from '@angular/common/http';
import { getIcon, getStateBadge } from '../../../shared/utils/functions.util';
import {
  DepartmentRequest,
  DepartmentUpdateRequest,
} from '../models/department-request.interface';
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
export class DepartmentService {
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  getAll(
    size: any,
    sort: string,
    order: any,
    numPage: any,
    getInputs: any
  ): Observable<BaseApiResponse<DepartmentResponse[]>> {
    const requestUrl = `${env.api}${
      endpoint.LIST_DEPARTMENTS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    return this.httpClient
      .get<BaseApiResponse<DepartmentResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<DepartmentResponse[]>(resp);
          normalizedResp.data.forEach(function (e: DepartmentResponse) {
            e.stateDepartment = getStateBadge(e.stateDepartment);
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

  departmentById(departmentId: number): Observable<DepartmentByIdResponse> {
    const requestUrl = `${env.api}${endpoint.DEPARTMENT_BY_ID}${departmentId}`;
    return this.httpClient
      .get<BaseApiResponse<DepartmentByIdResponse>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<DepartmentByIdResponse>(resp);
          return normalizedResp.data;
        })
      );
  }

  departmentCreate(department: DepartmentRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.DEPARTMENT_CREATE}`;
    return this.httpClient
      .post<BaseApiResponse<boolean>>(requestUrl, department)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  departmentUpdate(department: DepartmentUpdateRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.DEPARTMENT_UPDATE}`;
    return this.httpClient
      .put<BaseApiResponse<boolean>>(requestUrl, department)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  departmentDelete(departmentId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.DEPARTMENT_DELETE}${departmentId}`;
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
