import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiResponse } from '../../../shared/models/commons/base-api-response.interface';
import {
  TicketByIdResponse,
  TicketResponse,
} from '../models/ticket-response.interface';
import { environment as env } from '../../../../environments/environment.development';
import { endpoint } from '../../../shared/utils/endpoints.util';
import { HttpClient } from '@angular/common/http';
import { getIcon, getStateBadge } from '../../../shared/utils/functions.util';
import {
  TicketRequest
} from '../models/ticket-request.interface';
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
export class TicketService {
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  getAll(
    size: any,
    sort: string,
    order: any,
    numPage: any,
    getInputs: any
  ): Observable<BaseApiResponse<TicketResponse[]>> {
    const requestUrl = `${env.api}${
      endpoint.LIST_TICKETS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    return this.httpClient
      .get<BaseApiResponse<TicketResponse[]>>(requestUrl)
      .pipe(map((resp) => this.transformData(resp)));
  }

  private transformData(response: BaseApiResponse<TicketResponse[]>): BaseApiResponse<TicketResponse[]> {
    response.data.forEach((data: TicketResponse) => {
      data.icReport = getIcon("icCloudDownload", "Descargar boleta", true);
      data.icVisibility = getIcon("icVisibility", "Ver Detalle de la boleta", true);
      data.icCancel = getIcon("icCancel", "Anular boleta", true);
    });

    return response;
  }

  ticketById(ticketId: number): Observable<TicketByIdResponse> {
    const requestUrl = `${env.api}${endpoint.TICKET_BY_ID}${ticketId}`;
    return this.httpClient
      .get<BaseApiResponse<TicketByIdResponse>>(requestUrl)
      .pipe(
        map((resp) => {
          const normalizedResp = handleApiResponse<TicketByIdResponse>(resp);
          return normalizedResp.data;
        })
      );
  }

  ticketReport(data: TicketResponse): void {
    const requestUrl = `${env.api}${endpoint.REPORT_PDF}${data.ticketId}`;

    this.httpClient
      .get(requestUrl, { responseType: "blob", observe: "response" })
      .subscribe((response) => {
        let fileName = `${data.ticketId}.pdf`; 

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(response.body!);
        link.download = fileName;
        link.click();

        link.remove();
        window.URL.revokeObjectURL(link.href);
      });
  }

  ticketCreate(ticket: TicketRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.TICKET_CREATE}`;
    return this.httpClient
      .post<BaseApiResponse<boolean>>(requestUrl, ticket)
      .pipe(
        map((resp) => handleApiResponse<boolean>(resp))
      );
  }

  ticketDelete(ticketId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.TICKET_DELETE}${ticketId}`;
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
