import { Component, Input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { DownloadXslxService } from '../../../services/download-xslx.service';

@Component({
  selector: 'app-export-excel',
  standalone: true,
  imports: [MatIcon, MatTooltip],
  templateUrl: './export-excel.component.html',
})
export class ExportExcelComponent {
  private readonly downloadXslxService = inject(DownloadXslxService);
  private readonly spinner = inject(NgxSpinnerService);

  @Input() url: string = '';
  @Input() getInputs: string = '';
  @Input() filename: string = '';

  icCloudDownload = 'download';
  infoTooltip = 'Descargar resultados en formato Excel';

  download() {
    Swal.fire({
      title: 'Confirmar',
      text: 'Esta acción descargará los registros en formato .xlsx ignorando la paginación.',
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: '#004A89',
      cancelButtonColor: '#ce938b',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this.executeDownload();
      }
    });
  }

  executeDownload() {
    this.spinner.show();
    this.downloadXslxService
      .executeDownload(this.url + this.getInputs)
      .subscribe((excelData: Blob) => {
        const fileName = this.filename;
        const blobUrl = URL.createObjectURL(excelData);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;
        downloadLink.click();
        URL.revokeObjectURL(blobUrl);
        this.spinner.hide();
      });
  }
}
