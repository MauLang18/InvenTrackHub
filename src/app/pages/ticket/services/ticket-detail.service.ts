import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiResponse } from '../../../shared/models/commons/base-api-response.interface';
import {
  InventoryDetailsResponse,
} from '../models/ticket-response.interface';
import { environment as env } from '../../../../environments/environment.development';
import { endpoint } from '../../../shared/utils/endpoints.util';
import { HttpClient } from '@angular/common/http';
import { getIcon } from '../../../shared/utils/functions.util';

// Function to normalize the keys of an object
function normalizeKeys(obj: any): any {
  const normalizedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      normalizedObj[key.toLowerCase()] = obj[key];
    }
  }
  return normalizedObj;
}

// Function to handle API responses, normalizing keys
function handleApiResponse<T>(response: any): BaseApiResponse<T> {
  const normalizedResponse = normalizeKeys(response);

  return {
    isSuccess: normalizedResponse['issuccess'], // Using normalized keys
    data: normalizedResponse['data'],
    message: normalizedResponse['message'],
    totalRecords: normalizedResponse['totalrecords'],
    errors: normalizedResponse['errors'],
  };
}

@Injectable({
  providedIn: 'root',
})
export class TicketDetailService {
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  getAll(
    size: string,
    sort: string,
    order: string,
    numPage: number,
    getInputs: string
  ): Observable<BaseApiResponse<InventoryDetailsResponse[]>> {
    const requestUrl = `${env.api}${
      endpoint.LIST_INVENTORIES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    return this.httpClient
      .get<BaseApiResponse<InventoryDetailsResponse[]>>(requestUrl)
      .pipe(map((resp) => this.transformProductData(resp)));
  }

  private transformProductData(
    response: BaseApiResponse<InventoryDetailsResponse[]>
  ): BaseApiResponse<InventoryDetailsResponse[]> {
    response.data.forEach((inventory: InventoryDetailsResponse) => {
      inventory.icAdd = getIcon('icAdd', 'Agregar articulo al detalle', true);
    });

    return response;
  }
}