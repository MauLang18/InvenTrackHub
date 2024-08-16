import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiResponse } from '../../../shared/models/commons/base-api-response.interface';
import {
  EquipmentTypeByIdResponse,
  EquipmentTypeResponse,
} from '../models/equipmentType-response.interface';
import { environment as env } from '../../../../environments/environment.development';
import { endpoint } from '../../../shared/utils/endpoints.util';
import { HttpClient } from '@angular/common/http';
import { getIcon, getStateBadge } from '../../../shared/utils/functions.util';
import {
  EquipmentTypeRequest,
  EquipmentTypeUpdateRequest,
} from '../models/equipmentType-request.interface';
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
export class EquipmentTypeService {
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  getAll(
    size: any,
    sort: string,
    order: any,
    numPage: any,
    getInputs: any
  ): Observable<BaseApiResponse<EquipmentTypeResponse[]>> {
    const requestUrl = `${env.api}${
      endpoint.LIST_EQUIPMENT_TYPES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    return this.httpClient
      .get<BaseApiResponse<EquipmentTypeResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<EquipmentTypeResponse[]>(resp);
          normalizedResp.data.forEach(function (e: EquipmentTypeResponse) {
            e.stateEquipmentType = getStateBadge(e.stateEquipmentType);
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

  equipmentTypeById(equipmentTypeId: number): Observable<EquipmentTypeByIdResponse> {
    const requestUrl = `${env.api}${endpoint.EQUIPMENT_TYPE_BY_ID}${equipmentTypeId}`;
    return this.httpClient
      .get<BaseApiResponse<EquipmentTypeByIdResponse>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<EquipmentTypeByIdResponse>(resp);
          return normalizedResp.data;
        })
      );
  }

  equipmentTypeCreate(equipmentType: EquipmentTypeRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.EQUIPMENT_TYPE_CREATE}`;
    return this.httpClient
      .post<BaseApiResponse<boolean>>(requestUrl, equipmentType)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  equipmentTypeUpdate(equipmentType: EquipmentTypeUpdateRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.EQUIPMENT_TYPE_UPDATE}`;
    return this.httpClient
      .put<BaseApiResponse<boolean>>(requestUrl, equipmentType)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  equipmentTypeDelete(equipmentTypeId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.EQUIPMENT_TYPE_DELETE}${equipmentTypeId}`;
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
