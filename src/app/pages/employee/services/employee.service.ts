import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiResponse } from '../../../shared/models/commons/base-api-response.interface';
import {
  EmployeeByIdResponse,
  EmployeeResponse,
} from '../models/employee-response.interface';
import { environment as env } from '../../../../environments/environment.development';
import { endpoint } from '../../../shared/utils/endpoints.util';
import { HttpClient } from '@angular/common/http';
import { getIcon, getStateBadge } from '../../../shared/utils/functions.util';
import {
  EmployeeRequest,
  EmployeeUpdateRequest,
} from '../models/employee-request.interface';
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
export class EmployeeService {
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  getAll(
    size: any,
    sort: string,
    order: any,
    numPage: any,
    getInputs: any
  ): Observable<BaseApiResponse<EmployeeResponse[]>> {
    const requestUrl = `${env.api}${
      endpoint.LIST_EMPLOYEES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    return this.httpClient
      .get<BaseApiResponse<EmployeeResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<EmployeeResponse[]>(resp);
          normalizedResp.data.forEach(function (e: EmployeeResponse) {
            e.stateEmployee = getStateBadge(e.stateEmployee);
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

  employeeById(employeeId: number): Observable<EmployeeByIdResponse> {
    const requestUrl = `${env.api}${endpoint.EMPLOYEE_BY_ID}${employeeId}`;
    return this.httpClient
      .get<BaseApiResponse<EmployeeByIdResponse>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<EmployeeByIdResponse>(resp);
          return normalizedResp.data;
        })
      );
  }

  employeeCreate(employee: EmployeeRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.EMPLOYEE_CREATE}`;
    return this.httpClient
      .post<BaseApiResponse<boolean>>(requestUrl, employee)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  employeeUpdate(employee: EmployeeUpdateRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.EMPLOYEE_UPDATE}`;
    return this.httpClient
      .put<BaseApiResponse<boolean>>(requestUrl, employee)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  employeeDelete(employeeId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.EMPLOYEE_DELETE}${employeeId}`;
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
