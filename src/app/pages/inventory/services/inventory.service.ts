import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiResponse } from '../../../shared/models/commons/base-api-response.interface';
import {
  InventoryByIdResponse,
  InventoryResponse,
} from '../models/inventory-response.interface';
import { environment as env } from '../../../../environments/environment.development';
import { endpoint } from '../../../shared/utils/endpoints.util';
import { HttpClient } from '@angular/common/http';
import { getIcon, getStateBadge } from '../../../shared/utils/functions.util';
import {
  InventoryRequest,
  InventoryUpdateRequest,
} from '../models/inventory-request.interface';
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
export class InventoryService {
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  getAll(
    size: any,
    sort: string,
    order: any,
    numPage: any,
    getInputs: any
  ): Observable<BaseApiResponse<InventoryResponse[]>> {
    const requestUrl = `${env.api}${
      endpoint.LIST_INVENTORIES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    return this.httpClient
      .get<BaseApiResponse<InventoryResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<InventoryResponse[]>(resp);
          normalizedResp.data.forEach(function (e: InventoryResponse) {
            e.stateInventory = getStateBadge(e.stateInventory);
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

  inventoryById(inventoryId: number): Observable<InventoryByIdResponse> {
    const requestUrl = `${env.api}${endpoint.INVENTORY_BY_ID}${inventoryId}`;
    return this.httpClient
      .get<BaseApiResponse<InventoryByIdResponse>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<InventoryByIdResponse>(resp);
          return normalizedResp.data;
        })
      );
  }

  inventoryCreate(inventory: InventoryRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.INVENTORY_CREATE}`;
    const formData = this._builFormDataCreate(inventory);
    return this.httpClient
      .post<BaseApiResponse<boolean>>(requestUrl, formData)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  inventoryUpdate(inventory: InventoryUpdateRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.INVENTORY_UPDATE}`;
    const formData = this._builFormDataUpdate(inventory);
    return this.httpClient
      .put<BaseApiResponse<boolean>>(requestUrl, formData)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  inventoryReport(data: InventoryResponse): void {
    const requestUrl = `${env.api}${endpoint.REPORT_QR}${data.inventoryId}`;

    this.httpClient
      .get(requestUrl, { responseType: "blob", observe: "response" })
      .subscribe((response) => {
        let fileName = `${data.code}.png`; 

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(response.body!);
        link.download = fileName;
        link.click();

        link.remove();
        window.URL.revokeObjectURL(link.href);
      });
  }

  inventoryDelete(inventoryId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.INVENTORY_DELETE}${inventoryId}`;
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

  private _builFormDataCreate(Data: InventoryRequest): FormData {
    const formData = new FormData();
      formData.append("equipmentTypeId", Data.equipmentTypeId.toString()),
      formData.append("brand", Data.brand),
      formData.append("series", Data.series),
      formData.append("model", Data.model),
      formData.append("price", Data.price.toString()),
      formData.append("details", Data.details),
      formData.append("image", Data.image),
      formData.append("state", Data.state.toString());

    return formData;
  }

  private _builFormDataUpdate(Data: InventoryUpdateRequest): FormData {
    const formData = new FormData();
      formData.append("inventoryId", Data.inventoryId.toString()),
      formData.append("equipmentTypeId", Data.equipmentTypeId.toString()),
      formData.append("brand", Data.brand),
      formData.append("series", Data.series),
      formData.append("model", Data.model),
      formData.append("price", Data.price.toString()),
      formData.append("details", Data.details),
      formData.append("image", Data.image),
      formData.append("state", Data.state.toString());

    return formData;
  }
}
