import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiResponse } from '../../../shared/models/commons/base-api-response.interface';
import {
  LocationByIdResponse,
  LocationResponse,
} from '../models/location-response.interface';
import { environment as env } from '../../../../environments/environment.development';
import { endpoint } from '../../../shared/utils/endpoints.util';
import { HttpClient } from '@angular/common/http';
import { getIcon, getStateBadge } from '../../../shared/utils/functions.util';
import {
  LocationRequest,
  LocationUpdateRequest,
} from '../models/location-request.interface';
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
export class LocationService {
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  getAll(
    size: any,
    sort: string,
    order: any,
    numPage: any,
    getInputs: any
  ): Observable<BaseApiResponse<LocationResponse[]>> {
    const requestUrl = `${env.api}${
      endpoint.LIST_LOCATIONS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    return this.httpClient
      .get<BaseApiResponse<LocationResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<LocationResponse[]>(resp);
          normalizedResp.data.forEach(function (e: LocationResponse) {
            e.stateLocate = getStateBadge(e.stateLocate);
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

  locationById(locationId: number): Observable<LocationByIdResponse> {
    const requestUrl = `${env.api}${endpoint.LOCATION_BY_ID}${locationId}`;
    return this.httpClient
      .get<BaseApiResponse<LocationByIdResponse>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<LocationByIdResponse>(resp);
          return normalizedResp.data;
        })
      );
  }

  locationCreate(location: LocationRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.LOCATION_CREATE}`;
    return this.httpClient
      .post<BaseApiResponse<boolean>>(requestUrl, location)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  locationUpdate(location: LocationUpdateRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.LOCATION_UPDATE}`;
    return this.httpClient
      .put<BaseApiResponse<boolean>>(requestUrl, location)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  locationDelete(locationId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.LOCATION_DELETE}${locationId}`;
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
