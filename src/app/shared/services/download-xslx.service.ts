import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from './../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DownloadXslxService {
  private readonly http = inject(HttpClient);

  // Método executeDownload() que realiza una solicitud
  // de descarga y devuelve un Observable de Blob
  executeDownload(url: string): Observable<Blob> {
    // Realizamos una solicitud GET utilizando HttpClient
    // con la URL proporcionada y configurando el tipo de respuesta como Blob
    return this.http.get<Blob>(`${env.api}${url}`, {
      responseType: 'blob' as 'json',
    });
  }
}
