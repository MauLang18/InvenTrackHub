import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { fadeInRight400ms } from '../../../../shared/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../shared/animations/scale-in.animation';
import { ExportExcelComponent } from '../../../../shared/components/reusables/export-excel/export-excel.component';
import { FilterDateRangeYmdComponent } from '../../../../shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { FilterMenuStatesComponent } from '../../../../shared/components/reusables/filter-menu-states/filter-menu-states.component';
import { GenericButtonComponent } from '../../../../shared/components/reusables/generic-button/generic-button.component';
import { ListTableComponent } from '../../../../shared/components/reusables/list-table/list-table.component';
import { SearchBoxComponent } from '../../../../shared/components/reusables/search-box/search-box.component';
import { SplitButtonComponent } from '../../../../shared/components/reusables/split-button/split-button.component';
import { RowClick } from '../../../../shared/models/reusables/rowclick-interface';
import {
  FilterDateRange,
  SearchBox,
} from '../../../../shared/models/reusables/search-options.interface';
import { Actions } from '../../../../shared/models/reusables/split-button.interface';
import { InventoryService } from '../../services/inventory.service';
import { componentSetting } from './inventory-list-config';
import { InventoryManagementComponent } from '../inventory-management/inventory-management.component';
import { InventoryResponse } from '../../models/inventory-response.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [
    MatIcon,
    GenericButtonComponent,
    SearchBoxComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    FilterMenuStatesComponent,
    SplitButtonComponent,
    ListTableComponent,
  ],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss',
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class InventoryListComponent implements OnInit {
  public inventoryService = inject(InventoryService);
  public _dialog = inject(MatDialog);

  iconInventory$ = 'dashboard';
  component$: any;
  resetChecks: boolean = false;

  ngOnInit(): void {
    this.component$ = componentSetting;
  }

  formatGetInputs() {
    let str = '';

    if (this.component$.filters.textFilter != null) {
      str += `&numFilter=${this.component$.filters.numFilter}&textFilter=${this.component$.filters.textFilter}`;
    }

    if (
      this.component$.filters.startDate != '' &&
      this.component$.filters.endDate != ''
    ) {
      str += `&startDate=${this.component$.filters.startDate}&endDate=${this.component$.filters.endDate}`;
    }

    if (this.component$.filters.stateFilter != null && this.component$.filters.stateFilter != '1-0') {
      str += `&stateFilter=${this.component$.filters.stateFilter}`;
    }

    if (this.component$.filters.refresh == true) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component$.filters.refresh = false;
    }

    this.component$.getInputs = str;
  }

  search(data: SearchBox) {
    this.component$.filters.numFilter = data.searchValue;
    this.component$.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  searchDateRange(data: FilterDateRange) {
    this.component$.filters.startDate = data.startDate;
    this.component$.filters.endDate = data.endDate;
    this.formatGetInputs();
  }

  setDataFilterStates(data: []) {
    if (data.length) {
      this.component$.filters.stateFilter = data.join('-');
    } else {
      this.component$.filters.stateFilter = '0';
    }

    this.formatGetInputs();
  }

  initFilterReset() {
    this.component$.filters = { ...this.component$.initFilters };
    this.formatGetInputs();
  }

  resetButton(action: Actions) {
    switch (action) {
      case 1:
        this.component$.filters.refresh = true;
        this.formatGetInputs();
        break;
      case 2:
        this.initFilterReset();
        this.resetChecks = !this.resetChecks;
        break;
    }
  }

  newInventory() {
    this._dialog
      .open(InventoryManagementComponent, {
        disableClose: true,
        width: '400px',
        enterAnimationDuration: 200,
        exitAnimationDuration: 200,
        data: { mode: 'register' },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsInventorys(true);
        }
      });
  }

  rowClick(rowClick: RowClick<InventoryResponse>) {
    let action = rowClick.action;
    let inventory = rowClick.row;

    switch (action) {
      case 'edit':
        this.inventoryEdit(inventory);
        break;
      case 'delete':
        this.inventoryDelete(inventory);
        break;
      case 'download':
        this.inventoryReport(inventory);
        break;
    }
  }

  inventoryEdit(inventoryData: InventoryResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = inventoryData;

    let dialogRef = this._dialog.open(InventoryManagementComponent, {
      data: { dialogConfig, mode: 'edit' },
      disableClose: true,
      width: '400px',
      enterAnimationDuration: 450,
      exitAnimationDuration: 300,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.setGetInputsInventorys(true);
    });
  }

  inventoryReport(inventory: InventoryResponse) {
    this.inventoryService.inventoryReport(inventory);
  }

  inventoryDelete(inventoryData: InventoryResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el usuario ${inventoryData.code}?`,
      text: 'Se borrará de forma permanente!',
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: 'rgb(210, 155, 253)',
      cancelButtonColor: 'rgb(79, 109, 253)',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this.inventoryService.inventoryDelete(inventoryData.inventoryId).subscribe(() => {
          this.setGetInputsInventorys(true);
        });
      }
    });
  }

  setGetInputsInventorys(refresh: boolean) {
    this.component$.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Inventory?sort=Id&download=true`;
  }
}
